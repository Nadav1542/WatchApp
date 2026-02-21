#include <iostream>
#include <thread>
#include <vector>
#include <cstring>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <map>
#include <set>
#include <mutex>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

// ANSI color codes for terminal
#define COLOR_RESET   "\033[0m"
#define COLOR_GREEN   "\033[32m"
#define COLOR_YELLOW  "\033[33m"
#define COLOR_BLUE    "\033[34m"
#define COLOR_MAGENTA "\033[35m"
#define COLOR_CYAN    "\033[36m"
#define COLOR_RED     "\033[31m"

// Helper: Shorten MongoDB ObjectId for display (first 4 + last 4 chars)
std::string shortId(const std::string& id) {
    if (id.length() <= 10) return id;
    return id.substr(0, 4) + ".." + id.substr(id.length() - 4);
}

// Helper: Log with color
void log(const std::string& color, const std::string& tag, const std::string& message) {
    std::cout << color << "[" << tag << "] " 
              << COLOR_RESET << message << std::endl;
}

std::vector<std::thread> thread_pool;
std::map<std::string, std::vector<std::string>> user_watched_map; // Map of user IDs to vectors of video IDs they watched
std::mutex map_mutex; // Mutex for thread-safe access to the maps

void printUserWatchedMap() {
    std::lock_guard<std::mutex> lock(map_mutex);
    std::cout << COLOR_MAGENTA << "\n╔══════════════════════════════════════════════════╗" << COLOR_RESET << std::endl;
    std::cout << COLOR_MAGENTA << "║           USER WATCH HISTORY MAP                 ║" << COLOR_RESET << std::endl;
    std::cout << COLOR_MAGENTA << "╠══════════════════════════════════════════════════╣" << COLOR_RESET << std::endl;

    for (const auto& entry : user_watched_map) {
        const std::string& user_id = entry.first;
        const std::vector<std::string>& video_list = entry.second;

        std::cout << COLOR_YELLOW << "║ User: " << shortId(user_id) << COLOR_RESET << " → ";
        for (size_t i = 0; i < video_list.size(); i++) {
            std::cout << COLOR_GREEN << shortId(video_list[i]) << COLOR_RESET;
            if (i < video_list.size() - 1) std::cout << ", ";
        }
        std::cout << std::endl;
    }
    std::cout << COLOR_MAGENTA << "╚══════════════════════════════════════════════════╝\n" << COLOR_RESET << std::endl;
}

std::vector<std::string> getRecommendedVideos(const std::string& user_id, const std::string& video_id) {
    std::vector<std::string> recommended_videos;
    std::set<std::string> unique_videos; // To avoid duplicates in the recommendation list
    std::lock_guard<std::mutex> lock(map_mutex); // Ensure thread-safe access

    // Find users who watched the same video
    for (const auto& entry : user_watched_map) {
        const std::string& other_user_id = entry.first;
        const std::vector<std::string>& other_user_videos = entry.second;

        if (other_user_id != user_id && std::find(other_user_videos.begin(), other_user_videos.end(), video_id) != other_user_videos.end()) {
            // The other user watched the same video, add their videos to the recommendation list
            for (const auto& other_video : other_user_videos) {
                if (unique_videos.insert(other_video).second) { // Insert and check if it was a new insertion
                    recommended_videos.push_back(other_video);
                }
            }
        }
    }

    // Print the recommended videos before returning
    std::cout << COLOR_BLUE << "[RECOMMEND] " << COLOR_RESET 
              << "For user " << COLOR_YELLOW << shortId(user_id) << COLOR_RESET 
              << " watching " << COLOR_GREEN << shortId(video_id) << COLOR_RESET << " → ";
    if (recommended_videos.empty()) {
        std::cout << COLOR_RED << "(no recommendations)" << COLOR_RESET;
    } else {
        for (size_t i = 0; i < recommended_videos.size(); i++) {
            std::cout << COLOR_GREEN << shortId(recommended_videos[i]) << COLOR_RESET;
            if (i < recommended_videos.size() - 1) std::cout << ", ";
        }
    }
    std::cout << std::endl;
    return recommended_videos;
}

void handleClient(int client_sock, int client_id) {
    log(COLOR_GREEN, "CONNECT", "Client #" + std::to_string(client_id) + " connected, thread: " + std::to_string(std::hash<std::thread::id>{}(std::this_thread::get_id()) % 10000));

    char buffer[4096];
    std::string user_id;

    // Receive the user ID from the client first
    memset(buffer, 0, sizeof(buffer));
    int read_bytes = recv(client_sock, buffer, sizeof(buffer), 0);
    if (read_bytes > 0) {
        std::string message(buffer, read_bytes);
        user_id = message;
        log(COLOR_YELLOW, "AUTH", "Client #" + std::to_string(client_id) + " identified as user " + shortId(user_id));
    } else {
        log(COLOR_RED, "ERROR", "Failed to receive user ID from client #" + std::to_string(client_id));
        close(client_sock);
        return;
    }

    // Now, handle communication with the client
    while (true) {
        memset(buffer, 0, sizeof(buffer));
        read_bytes = recv(client_sock, buffer, sizeof(buffer), 0);
        if (read_bytes > 0) {
            std::string message(buffer, read_bytes);

            try {
                // Parse the JSON message
                auto json_message = json::parse(message);

                // Check the type of the message
                if (json_message["type"] == "WATCHED_VIDEO") {
                    std::string video_id = json_message["videoId"];
                    std::string msg_user_id = json_message["userId"];
                    {
                        std::lock_guard<std::mutex> lock(map_mutex);
                        user_watched_map[msg_user_id].push_back(video_id);
                    }
                    log(COLOR_GREEN, "WATCHED", "User " + shortId(msg_user_id) + " watched video " + shortId(video_id));
                    printUserWatchedMap();
                } else if (json_message["type"] == "GET_RECOMMENDATIONS") {
                    std::string video_id = json_message["videoId"];
                    log(COLOR_BLUE, "REQUEST", "User " + shortId(user_id) + " requesting recommendations for video " + shortId(video_id));

                    std::vector<std::string> recommendations = getRecommendedVideos(user_id, video_id);

                    // Create the response
                    json response_json;
                    response_json["type"] = "RECOMMENDATIONS";
                    response_json["videos"] = recommendations;

                    std::string response = response_json.dump();
                    send(client_sock, response.c_str(), response.size(), 0);
                    log(COLOR_CYAN, "RESPONSE", "Sent " + std::to_string(recommendations.size()) + " recommendations to user " + shortId(user_id));
                }
            } catch (const std::exception& e) {
                log(COLOR_RED, "ERROR", std::string("JSON parse failed: ") + e.what());
            }
        } else if (read_bytes == 0) {
            log(COLOR_YELLOW, "DISCONNECT", "User " + shortId(user_id) + " (client #" + std::to_string(client_id) + ") disconnected");
            break;
        } else {
            perror("Error reading from client");
            break;
        }
    }
    close(client_sock);
}

int main() {
    const int server_port = 5555;
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) {
        log(COLOR_RED, "FATAL", "Error creating socket");
        return 1;
    }

    sockaddr_in server_addr;
    memset(&server_addr, 0, sizeof(server_addr));
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(server_port);

    if (bind(sock, (struct sockaddr*)&server_addr, sizeof(server_addr)) < 0) {
        log(COLOR_RED, "FATAL", "Error binding socket - port " + std::to_string(server_port) + " may be in use");
        close(sock);
        return 1;
    }

    if (listen(sock, 5) < 0) {
        log(COLOR_RED, "FATAL", "Error listening on socket");
        close(sock);
        return 1;
    }

    std::cout << COLOR_GREEN << "\n";
    std::cout << "╔═══════════════════════════════════════════════════════════╗\n";
    std::cout << "║     RECOMMENDATION SERVER RUNNING ON PORT " << server_port << "            ║\n";
    std::cout << "║     Waiting for connections...                            ║\n";
    std::cout << "╚═══════════════════════════════════════════════════════════╝\n";
    std::cout << COLOR_RESET << std::endl;

    int client_id = 0;
    while (true) {
        sockaddr_in client_addr;
        socklen_t addr_len = sizeof(client_addr);
        int client_sock = accept(sock, (struct sockaddr*)&client_addr, &addr_len);
        if (client_sock < 0) {
            log(COLOR_RED, "ERROR", "Error accepting client");
            continue;
        }

        client_id++;
        std::thread client_thread(handleClient, client_sock, client_id);
        thread_pool.push_back(std::move(client_thread));
    }

    // Join all threads before exiting
    for (auto& t : thread_pool) {
        if (t.joinable()) {
            t.join();
        }
    }

    close(sock);
    return 0;
}

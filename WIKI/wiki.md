Prerequisites
Node.js
Android Studio
MongoDB: Local server with a data folder containing two subfolders: Users and Videos.

Setting Up the Environment

Step 1: Start MongoDB

Command: mongod or open mongo compass and press connect
Description: Assuming your mongod is configured correctly (as per instructions in the prerequisites), open CMD or Terminal and run the command mongod. Ensure the local server address is set to mongodb://localhost:27017.
 ![WIKI/pictures for wiki/Screenshot 2024-09-02 221124.pn](https://github.com/Nadav1542/MainProject/blob/ex04-with-wiki/WIKI/pictures%20for%20wiki/Screenshot%202024-09-02%20221113.png)
Step 2: Start the TCP Server

Command: press the arrow
Description: just press the play arrow and the cpp server will start
https://github.com/Nadav1542/MainProject/blob/feccfb464a2aa1bb9e4a7c326328da85aa96afa6/WIKI/pictures%20for%20wiki/44bb922b-01a9-46e5-aa00-6b29e5e07cff.jpg
Step 3: Start the Node.js Server

Command: node server.js
Description: Open the mainproject directory in your text editor and navigate to the server subdirectory by running cd server. Then, start the server using node server.js.


Step 4: Starting up the front end

webapp:
Command: npm start 
Description: In the "mainproject" file enter the command "cd webapp" then enter "npm start" to open the web app.
Screenshot: WIKI/pictures for wiki/Screenshot 2024-09-02 221332.png
User Operations

Registration and Login

Register a New User

Description: press the three lines icon to open the side menu, then click the signup button.
follow the instructions to enter username (must be a unique name), nickname, password, password confermation and finally uplopad a profile picture by clikcing on the alloted space.

Login

Description:press the three lines icon to open the side menu, then click the signin button.
enter your username and password then press signin.

Managing Videos
Create a Video

Description: after loggin in open the side menu and press the upload video tab, in the new screen fill the required fields and press upload.

Edit a Video or delete it

Description: after loggin in with the same account that uploaded the video, click the video and press the edit button in the video Description.
now you can edit the video name and description to save press the corresponding button, press the delete button to delete.

Delete a Video

android app:

Description: open the android file in android studio , set up an emulator of your choosing then press the green arrow to run the app.

User Operations
Registration and Login

Register a New User

Description: press the signup folating button then,follow the instructions to enter username (must be a unique name), nickname, password, password confermation.
finally uplopad a profile picture(note that the pictures taken by the emulators app are uri and not supported by the app you must upload a real picture so it can be converted to base64) by clikcing on the alloted space.


Login

Description: press the floating signin button and enter your username and password.

Managing Videos
Create a Video

Description: after connecting to a user press the uploadvideo button, next enter title description and the video ,note thet you need to upload the video itself and not a uri.

Edit a Video

Description: after connecting to the user that uploaded the video click the video , next click the edit video button to enter the edit activity there you can edit the provided fields as you please, to save press the edit button.

Delete a Video

Description: after entering the edit activity(as described above) press the delete video button.



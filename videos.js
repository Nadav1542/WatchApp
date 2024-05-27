
  const  movies =  [
        {
            "title": "Movie 1",
            "description": "Description of movie 1",
            "image": "path/to/image1.jpg"
        },
        {
            "title": "Movie 2",
            "description": "Description of movie 2",
            "image": "path/to/image2.jpg"
        },
        {
            "title": "Movie 3",
            "description": "Description of movie 3",
            "image": "path/to/image3.jpg"
        }
        
    ];


function videosTemplate(video){
return `
<div class="video">
<img class="videoimg" src="${video.image}">
<h2 class="video-name">${video.title}</h2> 
<span class="video-desc">${video.description}</span>
</div>
`
}

document.getElementById("videos").innerHTML = `${movies.map(videosTemplate).join('')}`
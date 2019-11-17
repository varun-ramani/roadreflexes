var sound = document.createElement("audio");

sound.src = "/static/audio/music.mp3";
sound.setAttribute("loop", true);
sound.setAttribute("preload", "auto"); 
sound.setAttribute("controls", "none"); 
sound.style.display = "none";

document.body.appendChild(sound);
sound.play();
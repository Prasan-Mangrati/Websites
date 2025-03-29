let activeSong = null;
let audio = new Audio();

const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
const songNames = document.querySelectorAll(".songName");
const seekCircle = document.getElementById("seekCircle");
let pos = 0
setInterval(() => {
    seekCircle.style.left=`${pos}%`
    pos+=1
    if (pos==100){
        pos=0
    }
}, 100);

document.addEventListener("DOMContentLoaded", () => {
    let audio = new Audio();
    const playButton = document.getElementById("playButton");
    const pauseButton = document.getElementById("pauseButton");
    const songNames = document.querySelectorAll(".songName");

    // Play button
    playButton.addEventListener("click", () => {
        playButton.classList.add("hidden");
        pauseButton.classList.replace("hidden", "block");
        audio.play();
    });

    // Pause button
    pauseButton.addEventListener("click", () => {
        pauseButton.classList.add("hidden");
        playButton.classList.replace("hidden", "block");
        audio.pause();
    });

    // Function to normalize filename and create a valid URL
    function getEncodedSongUrl(songText) {
        let trimmedSongName = songText.trim(); 
        trimmedSongName = trimmedSongName.replace(/\s+/g, " "); // Replace multiple spaces with a single space
        trimmedSongName = trimmedSongName.replace(/\|/g, "%7C"); // Encode `|` manually

        let encodedName = encodeURIComponent(trimmedSongName) + ".mp3"; 
        return `http://127.0.0.1:3000/Songs/${encodedName}`;
    }

    // Attach event listener to each song name
    songNames.forEach(song => {
        song.addEventListener("click", () => {
            const playName = document.getElementById("songName");
            playButton.classList.add("hidden");
            pauseButton.classList.replace("hidden", "block");

            let songText = song.textContent;
            let audioLink = getEncodedSongUrl(songText);
            console.log("Generated Link:", audioLink);

            playName.innerHTML = songText;
            localStorage.setItem("lastSong", songText);

            // Stop previous audio before playing a new one
            if (!audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }

            // Set and play new song
            audio.src = audioLink;
            audio.play();
        });
    });
});

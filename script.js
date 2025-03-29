let currentSong = new Audio();
const playButton = document.getElementById("playButton")
const nextButton = document.getElementById("nextButton")
const previousButton = document.getElementById("previousButton")
const pauseButton = document.getElementById("pauseButton")
const playingSong = document.getElementById("playingSong")
let audioPlay = false
let lastSong = localStorage.getItem("lastSong")
const unmute = document.getElementById("unmute")
const mute = document.getElementById("mute")
// const seekCircle = document.getElementById("seekCircle")
const seekbar = document.getElementById("seekbar")
// const seekbarProgress = document.getElementById("seekbarProgress")
let currentSongDuration = document.getElementById("currentSongDuration")
let currentSongTime = document.getElementById("currentSongTime")
const seekbarOverlap = document.getElementById("seekbarOverlap")
let pause = false

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/Songs/")
    let response = await a.text();



    let div = document.createElement("div")
    div.innerHTML = response;

    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/Songs/")[1]);
        }
    }

    return songs;

}

const updateTimes = (time) => {
    minutes = parseInt(time / 60)
    seconds = parseInt(time) - minutes * 60
    minutes < 10 ? minutes = `0${minutes}` : minutes = minutes
    seconds < 10 ? seconds = `0${seconds}` : seconds = seconds

    //    console.log(`Minutes: ${parseInt(minutes)}`)
    //    console.log(`Seconds: ${parseInt(seconds)}`)
    lastTime = `${minutes}:${seconds}`
    localStorage.setItem("lastTime", lastTime)
    currentSongTime.innerText = `${minutes}:${seconds}`
}

const duration = (duration) => {
    minutes = parseInt(duration / 60)
    seconds = parseInt(duration) - minutes * 60
    minutes < 10 ? minutes = `0${minutes}` : minutes = minutes
    seconds < 10 ? seconds = `0${seconds}` : seconds = seconds
    lastDuration = `${minutes}:${seconds}`
    localStorage.setItem("lastDuration", lastDuration)
    currentSongDuration.innerText = `${minutes}:${seconds}`
}

const updateSeekbar = (progressPercentage) => {
    seekbar.style.background = `linear-gradient(to right, pink ${progressPercentage}%, green ${progressPercentage}%)`;
}

const changeIcon = (change) => {
    console.log(change)
    if (change == "pause") {

        pauseButton.classList.add("hidden")
        playButton.classList.remove("hidden")

    }
    else {
        playButton.classList.add("hidden")
        pauseButton.classList.remove("hidden")
    }

}

const playMusic = (track) => {

    let correctedTrack = track.replace(" | ", "%7C");
    localStorage.setItem("lastSong", track);

    // Check if the song is already playing. If it is, don't change the src.
    if (currentSong.src.endsWith(correctedTrack) && currentSong.paused) {
        currentSong.play();  // Resume from last position
    } else {
        // If it's a new song, change the source and start from the beginning
        currentSong.src = "/Songs/" + correctedTrack;
        currentSong.play();
    }

    playingSong.innerText = track;
    pauseButton.classList.remove("hidden");
    playButton.classList.add("hidden");

    currentSong.play();

    // Handle Play Button click
    playButton.addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play() // Resume from last position
        }
    });

    // Handle Pause Button click
    pauseButton.addEventListener("click", () => {
        currentSong.pause();
    });

    // Update the time progress and duration of the song
    // currentSong.addEventListener("input", () => {
    //     let progressPercentage = (currentSong.currentTime / currentSong.duration) * 1000;
    //     seekbar.value = progressPercentage;
    //     seekbar.style.background = `linear-gradient(to right, white ${progressPercentage/10}%, green ${progressPercentage/10}%)`;
    //     updateTimes(currentSong.currentTime);
    //     duration(currentSong.duration);
    // });
    currentSong.addEventListener("timeupdate", () => {
        let progress = (currentSong.currentTime / currentSong.duration) * 1000;
        seekbar.value = progress;
        let progressPercentage = (progress / 1000) * 100;
        updateSeekbar(progressPercentage)
        updateTimes(currentSong.currentTime);
        duration(currentSong.duration);


    });

    seekbar.addEventListener("input", () => {
        progress = seekbar.value;
        updateSeekbar(progress / 10)
        let newTime = (progress / 1000) * currentSong.duration;
        currentSong.currentTime = newTime;
    })
    seekbar.addEventListener("change", () => {
        progress = seekbar.value
        updateSeekbar(progress / 10)
        let newTime = (progress / 1000) * currentSong.duration;
        currentSong.currentTime = newTime;
    })
    document.addEventListener("keydown", (key) => {
        if (key.code == "Space") {
            if (pause) {
                currentSong.pause();
                changeIcon("pause")
                pause = false;
            }
            else {
                currentSong.play();
                changeIcon("play");
                pause = true;
            }
        }


    })
    audioPlay = true
};
pause = true
async function main() {

    //     document.addEventListener("keydown",(key)=>{
    //         console.log(key)
    //         if(key.code="Space"){
    //             currentSong = playMusic(localStorage.getItem("lastSong"))
    //           if(!pause)
    //           {
    //               currentSong.play()

    //               pause=true
    //           }
    //           else{
    //               currentSong.pause()

    //               pause=false
    //           }
    //         }
    //   })
    
    currentSongDuration.innerText = localStorage.getItem("lastDuration")
    currentSongTime.innerText = localStorage.getItem("lastTime")

    pauseButton.addEventListener("click", () => {
        pauseButton.classList.add("hidden")
        playButton.classList.remove("hidden")
    })
    playButton.addEventListener("click", () => {
        pauseButton.classList.remove("hidden")
        playButton.classList.add("hidden")
        audioPlay == false ? playMusic(localStorage.getItem("lastSong")) : console.log("o")

    })

    mute.addEventListener("click", () => {
        mute.classList.add("hidden")
        unmute.classList.remove("hidden")
        currentSong.muted = true;
    })

    unmute.addEventListener("click", () => {
        unmute.classList.add("hidden")
        mute.classList.remove("hidden")
        currentSong.muted = false;

    })



    previousButton.addEventListener("click", () => {
        let link = currentSong.src
        let parts = link.trim().split("http://127.0.0.1:3000/Songs/")
        let parts1 = parts[1]
        let finalName = parts1.replaceAll("%20", " ").replaceAll("%7C", " | ")
        playMusic(finalName)



    })

    lastSong = localStorage.getItem("lastSong")
    document.getElementById("playingSong").textContent = lastSong
    //get the list of all songs
    let songs = await getSongs();
    console.log(songs)
    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUl.innerHTML += `<li  class="songName  rounded-xl  p-5 text-lg hover:bg-[rgba(48,47,47,0.56)] min-h-25  cursor-pointer flex items-center gap-5"><img class="invert" src="src/images/music.svg" alt=""><span id="selectedSong">${song.replaceAll("%20", " ").replaceAll("%7C", " | ")} </span><img class="ml-auto opacity-0" src="src/images/icons/pause.svg" alt=""></li>`;

    }
    // document.addEventListener("click", () => {
    //     const audio = new Audio(songs[0]);
    //     audio.play().catch(error => console.error("Playback failed:", error));
    //   }, { once: true }); // Ensures it runs only once
    

    let songName = document.querySelectorAll(".songName");
    let activeSong = null;

    songName.forEach(song => {
        song.addEventListener("click", () => {

            // If there is an active song, reset the background and opacity of the 3rd image
            if (activeSong) {
                activeSong.classList.remove("bg-green-800");
                activeSong.classList.add("hover:bg-[rgba(48,47,47,0.56)]");  // Restore the hover effect
                activeSong.children[2].classList.add("opacity-0");  // Hide the 3rd image



            }

            // Set the clicked song as the active one
            song.classList.add("bg-green-800");
            song.classList.remove("hover:bg-[rgba(48,47,47,0.56)]");  // Remove the hover effect
            song.children[2].classList.remove("opacity-0");  // Show the 3rd image

            // Update the activeSong to the current song
            activeSong = song;

        });
    });
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(element => {
        element.addEventListener("click", () => {
            let music = element.querySelector("span").innerHTML
            console.log(music)
            playMusic(music)
        })

    });


}


main()

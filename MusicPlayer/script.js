const audio = document.getElementById("audio");

const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const songTitle = document.getElementById("song-title");
const artist = document.getElementById("artist");

const albumCover = document.getElementById("album-cover");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const playlist = document.getElementById("playlist");

const likeButton = document.getElementById("like-button");

const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");


/* =========================
   SONG DATA
========================= */

const songs = [

    {
        title: "Cruel Summer",
        artist: "Taylor Swift",
        file: "music/cruel-summer.mp3",
        cover: "images/cover1.jpg"
    },

    {
        title: "Cardigan",
        artist: "Taylor Swift",
        file: "music/cardigan-taylor.mp3",
        cover: "images/cover2.webp"
    },

    {
        title: "Deja Vu",
        artist: "olivia Rodrigo",
        file: "music/Deja-Vu.mp3",
        cover: "images/cover3.jpg"
    }

];


let songIndex = 0;

let isShuffle = false;

let isRepeat = false;


/* =========================
   LOAD SONG
========================= */

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artist.textContent = song.artist;

    audio.src = song.file;

    albumCover.src = song.cover;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";

    progress.value = 0;

    updatePlaylist();

}


/* =========================
   PLAY
========================= */

function playSong() {

    audio.play();

    playButton.textContent = "⏸";

}


/* =========================
   PAUSE
========================= */

function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";

}


/* =========================
   PLAY / PAUSE
========================= */

playButton.addEventListener("click", function() {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


/* =========================
   NEXT SONG
========================= */

function nextSong() {

    if (isShuffle) {

        let randomIndex;

        do {

            randomIndex =
                Math.floor(Math.random() * songs.length);

        } while (
            randomIndex === songIndex &&
            songs.length > 1
        );

        songIndex = randomIndex;

    } else {

        songIndex++;

        if (songIndex >= songs.length) {

            songIndex = 0;

        }

    }

    loadSong(songIndex);

    playSong();

}


nextButton.addEventListener("click", nextSong);


/* =========================
   PREVIOUS SONG
========================= */

previousButton.addEventListener("click", function() {

    songIndex--;

    if (songIndex < 0) {

        songIndex = songs.length - 1;

    }

    loadSong(songIndex);

    playSong();

});


/* =========================
   PROGRESS BAR
========================= */

audio.addEventListener("timeupdate", function() {

    if (audio.duration) {

        const percentage =
            (audio.currentTime / audio.duration) * 100;

        progress.value = percentage;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }

});


/* =========================
   DURATION
========================= */

audio.addEventListener("loadedmetadata", function() {

    duration.textContent =
        formatTime(audio.duration);

});


/* =========================
   CHANGE POSITION
========================= */

progress.addEventListener("input", function() {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) *
            audio.duration;

    }

});


/* =========================
   VOLUME
========================= */

volume.addEventListener("input", function() {

    audio.volume = volume.value;

    updateVolumeIcon();

});

/* =========================
   DYNAMIC VOLUME ICON
========================= */

const wave1 = document.getElementById("wave1");
const wave2 = document.getElementById("wave2");
const wave3 = document.getElementById("wave3");


function updateVolumeIcon() {

    const level = parseFloat(volume.value);


    /* Turn all waves off first */

    wave1.style.display = "none";
    wave2.style.display = "none";
    wave3.style.display = "none";


    /* Muted */

    if (level === 0) {

        wave1.style.display = "none";
        wave2.style.display = "none";
        wave3.style.display = "none";

        return;
    }


    /* Low volume */

    if (level > 0 && level <= 0.33) {

        wave1.style.display = "block";

    }


    /* Medium volume */

    else if (level <= 0.66) {

        wave1.style.display = "block";
        wave2.style.display = "block";

    }


    /* High volume */

    else {

        wave1.style.display = "block";
        wave2.style.display = "block";
        wave3.style.display = "block";

    }

}


/* Set icon when page loads */

updateVolumeIcon();



/* =========================
   AUTOPLAY
========================= */

audio.addEventListener("ended", function() {

    if (isRepeat) {

        audio.currentTime = 0;

        playSong();

        return;

    }

    nextSong();

});


/* =========================
   FORMAT TIME
========================= */

function formatTime(time) {

    if (isNaN(time)) {

        return "0:00";

    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${seconds}`;

}


/* =========================
   CREATE PLAYLIST
========================= */

function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach(function(song, index) {

        const item =
            document.createElement("div");

        item.classList.add("playlist-song");


        item.innerHTML = `

            <div class="playlist-number">
                ${index + 1}
            </div>

            <div class="playlist-details">

                <strong>
                    ${song.title}
                </strong>

                <small>
                    ${song.artist}
                </small>

            </div>

            <span>
                ♪
            </span>

        `;


        item.addEventListener("click", function() {

            songIndex = index;

            loadSong(songIndex);

            playSong();

        });


        playlist.appendChild(item);

    });

}


/* =========================
   HIGHLIGHT CURRENT SONG
========================= */

function updatePlaylist() {

    const playlistSongs =
        document.querySelectorAll(".playlist-song");


    playlistSongs.forEach(function(item, index) {

        item.classList.remove("active");


        if (index === songIndex) {

            item.classList.add("active");

        }

    });

}


/* =========================
   LIKE BUTTON
========================= */

likeButton.addEventListener("click", function() {

    if (likeButton.textContent === "♡") {

        likeButton.textContent = "♥";

    } else {

        likeButton.textContent = "♡";

    }

});


/* =========================
   SHUFFLE
========================= */

shuffleButton.addEventListener("click", function() {

    isShuffle = !isShuffle;

    if (isShuffle) {

        shuffleButton.style.color = "#1ed760";

    } else {

        shuffleButton.style.color = "";

    }

});


/* =========================
   REPEAT
========================= */

repeatButton.addEventListener("click", function() {

    isRepeat = !isRepeat;

    if (isRepeat) {

        repeatButton.style.color = "#1ed760";

    } else {

        repeatButton.style.color = "";

    }

});


/* =========================
   START PLAYER
========================= */

createPlaylist();

loadSong(songIndex);
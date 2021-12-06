player = document.querySelector('.player');

video = document.querySelector('.video');

playBtn = document.getElementById('play-pause');
screenPlayBtn = document.querySelector('.on_screnn_play');
mute = document.getElementById('mute-muted');
fullscreen = document.getElementById('full-screen');

timestamp = document.getElementById('timestamp');

progress = document.querySelector('.time-bar');
volume = document.querySelector('.sound-bar');


function togglePlayPause() {
    if(video.paused){
        video.play();
        playBtn.className = 'pause';
        screenPlayBtn.style.display = 'none';
    } else {
        playBtn.className = 'play';
        video.pause();
        screenPlayBtn.style.display = 'block';
    }
};

function updateProgressTime() {
    progress.value = (video.currentTime / video.duration) * 100;

    let mins = Math.floor(video.currentTime / 60);
    if (mins < 10) {
        mins = '0' + mins;
    }

    let secs = Math.floor(video.currentTime % 60);
    if (secs < 10) {
        secs = '0' + secs;
    }

    timestamp.textContent = `${mins}:${secs}`;

    if (video.currentTime == video.duration) {
        playBtn.className = 'play';
    }
    const value = progress.value;
    progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
}

function setVideoProgress() {
    video.currentTime = (progress.value * video.duration) / 100;
    const value = progress.value;
    progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
}

function soundToggle(){
    video.muted = !video.muted;
    mute.classList.toggle('muted')
}

function switchFullscreen() {
    if (document.fullscreenElement === player) {
        document.exitFullscreen();
    } else {
        player.requestFullscreen();
    }
}

screenPlayBtn.addEventListener('click', () => { togglePlayPause(); })
playBtn.addEventListener('click', () => { togglePlayPause(); })
video.addEventListener('click', () => { togglePlayPause(); })

video.addEventListener('timeupdate', () => {updateProgressTime(); })

progress.addEventListener('input', () => {setVideoProgress(); })

volume.addEventListener('input', (e) => {video.volume = e.target.value;
    if(video.volume === 0 && !video.muted){
        video.muted = true;
       mute.classList.add('muted');
    } else if (video.volume > 0 && video.muted){
        video.muted = false;
       mute.classList.remove('muted');
   }
   const value = volume.value * 100;
   volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

document.addEventListener('DOMContentLoaded', function () {
    const value = volume.value * 100;
    volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
})

mute.addEventListener('click', () => {soundToggle(); })

fullscreen.addEventListener('click', function () {
    switchFullscreen();
})
video.addEventListener('dblclick', function () {
    switchFullscreen();
})
screenPlayBtn.addEventListener('dblclick', function () {
    switchFullscreen();
})
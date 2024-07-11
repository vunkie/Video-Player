
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');
const player = document.querySelector('.player');


// Play & Pause ----------------------------------- //

function showPlayIcon() {
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
  } else {
    video.pause();
    showPlayIcon();
  }
}



// Progress Bar ---------------------------------- //

// Calcular o tempo atual do vídeo
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// Atualizar a barra de progresso
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

// Clicar na barra de progresso para ir para uma determinada parte do vídeo
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  //progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

// Barra de volume
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Arredondar o volume
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;

  // Alterar o ícone do volume
  volumeIcon.className = '';
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (volume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
  lastVolume = volume;
}

// Mute / Unmute
function toggleMute() {
  volumeIcon.className = '';
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute');
  }
}


// Change Playback Speed -------------------- //

function changeSpeed() {
  video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //

function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let fullscreen = false;

function toggleFullscreen() {
  !fullscreen ? openFullscreen(player) : closeFullscreen();
  fullscreen = !fullscreen;
}

// Utilizar fullscreen do navegador sem os controles
// function toggleFullscreen() {
//   if (document.fullscreenElement) {
//     document.exitFullscreen();
//   } else {
//     video.requestFullscreen();
//   }
// }

// Event listeners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended', showPlayIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
video.addEventListener('dblclick', toggleFullscreen);
addEventListener('keydown', (e) => {
  if (e.key === 'f') {
    toggleFullscreen();
  }
  if (e.key === 'm') {
    toggleMute();
  }
  if (e.key === ' ') {
    togglePlay();
    e.preventDefault();
  }
  if (e.key === 'ArrowRight') {
    video.currentTime += 10;
  }
  if (e.key === 'ArrowLeft') {
    video.currentTime -= 10;
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault(); 
    video.volume += 0.1;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    video.volume -= 0.1;
  }
  if (e.key === '0') {
    video.currentTime = 0;
  }
  if (e.key === '1') {
    video.currentTime = video.duration / 4;
  }
  if (e.key === '2') {
    video.currentTime = video.duration / 2;
  }
  if (e.key === '3') {
    video.currentTime = video.duration * 3 / 4;
  }
  if (e.key === '4') {
    video.currentTime = video.duration;
  }
  if (e.key === 'Escape') {
    e.preventDefault();
    closeFullscreen();
  }
});


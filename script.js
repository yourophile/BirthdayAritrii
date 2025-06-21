const slider = document.querySelector('.slider');
const musicToggle = document.getElementById('musicToggle');
const birthdayMusic = document.getElementById('birthdayMusic');

let isMusicPlaying = false;

// Music control functions
function playMusic() {
  // Set volume to a soft, pleasant level (0.3 = 30% volume)
  birthdayMusic.volume = 0.3;
  
  birthdayMusic.play().then(() => {
    isMusicPlaying = true;
    musicToggle.classList.add('playing');
    musicToggle.innerHTML = '<ion-icon name="musical-notes"></ion-icon>';
    console.log('Happy Birthday music started playing! 🎵');
  }).catch(error => {
    console.log('Autoplay prevented:', error);
    // Show user that they need to click to start music
    musicToggle.innerHTML = '<ion-icon name="play"></ion-icon>';
    musicToggle.title = 'Click to play Happy Birthday music';
  });
}

function pauseMusic() {
  birthdayMusic.pause();
  isMusicPlaying = false;
  musicToggle.classList.remove('playing');
  musicToggle.innerHTML = '<ion-icon name="musical-notes"></ion-icon>';
  musicToggle.title = 'Click to play Happy Birthday music';
}

function toggleMusic() {
  if (isMusicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

// Try to autoplay music when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Attempt autoplay immediately
  playMusic();
  
  // Add click event for music toggle
  musicToggle.addEventListener('click', toggleMusic);
  
  // Additional autoplay attempts for better compatibility
  setTimeout(() => {
    if (!isMusicPlaying) {
      playMusic();
    }
  }, 1000);
  
  // Try autoplay on first user interaction
  document.addEventListener('click', function firstClick() {
    if (!isMusicPlaying) {
      playMusic();
    }
    document.removeEventListener('click', firstClick);
  }, { once: true });
  
  // Try autoplay on touch for mobile devices
  document.addEventListener('touchstart', function firstTouch() {
    if (!isMusicPlaying) {
      playMusic();
    }
    document.removeEventListener('touchstart', firstTouch);
  }, { once: true });
});

// Also try autoplay when window loads
window.addEventListener('load', () => {
  if (!isMusicPlaying) {
    playMusic();
  }
});

function activate(e) {
  const items = document.querySelectorAll('.item');
  // e.target.matches('.next') && slider.append(items[0]);
  // e.target.matches('.prev') && slider.append(items[items.length - 1]);
  console.log('Button clicked:', e.target.className);
  console.log('Number of items:', items.length);

  if (e.target.matches('.next')) {
    console.log('Next button clicked');
    slider.append(items[0]);
  }

  if (e.target.matches('.prev')) {
    console.log('Previous button clicked');
    slider.prepend(items[items.length - 1]);
  }
}
document.addEventListener('click', activate, false);

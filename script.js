import items from './items.js'; // Import the items array

let currentItem = null; // Variable to track the currently displayed item
let isTransitioning = false; // Prevent multiple transitions simultaneously
let randomizeInterval; // Interval ID for randomizing text
let audioBuffer = null; // Store decoded audio data

// Audio setup
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let gainNode = audioContext.createGain(); // For volume control

async function loadAudio(filePath) {
  const response = await fetch(filePath);
  const arrayBuffer = await response.arrayBuffer();
  audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
}

function playAudio(fadeDuration = 500) { // Shortened fade duration
  if (!audioBuffer) return;

  // Create a new audio source for each playback
  const audioSource = audioContext.createBufferSource();
  audioSource.buffer = audioBuffer;
  audioSource.loop = true; // Enable looping

  // Connect the source to the gain node and destination
  audioSource.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Fade in the audio
  gainNode.gain.setValueAtTime(0, audioContext.currentTime); // Start at volume 0
  gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + fadeDuration / 1000); // Fade in

  // Start playback
  audioSource.start(0);

  // Return the source so it can be stopped later
  return audioSource;
}

function stopAudio(audioSource, fadeDuration = 500) { // Shortened fade duration
  if (!audioSource) return;

  // Fade out the audio
  gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Start at full volume
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + fadeDuration / 1000); // Fade out

  // Stop playback after fade-out completes
  setTimeout(() => audioSource.stop(0), fadeDuration);
}

function initializeGallery() {
  const gallery = document.getElementById('thumbnail-gallery');
  const centralVideo = document.getElementById('central-video');
  const itemTitleLink = document.getElementById('item-title-link');
  const itemDescription = document.getElementById('item-description');

  // Disable the title and video links initially
  disableLink();

  items.forEach((item, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = item.thumbnail;
    thumbnail.alt = item.title;
    thumbnail.className = 'thumbnail';
    thumbnail.dataset.index = index;

    thumbnail.addEventListener('click', () => {
      if (isTransitioning) return; // Prevent overlapping transitions
      isTransitioning = true;

      disableLink(); // Disable links during transitions
      startRandomization(itemTitleLink, itemDescription); // Start text randomization

      if (currentItem && currentItem !== item) {
        // Play "clear" animation, followed by the new item's "show" animation
        const audioSource = playAudio(500); // Play audio during transition
        playClearAnimation(currentItem, item, audioSource);
      } else {
        // Directly play the "show" animation if no item is currently displayed
        const audioSource = playAudio(500); // Play audio during transition
        playShowAnimation(item, audioSource);
      }
    });

    gallery.appendChild(thumbnail);
  });

  function playShowAnimation(item, audioSource) {
    centralVideo.src = item.showAnimation;
    centralVideo.load();
    centralVideo.play();

    centralVideo.onended = () => {
      stopRandomization();
      updateDetails(itemTitleLink, itemDescription, item);
      enableLink(item); // Enable the link
      centralVideo.pause();
      stopAudio(audioSource, 500); // Fade out audio
      isTransitioning = false; // Allow new transitions
    };

    currentItem = item; // Update the current item
  }

  function playClearAnimation(clearItem, nextItem, audioSource) {
    centralVideo.src = clearItem.clearAnimation;
    centralVideo.load();
    centralVideo.play();

    centralVideo.onended = () => {
      playShowAnimation(nextItem, audioSource); // Play the "show" animation for the next item
    };
  }

  function startRandomization(titleElement, descriptionElement) {
    randomizeInterval = setInterval(() => {
      titleElement.textContent = generateRandomString(10); // Random 10-character string
      descriptionElement.textContent = generateRandomString(30); // Random 30-character string
    }, 100); // Change every 100ms
  }

  function stopRandomization() {
    clearInterval(randomizeInterval); // Stop randomizing text
  }

  function updateDetails(titleElement, descriptionElement, item) {
    titleElement.textContent = item.title; // Set the correct title
    descriptionElement.textContent = item.description; // Set the correct description
  }

  function enableLink(item) {
    // Set the title link
    itemTitleLink.setAttribute("href", item.url);
    itemTitleLink.setAttribute("target", "_blank");
    itemTitleLink.setAttribute("rel", "noopener noreferrer");
    itemTitleLink.classList.add("active");

    // Make the central video clickable
    centralVideo.classList.add("active");
    centralVideo.style.cursor = "pointer"; // Ensure the cursor appears clickable

    centralVideo.onclick = () => {
      // Dynamically create and click a hidden <a> element
      const link = document.createElement("a");
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link); // Append to the body
      link.click(); // Programmatically trigger the click
      document.body.removeChild(link); // Remove it after clicking
    };
  }

  function disableLink() {
    // Reset the title link
    itemTitleLink.removeAttribute("href");
    itemTitleLink.removeAttribute("target");
    itemTitleLink.removeAttribute("rel");
    itemTitleLink.classList.remove("active");

    // Reset the central video
    centralVideo.classList.remove("active");
    centralVideo.style.cursor = "default"; // Reset the cursor
    centralVideo.onclick = null; // Remove click handler
  }

  function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:",.<>?/\\~`';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  }
}

// Load the audio and initialize the gallery
window.onload = async () => {
  initializeGallery();
  await loadAudio('audio/flip.mp3'); // Load the audio file
};
import items from './items.js'; // Import the items array

let currentItem = null; // Variable to track the currently displayed item
let isTransitioning = false; // Prevent multiple transitions simultaneously
let randomizeInterval; // Interval ID for randomizing text

function initializeGallery() {
  const gallery = document.getElementById('thumbnail-gallery');
  const centralVideo = document.getElementById('central-video');
  const itemTitle = document.getElementById('item-title');
  const itemDescription = document.getElementById('item-description');

  items.forEach((item, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = item.thumbnail;
    thumbnail.alt = item.title;
    thumbnail.className = 'thumbnail';
    thumbnail.dataset.index = index;

    thumbnail.addEventListener('click', () => {
      if (isTransitioning) return; // Prevent overlapping transitions
      isTransitioning = true;

      startRandomization(itemTitle, itemDescription); // Start text randomization

      if (currentItem && currentItem !== item) {
        // Play the "clear" animation for the current item
        centralVideo.src = currentItem.clearAnimation;
        centralVideo.load();
        centralVideo.play();

        // After "clear" animation, play the "show" animation for the new item
        setTimeout(() => {
          playShowAnimation(item);
        }, currentItem.clearDuration);
      } else {
        // No current item or same item clicked, directly play "show" animation
        playShowAnimation(item);
      }
    });

    gallery.appendChild(thumbnail);
  });

  function playShowAnimation(item) {
    // Set the video to the "show" animation for the new item
    centralVideo.src = item.showAnimation;
    centralVideo.load();
    centralVideo.play();

    // Stop text randomization and update the details when the animation ends
    centralVideo.onended = () => {
      stopRandomization();
      updateDetails(itemTitle, itemDescription, item);
      centralVideo.pause();
      isTransitioning = false; // Allow new transitions
    };

    currentItem = item; // Update the current item
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

  function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:",.<>?/\\~`';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

// Initialize the gallery on page load
window.onload = initializeGallery;
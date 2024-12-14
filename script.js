import items from './items.js'; // Import the items array

let currentItem = null; // Variable to track the currently displayed item
let isTransitioning = false; // Prevent multiple transitions simultaneously
let randomizeInterval; // Interval ID for randomizing text

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
        // Play the "clear" animation for the current item
        centralVideo.src = currentItem.clearAnimation;
        centralVideo.load();
        centralVideo.play();

        setTimeout(() => {
          playShowAnimation(item);
        }, currentItem.clearDuration);
      } else {
        // Play "show" animation directly
        playShowAnimation(item);
      }
    });

    gallery.appendChild(thumbnail);
  });

  function playShowAnimation(item) {
    centralVideo.src = item.showAnimation;
    centralVideo.load();
    centralVideo.play();

    centralVideo.onended = () => {
      stopRandomization();
      updateDetails(itemTitleLink, itemDescription, item);
      enableLink(item); // Enable links when the "show" animation ends
      isTransitioning = false;
    };

    currentItem = item; // Update current item
  }

  function startRandomization(titleElement, descriptionElement) {
    randomizeInterval = setInterval(() => {
      titleElement.textContent = generateRandomString(10);
      descriptionElement.textContent = generateRandomString(30);
    }, 100);
  }

  function stopRandomization() {
    clearInterval(randomizeInterval);
  }

  function updateDetails(titleElement, descriptionElement, item) {
    titleElement.textContent = item.title;
    descriptionElement.textContent = item.description;
  }

  function enableLink(item) {
    // Update the title link
    itemTitleLink.setAttribute("href", item.url); // Add the href dynamically
    itemTitleLink.target = "_blank";
    itemTitleLink.rel = "noopener noreferrer";
    itemTitleLink.classList.add("active");

    // Make the central video clickable
    centralVideo.classList.add("active");
    centralVideo.onclick = () => {
      window.open(item.url, "_blank");
    };
  }

  function disableLink() {
    // Remove the href attribute completely
    itemTitleLink.removeAttribute("href");
    itemTitleLink.classList.remove("active");

    // Reset the central video
    centralVideo.classList.remove("active");
    centralVideo.onclick = null;
  }

  function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:",.<>?/\\~`';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
  }
}

// Initialize the gallery
window.onload = initializeGallery;
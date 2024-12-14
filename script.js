import items from './items.js'; // Import the items array

// Initialize the website
function initializeGallery() {
  const gallery = document.getElementById('thumbnail-gallery');
  const centralVideo = document.getElementById('central-video');
  const itemTitle = document.getElementById('item-title');
  const itemDescription = document.getElementById('item-description');

  // Populate the thumbnail gallery
  items.forEach((item, index) => {
    const thumbnail = document.createElement('img');
    thumbnail.src = item.thumbnail;
    thumbnail.alt = item.title;
    thumbnail.className = 'thumbnail';
    thumbnail.dataset.index = index; // Store index for reference

    // Add click event listener
    thumbnail.addEventListener('click', () => {
      // Set the video source to the show animation
      centralVideo.src = item.showAnimation;
      centralVideo.load();
      centralVideo.play();

      // Update the details
      itemTitle.textContent = item.title;
      itemDescription.textContent = item.description;

      // Pause the video on the last frame when it ends
      centralVideo.onended = () => {
        centralVideo.pause(); // Pauses on the last frame
      };
    });

    // Add the thumbnail to the gallery
    gallery.appendChild(thumbnail);
  });
}

// Initialize the gallery on page load
window.onload = initializeGallery;
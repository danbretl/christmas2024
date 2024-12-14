// Example items array
// Each item has:
// title, description, url, showAnimation, clearAnimation, thumbnail
const items = [
  {
    title: "Glorb",
    description: "Programmable geometric lamp",
    url: "https://glorb.me",
    showAnimation: "images/GlorbLamp-show.gif",
    clearAnimation: "images/GlorbLamp-clear.gif",
    thumbnail: "images/GlorbLamp-thumbnail.gif",
    showDuration: 2910,
    clearDuration: 2710
  },
  {
    title: "Electroll",
    description: "Electric marble roll in Walnut",
    url: "https://www.marbolous.com/products/electroll?variant=48466139939144",
    showAnimation: "images/Electroll-show.gif",
    clearAnimation: "images/Electroll-clear.gif",
    thumbnail: "images/Electroll-thumbnail.gif",
    showDuration: 2710,
    clearDuration: 2610
  },
  {
    title: "Ferrofluid sound visualizer",
    description: "Desktop sound visualizer",
    url: "https://asiro.store/products/ferrofluid-sound-visualizer-1",
    showAnimation: "images/Ferrofluid-show.gif",
    clearAnimation: "images/Ferrofluid-clear.gif",
    thumbnail: "images/Ferrofluid-thumbnail.gif",
    showDuration: 2710,
    clearDuration: 2710
  },
  {
    title: "Rainbow moon sweatshirt",
    description: "Glow in the dark sweatshirt in XL",
    url: "https://www.phiosuwan.com/men/the-rainbow-moonvoice-glow-in-the-dark-crewneck-sweatshirt",
    showAnimation: "images/MoonShirt-show.gif",
    clearAnimation: "images/MoonShirt-clear.gif",
    thumbnail: "images/MoonShirt-thumbnail.gif",
    showDuration: 2610,
    clearDuration: 2610
  },
  {
    title: "Piston fidget toy",
    description: "Pneumatic fidgeting",
    url: "https://www.metmo.co.uk/products/metmo-piston",
    showAnimation: "images/PistonToy-show.gif",
    clearAnimation: "images/PistonToy-clear.gif",
    thumbnail: "images/PistonToy-thumbnail.gif",
    showDuration: 2810,
    clearDuration: 2710
  },
  {
    title: "Helico fidget toy",
    description: "Rolly fidgeting",
    url: "https://www.metmo.co.uk/products/helico?variant=42217707405473",
    showAnimation: "images/HelicoToy-show.gif",
    clearAnimation: "images/HelicoToy-clear.gif",
    thumbnail: "images/HelicoToy-thumbnail.gif",
    showDuration: 2610,
    clearDuration: 2610
  },
  {
    title: "Cube fidget toy",
    description: "Cubic fidgeting",
    url: "https://www.metmo.co.uk/pages/the-cube-drop",
    showAnimation: "images/SteelCube-show.gif",
    clearAnimation: "images/SteelCube-clear.gif",
    thumbnail: "images/SteelCube-thumbnail.gif",
    showDuration: 2610,
    clearDuration: 2710
  },
  {
    title: "Jellyfish lamp",
    description: "Floating glowing jellyfish",
    url: "https://jellyflow.co/products/jellyfish-lamp-dancing-legs-rotating-tentacles-led-light",
    showAnimation: "images/JellyLamp-show.gif",
    clearAnimation: "images/JellyLamp-clear.gif",
    thumbnail: "images/JellyLamp-thumbnail.gif",
    showDuration: 2610,
    clearDuration: 2710
  },
  {
    title: "Sandelier",
    description: "Sand art in Sahara (Orange), any size",
    url: "https://sandelier.com/products/wall-mount-sandelier-black?variant=49366688661842",
    showAnimation: "images/SandFrame-show.gif",
    clearAnimation: "images/SandFrame-clear.gif",
    thumbnail: "images/SandFrame-thumbnail.gif",
    showDuration: 2810,
    clearDuration: 2710
  },
  {
    title: "Device desk mount",
    description: "Desk mount for iPhone or iPad",
    url: "https://cyber-vintage.com/products/supergrip-desk-mount-phone-tablet",
    showAnimation: "images/DeskMount-show.gif",
    clearAnimation: "images/DeskMount-clear.gif",
    thumbnail: "images/DeskMount-thumbnail.gif",
    showDuration: 2610,
    clearDuration: 2610
  },
  {
    title: "Bear art print",
    description: "Angry bear from 'I want my hat back'",
    url: "https://www.gallerynucleus.com/detail/13582/",
    showAnimation: "images/BearPrint-show.gif",
    clearAnimation: "images/BearPrint-clear.gif",
    thumbnail: "images/BearPrint-thumbnail.gif",
    showDuration: 2810,
    clearDuration: 2710
  },
  {
    title: "Pixel hoodie",
    description: "The most colorful hoodie in XL",
    url: "https://freshhoods.com/products/pied-hoodie?variant=40116247593037",
    showAnimation: "images/PixelHood-show.gif",
    clearAnimation: "images/PixelHood-clear.gif",
    thumbnail: "images/PixelHood-thumbnail.gif",
    showDuration: 2810,
    clearDuration: 2610
  },
  {
    title: "Art book color",
    description: "One of my favorite artists in color",
    url: "https://shrigshop.com/collections/david-shrigley-books/products/david-shrigley-books-get-your-shit-together-2022",
    showAnimation: "images/BookColor-show.gif",
    clearAnimation: "images/BookColor-clear.gif",
    thumbnail: "images/BookColor-thumbnail.gif",
    showDuration: 2810,
    clearDuration: 2610
  },
  {
    title: "Art book b&w",
    description: "One of my favorite artists in black & white",
    url: "https://shrigshop.com/collections/david-shrigley-books/products/david-shrigley-book-i-am-the-jug-you-are-the-glass",
    showAnimation: "images/BookBW-show.gif",
    clearAnimation: "images/BookBW-clear.gif",
    thumbnail: "images/BookBW-thumbnail.gif",
    showDuration: 2510,
    clearDuration: 2710
  },
  {
    title: "And lots and lots of surprises!",
    description: "Merry Christmas!",
    url: "https://www.google.com/search?q=surprise+gifts+for+a+39+year+old+man+who+loves+bright+colors%2C+technology%2C+and+art",
    showAnimation: "images/Surprises-show.gif",
    clearAnimation: "images/Surprises-clear.gif",
    thumbnail: "images/Surprises-thumbnail.gif",
    showDuration: 2810,
    clearDuration: 2710
  }
];

const centralImage = document.getElementById('central-image');
const titleEl = document.getElementById('item-title');
const descEl = document.getElementById('item-description');

let currentItemIndex = null;
let isAnimating = false;

// Show a clicked item
function showItem(index) {
  if (isAnimating) return;
  isAnimating = true;

  const newItem = items[index];

  if (currentItemIndex === null) {
    // No item currently displayed, just show this item's animation
    playShowAnimation(newItem, () => {
      currentItemIndex = index;
      isAnimating = false;
    });
  } else {
    // Another item is currently displayed
    const currentItem = items[currentItemIndex];
    playClearAnimation(currentItem, () => {
      // After clearing the old item, show the new one
      playShowAnimation(newItem, () => {
        currentItemIndex = index;
        isAnimating = false;
      });
    });
  }
}

// Play the clearing animation of the currently displayed item
function playClearAnimation(item, callback) {
  centralImage.src = item.clearAnimation;

  // After the clear animation is done, execute callback
  setTimeout(callback, item.clearDuration);
}

// Play the show animation for a new item
function playShowAnimation(item, callback) {
  centralImage.src = item.showAnimation;

  // After show animation completes, display final static state if needed.
  // If your GIF stops on the final frame and doesn't loop, you can just leave it.
  // If it loops, you'll need a separate final frame or consider using a non-looping GIF.
  setTimeout(() => {
    // Update title and description
    titleEl.textContent = item.title;
    descEl.textContent = item.description;

    // Make title, desc, and central image clickable to open the URL
    [titleEl, descEl, centralImage].forEach(el => {
      el.style.cursor = "pointer";
      el.onclick = () => {
        window.open(item.url, '_blank');
      };
    });

    callback();
  }, item.showDuration);
}

// Setup thumbnail clicks
const thumbnails = document.querySelectorAll('.thumbnail');
thumbnails.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const index = parseInt(thumb.getAttribute('data-index'), 10);
    showItem(index);
  });
});
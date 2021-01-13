const GAP = 5;
let selectedImage = 0;

const images = new Array(5).fill(null).map((_, index) => {
  const image = createSliderImage(
    `https://picsum.photos/id/${index + 900}/400`
  );
  return image;
});

function createSliderImage(imageUrl) {
  const image = document.createElement('img');
  image.src = imageUrl;
  slider.appendChild(image);
  return image;
}

function nextImage() {
  selectedImage = (selectedImage + 1) % images.length;
  scrollToNextImage();
}

function getImageWidth() {
  const { clientWidth } = images[selectedImage];
  return clientWidth + 2 * GAP;
}

function checkScreenImages() {
  const nonShownImages = (images.length - selectedImage + 1) * getImageWidth();
  return slider.clientWidth - nonShownImages >= 0;
}

function scrollToNextImage() {
  if (checkScreenImages()) selectedImage = 0;
  slider.scrollTo({
    top: 0,
    left: selectedImage * getImageWidth(),
    behavior: 'smooth',
  });
}

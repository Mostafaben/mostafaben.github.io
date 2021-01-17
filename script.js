const GAP = 5;
let isScrolling = false;
let timeOut;

const images = new Array(11).fill(null).map((_, index) => {
  const image = createSliderImage(`./assets/img/mockups/${index + 1}.png`);
  image.onclick = () => {
    isScrolling = true;
    openPreviewImage(index + 1);
    goToImage(index);
  };
  return image;
});

let selectedImage = 0;
const indicatorsContainer = document.createElement('div');
indicatorsContainer.classList.add('indicatorConatiner');
const sliderContainer = document.querySelector('.sliderContainer');
sliderContainer.appendChild(indicatorsContainer);
const indicators = createIndicators();
changeIndicator(selectedImage);
const previewImageContainer = document.querySelector('.previewImage');

function openPreviewImage(index) {
  previewImageContainer.style.display = 'flex';
  pImg.src = `./assets/img/mockups/${index}.png`;
  console.log(previewImageContainer.style.display);
}

function createSliderImage(imageUrl) {
  console.log(imageUrl);
  const image = document.createElement('img');
  image.src = imageUrl;
  slider.appendChild(image);
  return image;
}

function goToImage(next) {
  isScrolling = true;
  if (timeOut) clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    isScrolling = false;
  }, 1000);
  selectedImage = next;
  scrollToNextImage();
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
  slider.scrollTo({
    top: 0,
    left: selectedImage * getImageWidth(),
    behavior: 'smooth',
  });
  changeIndicator(selectedImage);
}

function createIndicators() {
  return images.map((_, index) => {
    const indicator = document.createElement('span');
    indicator.classList.add('indicator');
    indicatorsContainer.appendChild(indicator);
    indicator.onclick = () => {
      goToImage(index);
    };
    return indicator;
  });
}

function changeIndicator(page) {
  indicators.forEach((i) => i.classList.remove('selectedIndicator'));
  indicators[page].classList.add('selectedIndicator');
}

function scrollToFooter() {
  document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
}

previewImageContainer.onclick = (e) => {
  if (e.srcElement == previewImageContainer) {
    previewImageContainer.style.display = 'none';
  }
};

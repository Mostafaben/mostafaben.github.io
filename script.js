const GAP = -10;
let isScrolling = false;
let timeOut;

const images = new Array(5).fill(null).map((_, index) => {
  const image = createSliderImage(
    `https://picsum.photos/id/${index + 900}/400`
  );
  image.onclick = () => {
    isScrolling = true;
    goToImage(selectedImage, index);
  };
  return image;
});

let selectedImage = 0;
images[selectedImage].classList.add('selectedImage');
const indicatorsContainer = document.createElement('div');
indicatorsContainer.classList.add('indicatorConatiner');
const sliderContainer = document.querySelector('.sliderContainer');
sliderContainer.appendChild(indicatorsContainer);
const indicators = createIndicators();
changeIndicator(selectedImage);

slider.onscroll = (e) => {
  if (isScrolling) return;
  const {
    srcElement: { scrollLeft },
  } = e;
  const width = images[0].clientWidth;
  const index = Math.floor(scrollLeft / width);
  if (index !== selectedImage) goToImage(selectedImage, index);
};

function createSliderImage(imageUrl) {
  const image = document.createElement('img');
  image.src = imageUrl;
  slider.appendChild(image);
  return image;
}

function goToImage(pre, next) {
  isScrolling = true;
  if (timeOut) clearTimeout(timeOut);
  timeOut = setTimeout(() => {
    isScrolling = false;
  }, 1000);
  images[pre].classList.remove('selectedImage');
  selectedImage = next;
  images[selectedImage].classList.add('selectedImage');
  scrollToNextImage();
}

function nextImage() {
  images[selectedImage].classList.remove('selectedImage');
  selectedImage = (selectedImage + 1) % images.length;
  images[selectedImage].classList.add('selectedImage');
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
      goToImage(selectedImage, index);
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

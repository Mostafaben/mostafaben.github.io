const GAP = 20;
let isScrolling = false;
let timeOut;

const images = new Array(5).fill(null).map((_, index) => {
  const image = createSliderImage(
    `https://picsum.photos/id/${index + 900}/400`
  );
  image.onclick = () => {
    isScrolling = true;
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

slider.onscroll = (e) => {
  if (isScrolling) return;
  const {
    srcElement: { scrollLeft },
  } = e;
  const width = images[0].clientWidth;
  const index = Math.floor(scrollLeft / width);
  if (index !== selectedImage) goToImage(index);
};

function createSliderImage(imageUrl) {
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

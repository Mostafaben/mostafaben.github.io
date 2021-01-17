const GAP = 5;
let timeOut;

const images = new Array(11).fill(null).map((_, index) => {
  const image = createSliderImage(`./assets/img/mockups/${index + 1}.png`);
  image.onclick = () => {
    setTimeout(() => {
      openPreviewImage(index + 1);
    }, 500);
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

window.onscroll = () => {
  previewImageContainer.style.display = 'none';
};

window.onkeydown = (e) => {
  const { key } = e;
  switch (key) {
    case 'ArrowRight': {
      selectedImage = (selectedImage + 1) % images.length;
      pImg.src = `./assets/img/mockups/${selectedImage}.png`;
      break;
    }
    case 'ArrowLeft': {
      if (selectedImage < 1) selectedImage = images.length;
      else selectedImage = (selectedImage - 1) % images.length;
      pImg.src = `./assets/img/mockups/${selectedImage}.png`;
      break;
    }
  }
};

function openPreviewImage(index) {
  previewImageContainer.style.display = 'flex';
  pImg.src = `./assets/img/mockups/${index}.png`;
}

function createSliderImage(imageUrl) {
  const image = document.createElement('img');
  image.src = imageUrl;
  slider.appendChild(image);
  return image;
}

function goToImage(next) {
  if (timeOut) clearTimeout(timeOut);
  timeOut = setTimeout(() => {}, 1000);
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

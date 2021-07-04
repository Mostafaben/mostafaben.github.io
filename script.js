const GAP = 5;
let timeOut;
const previewImageContainer = document.querySelector('.previewImage');
const indicatorsContainer = document.createElement('div');
const imagesContainer = document.getElementById('imagesContainer');
let selectedImage = 0;

function createCard(url) {
  const div = document.createElement('div');
  div.classList.add('col', 'col-3');
  imagesContainer.appendChild(div);
  const image = document.createElement('img');
  image.src = url;
  div.appendChild(image);
  image.width = 310;
  image.classList.add('image');
  image.height = 300;
  return image;
}

const images = new Array(11).fill(null).map((_, index) => {
  const image = createCard(`./assets/img/mockups/${index + 1}.png`);
  image.onclick = () => {
    setTimeout(() => {
      openPreviewImage(index + 1);
    }, 500);
    goToImage(index);
  };
  return image;
});

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

function scrollToFooter() {
  document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
}

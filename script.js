const GAP = 5
let timeOut
const previewImageContainer = document.querySelector(".previewImage")
const indicatorsContainer = document.createElement("div")
const imagesContainer = document.getElementById("imagesContainer")
let selectedImage = 0
let imageIndex = 0
const x = window.matchMedia("(max-width: 600px)")

const imageCardTemplate = (index) => `
	<button onclick='openPreviewImage(${index + 1})'>Preview Project</button>
	click here to see the project details
  `

function createCard(url, index) {
	const div = document.createElement("div")
	div.classList.add("col", "col-12", "col-sm-12", "col-md-6", "col-lg-3")
	imagesContainer.appendChild(div)
	const image = document.createElement("img")
	image.src = url
	const imageCard = document.createElement("div")
	imageCard.classList.add("imageCard")
	imageCard.innerHTML = imageCardTemplate(index)
	div.appendChild(image)
	div.appendChild(imageCard)
	image.classList.add("image")
	return image
}

const images = new Array(11).fill(null).map((_, index) => {
	const image = createCard(`./assets/img/mockups/${index + 1}.png`, index)
	return image
})

window.onscroll = () => {
	previewImageContainer.style.display = "none"
}

function closeImagePreview(event) {
	const classList = event?.target.classList
	if (!event || classList.contains("previewImage"))
		previewImageContainer.style.display = "none"
}

window.onkeydown = (e) => {
	const { key } = e
	switch (key) {
		case "ArrowRight": {
			selectedImage = (selectedImage + 1) % images.length
			pImg.src = `./assets/img/mockups/${selectedImage}.png`
			break
		}
		case "ArrowLeft": {
			if (selectedImage < 1) selectedImage = images.length
			else selectedImage = (selectedImage - 1) % images.length
			pImg.src = `./assets/img/mockups/${selectedImage}.png`
			break
		}
	}
}

function scrollToImage(direction) {
	switch (direction) {
		case "RIGHT":
			imageIndex = (imageIndex + 1) % images.length
			break
		case "LEFT":
			imageIndex = (imageIndex - 1) % images.length
			break
	}
	const { clientWidth } = images[0]
	const left = (clientWidth + 20) * imageIndex
	imagesContainer.scroll({ left, behavior: "smooth" })
}

function openPreviewImage(index) {
	selectedImage = index
	previewImageContainer.style.display = "flex"
	console.log(index)
	pImg.src = `./assets/img/mockups/${index}.png`
}

function scrollToFooter() {
	document.getElementById("footer").scrollIntoView({ behavior: "smooth" })
}

function changeSliderImage(x) {
	if (!x.matches) {
	} else {
		const cols = imagesContainer.children
		imagesContainer.classList.remove("row")
		cols.forEach((element) => {
			element.classList = ["mobileImage"]
		})
	}
}

changeSliderImage(x)
x.addListener(changeSliderImage)

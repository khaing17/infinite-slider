const carousel = document.querySelector(".carousel");
const wrapper = document.querySelector(".wrapper");
const arrowBtns = document.querySelectorAll(".wrapper i");
const createRandNum = () => {
  return Math.floor(Math.random() * 100);
};
for (let i = 0; i < 9; i++) {
  let randomNum = createRandNum();

  let card = document.createElement("li");
  card.className = "card";

  let parent = document.createElement("div");
  parent.className = "img";

  let img = document.createElement("img");
  img.src = `https://picsum.photos/id/${randomNum}/200/300`;
  img.draggable = false;
  img.alt = "img";

  let h1 = document.createElement("h1");
  h1.textContent = "Mr Burner";

  let span = document.createElement("span");
  span.textContent = "Manager";

  parent.appendChild(img);
  card.append(parent, h1, span);
  document.querySelector(".carousel").appendChild(card);
}
const firsCardWidth = carousel.querySelector(".card").offsetWidth;
let isDragging = false,
  startX,
  timeOutId,
  startScrollLeft;
let cardPerView = Math.round(carousel.offsetWidth / firsCardWidth);
const carouselChildren = [...carousel.children];

carouselChildren
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
carouselChildren.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firsCardWidth : firsCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
  carousel.classList.add("dragging");
};

const dragging = (e) => {
  if (!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const autoPlay = () => {
  if (window.innerWidth < 768) return;
  timeOutId = setTimeout(() => (carousel.scrollLeft += firsCardWidth), 2000);
};
autoPlay();

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  clearTimeout(timeOutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("scroll", infiniteScroll);
document.addEventListener("mouseup", dragStop);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeOutId));
wrapper.addEventListener("mouseleave", autoPlay);

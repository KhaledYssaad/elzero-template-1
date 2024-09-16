let likes = document.querySelector(".likes"),
  heart = document.querySelector(".likes i"),
  likesCount = document.querySelector(".likes span");

likes.onclick = function () {
  if (heart.classList.contains("fa-regular")) {
    heart.classList.remove("fa-regular");
    heart.classList.add("fa-solid");
    heart.style.color = "#f44336";
    likesCount.innerText++;
  } else {
    heart.classList.remove("fa-solid");
    heart.classList.add("fa-regular");
    heart.style.color = "#777";
    likesCount.innerText--;
  }
};

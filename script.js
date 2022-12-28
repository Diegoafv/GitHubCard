const base_URL = "https://api.github.com/users/";
const GH_URL = "https://github.com/";

const user = "diegoafv";

const URL = `${base_URL}${user}`;
const IMG_URL = `${GH_URL}${user}.png`;

const username = document.querySelector("#username");
username.textContent = `@${user}`;

const avatar = document.querySelector("#avatar");
avatar.src = IMG_URL;

const generateBG = document.querySelector("#btn-generate-bg");

fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    const followers = document.querySelector("#followers");
    const following = document.querySelector("#following");
    const repos = document.querySelector("#repos");
    const company = document.querySelector("#company");
    const location = document.querySelector("#location");

    followers.textContent = data.followers;
    following.textContent = data.following;
    repos.textContent = data.public_repos;
    company.textContent = data.company;
    location.textContent = data.location;
    console.log(data);
  });

generateBG.addEventListener("click", () => {
  const cardContainer = document.querySelector(".card-container");
  const infoCard = document.querySelector(".info");
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const newColor = "#" + randomColor;
  cardContainer.style.backgroundColor = newColor;
  infoCard.style.backgroundColor = hexToRGB(newColor, 0.4);
});

function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

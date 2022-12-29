const proxyUrl = "https://api.codetabs.com/v1/proxy?quest=";
const base_URL = "https://api.github.com/users/";
const GH_URL = "https://github.com/";

const user = "diegoafv";

const generateBG = document.querySelector("#btn-generate-bg");
const searchUser = document.querySelector("#btn-search-user");
const searchInput = document.querySelector("#search-user-input");

const downloadLink = document.querySelector("#download-link");

const getUserInfo = (username) => {
  const URL = `${base_URL}${username}`;
  const IMG_URL = `${GH_URL}${username}.png`;

  fetch(URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("User not found!");
      }
    })
    .then((data) => {
      const usernameText = document.querySelector("#username");
      usernameText.textContent = `@${username}`;

      const avatar = document.querySelector("#avatar");
      avatar.src = proxyUrl + IMG_URL;

      const avatarContainer = document.querySelector(".avatar-container");
      avatarContainer.style.display = "flex";

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
    })
    .catch((error) => {
      alert(error);
    });
};

generateBG.addEventListener("click", () => {
  const cardContainer = document.querySelector(".card-container");
  const infoCard = document.querySelector(".info");
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const newColor = "#" + randomColor;
  cardContainer.style.backgroundColor = newColor;
  infoCard.style.backgroundColor = hexToRGB(newColor, 0.4);
});

searchUser.addEventListener("click", () => {
  const input = document.querySelector("#search-user-input");
  const username = input.value;
  getUserInfo(username);
  input.value = "";
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchUser.click();
  }
});

const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
};

getUserInfo(user);

/* 
const cardContainer = document.querySelector(".card-container");

  const canvas = document.createElement("canvas");
  canvas.width = cardContainer.offsetWidth;
  canvas.height = cardContainer.offsetHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(cardContainer, 0, 0);

  const pngUrl = canvas.toDataURL("image/png");

  downloadLink.href = pngUrl;
*/

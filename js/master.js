let gameName = "Guess the Naruto Character";
document.title = gameName;
document.querySelector(".howa").innerHTML = gameName;
// Setting Game Options

let currentCharacter = {}; // To store the current character being shown
let numbersOfTries = 6;
let currentTry = 1;
let numbersOfLetters;
let guess;
let one = [];
let nameG ;
let numberOfHints = 4;
// Fetch character data from API
async function fetdata() {
  try {
    const res = await fetch(
      "https://narutodb.xyz/api/character?page=1&limit=20"
    );
    const user = await res.json();
    // console.log(user);
    return user.characters; // Assuming the API returns an array of characters
  } catch (error) {
    console.error("Error fetching or displaying characters:", error);
  }
}

/***************************setting to page Item****************************** */

let maincolors = localStorage.getItem("color-option");

if (maincolors !== null) {
  document.documentElement.style.setProperty("--main-color", maincolors);
  //remove active class from all colors list Item

  document.querySelectorAll(".colors-list li").forEach((ell) => {
    ell.classList.remove("active");
    //Add  active class On Element whit Data-color === local Storage Item
    if (ell.dataset.color === maincolors) {
      ell.classList.add("active");
    }
  });
}

let backgroundOption = true;

let backgroundInterval;
//check if there`s Local storge random Background item
let backgroundLocalItem = localStorage.getItem("Background-option");
//check if random Background local storage is not EMpty
if (backgroundLocalItem !== null) {
  //Remove active calss from all Spans
  document.querySelectorAll(".random-bag span").forEach((e) => {
    e.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-bag .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-bag .no").classList.add("active");
  }
}

document.querySelector(".toggle-setting .fa-gear").onclick = function () {
  //loop for sett
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((ele) => {
  //loop on list Items
  ele.addEventListener("click", (e) => {
    //Set color on the Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    //set color on local storage
    localStorage.setItem("color-option", e.target.dataset.color);

    HandleActive(e);
  });
});

const bagColorOption = document.querySelectorAll(".random-bag span");

bagColorOption.forEach((span) => {
  span.addEventListener("click", (e) => {
    HandleActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("Background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("Background-option", false);
    }
  });
});

let landingPage = document.querySelector(".landing-page");

let imagArr = [
  "naruto01.jpg",
  "naruto02.jpg",
  "naruto03.jpg",
  "04.webp",
  "naruto05.webp",
  "06.jpg",
  "08.jpg",
  "09.webp",
  "16.jpg",
  "17.png",
  "naruto06.webp",
  "naruto07.jpg",
  "naruto08.jpg",
  "naruto09.jpg",
  "naruto10.png",
  "naruto11.png",
];

function randomizeImgs() {
  if (backgroundOption === true) {
    // loop for image translit

    backgroundInterval = setInterval(() => {
      // Get random number
      let randomNumber = Math.floor(Math.random() * imagArr.length);

      //change  Background Image url
      landingPage.style.backgroundImage =
        'url("/image/' + imagArr[randomNumber] + '")';
    }, 4000);
  }
}
randomizeImgs();

//create Popup with the image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //creat popap overlay
    let overlay = document.createElement("div");
    overlay.className = "popap-overlay";

    document.body.appendChild(overlay);
    //creat the popap Box
    let popapBox = document.createElement("div");
    popapBox.className = "popap-box";

    if (img.alt !== null) {
      //creat heading
      let imgHeding = document.createElement("h3");

      //creat text in image
      let imgText = document.createTextNode(img.alt);

      //Appand the text to heading
      imgHeding.appendChild(imgText);

      //Appand heading to the popap-pox

      popapBox.appendChild(imgHeding);
    }

    //creat image
    let popapImage = document.createElement("img");

    //set image src
    popapImage.src = img.src;

    popapBox.appendChild(popapImage);

    document.body.appendChild(popapBox);

    //creat the close span
    let closeButton = document.createElement("span");

    //creat the text button
    let closeButtonText = document.createTextNode("X");

    //Appand tht text in to button
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";

    //Append the closebutton in to popsp box
    popapBox.appendChild(closeButton);
  });
});

// Close popap

document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    //Remove The Current popap

    // e.target.parentElement.remove();
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popap-overlay").remove();
  }
});

// select All bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const alllinks = document.querySelectorAll(".links a");

function ScrollToSomewhere(element) {
  element.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

ScrollToSomewhere(allBullets);
ScrollToSomewhere(alllinks);

function HandleActive(ev) {
  //Remove Active Class Frome All Childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((ell) => {
    ell.classList.remove("active");
  });

  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalItem = localStorage.getItem("Bullets_option");
if (bulletsLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((bull) => {
  bull.addEventListener("click", (e) => {
    if (bull.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("Bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("Bullets_option", "none");
    }
    HandleActive(e);
  });
});

//Reset Button

document.querySelector(".reset-option").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("color-option");
  localStorage.removeItem("Background-option");
  localStorage.removeItem("Bullets_option");

  //Reload window
  window.location.reload();
};

togglebut = document.querySelector(".toggle-menu");
tlinks = document.querySelector(".links");

togglebut.onclick = function (e) {
  //stop propagation
  e.stopPropagation();

  this.classList.toggle("menu-active");

  tlinks.classList.toggle("open");
};
tlinks.onclick = function (e) {
  //stop propagation

  e.stopPropagation();
};
// click anywhere outside menu and toggle button

document.addEventListener("click", (e) => {
  if (e.target !== togglebut && e.target !== tlinks) {
    if (tlinks.classList.contains("open")) {
      togglebut.classList.toggle("menu-active");

      tlinks.classList.toggle("open");
    }
  }
});

//    // this  sulotion in chatgpt
// document.addEventListener("click", (e)=>{
//     if (!tlinks.contains(e.target) && !togglebut.contains(e.target)){
//         togglebut.classList.remove("menu-active");
//         tlinks.classList.remove("open");
//     }
// });

/***************************************************** */

// Function to start the game by displaying a random character

async function startGame() {
  const characters = await fetdata();
  if (characters && characters.length > 0) {
    // Pick a random character from the fetched data
    currentCharacter =
      characters[Math.floor(Math.random() * characters.length)];
    // Display the character's image and hint (not showing the name)
    const image = document.getElementById("character-image");
    image.src = currentCharacter.images[0] || "placeholder.jpg"; // Fallback image if not found
    const name = document.getElementById("character-name");
    name.textContent = "Name: ???"; // Hide the name from the player initially
    one = currentCharacter.name; //// name tha charater
  } else {
    console.log("No characters available to display.");
  }
}

// Check if the player's guess is correct
// function checkGuess() {
//   const guessInput = document.getElementById("guess-input");
//   const result = document.getElementById("result");
//   guess = guessInput.value.trim().toLowerCase();

//   if (guess === currentCharacter.name.toLowerCase()) {
//     result.textContent = "Correct! You guessed the character!";
//     result.style.color = "green";
//     const Name = document.getElementById("character-name");
//     Name.textContent = `Name: ${guess}`;
//   } else {
//     result.textContent = "Incorrect! Try again!";
//     result.style.color = "red";
//   }
//   guessInput.value = ""; // Clear input field
// }

async function getimage() {
  const char = await fetdata();
  // console.log(char);
  const divimgdata = document.querySelector(".image-box-1");

  char.forEach((e) => {
    const inage = document.createElement("img");
    inage.src = e?.images?.[0];
    divimgdata.appendChild(inage);
  });
}
// this is for see in that cheating
async function addinhtml() {
  const characters = await fetdata(); // Fetch data
  let charctersHTML = "";

  characters.forEach((chr) => {
    // Safely access properties
    const name = chr?.name || "Unknown Character";
    const image = chr?.images?.[0] || "placeholder.jpg"; // Use a placeholder image if none exists
    const jutsu = chr?.jutsu?.[0] || "No Jutsu";

    charctersHTML += `
            <div class="character">
                <h2 class="username">${name}</h2>
                <img src="${image}" alt="${name}">
                <p class="descreption">Jutsu: ${jutsu}</p>
            </div>
        `;
  });
  const elecarctre = document.querySelector(".characters");
  elecarctre.innerHTML = charctersHTML;
}
/**************************************** */

async function generateInput() {
 
  await startGame();
  const inputsContainer = document.querySelector(".inputs");
  const { name } = currentCharacter;
  nameG = name;

  numbersOfLetters = nameG.length;
  
  // Create Main Try Div
  for (let i = 1; i <= numbersOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");

    // Create Inputes
    for (let j = 1; j <= numbersOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);

  }
  // Focus On First Input In First Try Element
  inputsContainer.children[0].children[1].focus();

  // Disable All Inputs Except First One
  const inputsInDisabledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisabledDiv.forEach((input) => (input.disabled = true));

  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    // Convert Input To Uppercase
    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
    //   console.log(index);
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      // console.log(event);
      const currentIndex = Array.from(inputs).indexOf(event.target); // Or this
      // console.log(currentIndex);
      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }
      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
}

/**************************************************** */
let messageArea = document.querySelector(".message");

// Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click", getHint);

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);

function handleGuesses() {
    let successGuess = true;
  //   console.log(wordToGuess);
  for (let i = 1; i <= numbersOfLetters; i++) {
    const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    const letter = inputField.value.toLowerCase();
    const actualLetter =  nameG[i - 1].toLowerCase();

    
    // Game Logic
    if (letter === actualLetter) {
      // Letter Is Correct And In Place
      inputField.classList.add("yes-in-place");
    } else if ( nameG.includes(letter) && letter !== "") {
      // Letter Is Correct And Not In Place
      inputField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  // Check If User Win Or Lose
  if (successGuess) {
    messageArea.innerHTML = `You Win The Word Is <span>${nameG}</span>`;
    if (numberOfHints === 2) {
      messageArea.innerHTML = `<p>Congratz You Didn't Use Hints</p>`;
    }

    // Add Disabled Class On All Try Divs
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-inputs"));

    // Disable Guess Button
    guessButton.disabled = true;
    getHintButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    currentTryInputs.forEach((input) => (input.disabled = true));

    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false));

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      // Disable Guess Button
      guessButton.disabled = true;
      getHintButton.disabled = true;
      messageArea.innerHTML = `You Lose The Word Is <span>${nameG}</span>`;
    }
  }
}

function getHint() {
  if (numberOfHints > 0) {
    numberOfHints--;
    document.querySelector(".hint span").innerHTML = numberOfHints;
  }
  if (numberOfHints === 0) {
    getHintButton.disabled = true;
  }

  const enabledInputs = document.querySelectorAll("input:not([disabled])");
  // console.log(enabledInputs);
  const emptyEnabledInputs = Array.from(enabledInputs).filter(
    (input) => input.value === ""
  );
  // console.log(emptyEnabledInputs);

  if (emptyEnabledInputs.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
    const randomInput = emptyEnabledInputs[randomIndex];
    const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
    if (indexToFill !== -1) {
      randomInput.value = nameG[indexToFill].toUpperCase();
    }
  }
}

function handleBackspace(event) {
  if (event.key === "Backspace") {
    const inputs = document.querySelectorAll("input:not([disabled])");
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentInput = inputs[currentIndex];
      const prevInput = inputs[currentIndex - 1];
      currentInput.value = "";
      prevInput.value = "";
      prevInput.focus();
    }
  }
}

document.addEventListener("keydown", handleBackspace);

getimage();
window.onload = function () {
  generateInput();
};

addinhtml();
// generateInput();

// Event listeners for game interaction
document.getElementById("check-guess").addEventListener("click", checkGuess);

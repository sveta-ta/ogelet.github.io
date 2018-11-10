window.onload = pageLoad;
let gameField = document.getElementById('game_Field');
let selectedShirt;
let cardsNumber = 0;
let randomNumber = 0;
let randomNumbersArray = [];
let setTimer;
let sec = 0;
let countGames = 0;
let errorMessage = "";
let imgArray = [];

function pageLoad() {
  const startButton = document.getElementById("start_game");
  const profileForm = document.getElementById("profile_form");
  startButton.onclick = playGame;
}

function drawTable(number) {
  let arrayProfiles = [];
  for (i = 1; i <= number; i++) {
    let returnProfile = JSON.parse(localStorage.getItem("Gamer" + i));
    if (Number(returnProfile.score) > 0) {
      arrayProfiles.push(returnProfile)
    }
  }
  function compareScore(profile1, profile2) {
    return profile1.score - profile2.score;
  };
  arrayProfiles.sort(compareScore);
  const numberProfiles = arrayProfiles.length;
  
  if (numberProfiles > 10) {
    for (i = 0; i < 10; i++) {
      var row = document.createElement('tr');
      row.className = 'row' + i;
      row.innerHTML = i + 1 + ' ' + arrayProfiles[i].name + ' ' + arrayProfiles[i].score + 's';
      document.querySelector('.score_table').appendChild(row);
    }
  } else {
    for (i = 0; i < numberProfiles - 1; i++) {
      var row = document.createElement('tr');
      row.className = 'row' + i;
      row.innerHTML = i + 1 + ' ' + arrayProfiles[i].name + ' ' + arrayProfiles[i].score + 's';
      document.querySelector('.score_table').appendChild(row);

    }
  }
};

// constructor
function Gamer(firstName, lastName, email) {
  this.name = firstName + ' ' + lastName;
  this.email = email;
  this.score = 0;
}

function drawField() {
  document.querySelector('.wrapper__enter-block').style.display = "none";
  for (i = 0; i < cardsNumber; i++) {
    var card = document.createElement('div');
    card.className = 'card card_' + imgArray[i];
    card.innerHTML = selectedShirt === "shirt1" ? '<div class="card_shirt card_shirt_1"></div><div class="card_main"></div>' : '<div class="card_shirt card_shirt_2"></div><div class="card_main"></div>';
    gameField.appendChild(card)
  }
};

function pad(val) { return val > 9 ? val : "0" + val; }

function playGame() {
  const gamerFirstName = document.getElementById("first_name").value,
    gamerLastName = document.getElementById("last_name").value,
    gamerEmail = document.getElementById("email").value;
  function checkForm() {
    if (gamerFirstName && gamerLastName && gamerEmail) {
      return 'true';
    } else {
      return errorMessage = 'Please fill the form'
    }
  };
  function setGameParametres() {
    selectedShirt = document.querySelector("#profile_form input[name='shirt']:checked").value;
    cardsNumber = document.querySelector("#profile_form input[name='number']:checked").value;
    const newGamer = new Gamer(gamerFirstName, gamerLastName, gamerEmail);
    if (localStorage['countGames']) {
      countGames = Number(localStorage.getItem('countGames')) + 1
    }
    else {
      countGames++
    }
    var serialGamer = JSON.stringify(newGamer)
    localStorage.setItem("Gamer" + countGames, serialGamer);
    localStorage.setItem("countGames", countGames);
    var localValue = localStorage.getItem("Gamer" + countGames);
    function getRandom() {
      return Math.floor(Math.random() * cardsNumber);
    }

    do { setRandomNumbersArray() } while (randomNumbersArray.length < cardsNumber);
    function setRandomNumbersArray() {
      randomNumber = getRandom() + 1;
      if (randomNumbersArray.indexOf(randomNumber) < 0) {
        randomNumbersArray.push(randomNumber);
      };
    };

    imgArray = randomNumbersArray.map(function (elem) {
      if (elem > cardsNumber / 2) {
        return elem - cardsNumber / 2;
      } else { return elem }
    });

    drawField();
    var selectedCard;
    game_Field.onclick = function (event) {
      var target = event.target;
      if (target.classList.contains('card_shirt card_shirt_1') || target.classList.contains('card_shirt card_shirt_2')) {
        alert(target.classList);
        return;
      };
      rotateCards(target);
    };

    function rotateCards(node) {
      if (selectedCard) {
        node.parentNode.classList.add('rotate');
        if (selectedCard.parentNode.className === node.parentNode.className && selectedCard.parentNode !== node.parentNode) {
          setTimeout(function () {
            selectedCard.parentNode.classList.add('remove');
            node.parentNode.classList.add('remove');
          }, 950)
          setTimeout(function () {
            game_Field.removeChild(selectedCard.parentNode);
            game_Field.removeChild(node.parentNode);
            selectedCard = undefined;
            if (game_Field.childNodes.length <= 3) {
              const scoreSeconds = document.getElementById("seconds").innerHTML;
              const scoreMinutes = document.getElementById("minutes").innerHTML;
              const winnerMessage = "You win!!! Your score is  " + scoreMinutes + ' minutes ' + scoreSeconds + ' seconds';
              document.querySelector('.wrapper_after_game').style.display = 'block';
              document.querySelector('.wrapper_after_game .greeting_title').innerHTML = winnerMessage;
              newGamer.score = scoreMinutes * 60 + scoreSeconds;
              var serialGamer = JSON.stringify(newGamer)
              localStorage.setItem("Gamer" + countGames, serialGamer);
              clearInterval(setTimer);
              drawTable(countGames);
            }
          }, 1300);
        } else {
          setTimeout(function () {
            selectedCard.parentNode.classList.remove('rotate');
            node.parentNode.classList.remove('rotate');
            selectedCard = undefined;
          }, 950);
        }
      } else {
        selectedCard = node;
        selectedCard.parentNode.classList.add('rotate');
      }

    }
  };
  
  if (checkForm() === 'true') {
    setGameParametres();
    document.querySelector(".wrapper_game").style.display = 'flex';
    setTimer = setInterval(function () {
      document.querySelector('.timer').style.display = 'block';
      document.getElementById("seconds").innerHTML = pad(++sec % 60);
      document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
    }, 1000);
  } else {
    alert(errorMessage);
  }
}




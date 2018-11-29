
//////////////// Get the element with the ID of qwerty and save it to a variable.
const qwerty = document.getElementById('qwerty');
const overlay = document.getElementById('overlay');
/////////////Get the element with the ID of phrase and save it to a variable.
const phrase = document.getElementById('phrase');
//Create a missed variable,
let missed = 0;

const tries = document.querySelectorAll('.tries');

const startButton = document.querySelector('.btn__reset');
const title = document.querySelector('.title');


//////////////////phrases array with 5 strings, letters and spaces only, no punctuation or special characters
const phrases = [
"hello there",
"winner",
"love is all",
"amazing time",
"hi again"
];



///////////////////////////This function should randomly choose a phrase from the phrases array and split
function getRandomPhraseAsArray(array) {
  let random = array[Math.floor(Math.random()*array.length)];
  const lettersPrase = random.split('');
  return lettersPrase;
}

///////////////////////////////function to select random phrase and add to the gameboard, then add classes of "letter" or "space"
function addPhraseToDisplay(arr) {
  //const ul = phrase.firstElementChild;
  const ul = document.getElementById('phrase')
  for(let i = 0; i < arr.length; i+=1) {
    let li = document.createElement('li');
    li.textContent = arr[i];
      if(arr[i] === ' ') {
        li.classList.add("space");
      } else {
        li.classList.add("letter");
      }
    ul.appendChild(li);
  }
}

////////////////////checkLetter function
/////////////////////////parameter: the button
function checkLetter(button) {
const letters = document.querySelectorAll('.letter');
  ////////////////////////returns null
  let letterFound = null;
  //////////////////////////////loop over the letters
  for(let i = 0; i < letters.length; i+=1) {
    if( letters[i].textContent.toLowerCase() == button.textContent ) {
      letters[i].classList.add('show');
      letterFound = letters[i].textContent;
     }
  }
  return letterFound;
};

// //checks if the game is won, lost or keep playing
function checkWin(){
  const shown= document.querySelectorAll('.show');
  if(letters.length === shown.length) {
    overlay.classList.replace('start', 'win');
    const h2 = document.createElement('h2');
    h2.textContent = "Won";
    overlay.appendChild(h2);
    const startAgain = overlay.querySelector('a');
    startButton.innerHTML="TRY AGAIN?";
    overlay.insertBefore(h2, startAgain);
    overlay.style.visibility="visible";

  } else if (missed === 5 ) {
    overlay.classList.replace('start', 'lose');
    const h2 = document.createElement('h2');
    h2.textContent = "Lost";
    overlay.appendChild(h2);
    const startAgain = overlay.querySelector('a');
    startButton.innerHTML="TRY AGAIN?";
    overlay.style.visibility="visible";
  }
}


////////////////////restart the page
function reStart() {
  location.reload();
};


const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

const letters = document.querySelectorAll('.letter');


///////////////////////////////Add an event listener to the keyboard.
qwerty.addEventListener('click', (e) => {
///////////////////////////////When a player chooses a letter, add the “chosen” class
  if (e.target.tagName == "BUTTON") {
    const button = e.target;
    button.classList.add("chosen");
    let letterFound = checkLetter(button);
    if (letterFound !== null) {
    ////////////////////////////////////attribute you can set called “disabled” that when set to true
      button.disabled = true;
    } else {
    const imgs = tries[missed].firstElementChild;
    imgs.setAttribute("src", "images/lostHeart.png");
      missed += 1;
    }
  checkWin();
  }
});

///////////////////////////////// Attach a event listener to the “Start Game” button to hide the start screen overlay.
overlay.addEventListener('click', (e) => {
  if (e.target.className === 'btn__reset') {
      const button = e.target;
      if(button.innerHTML === "Start Game"){
        overlay.style.visibility="hidden";
      } else if(button.innerHTML === "TRY AGAIN?"){
        reStart();
       }

    }
});

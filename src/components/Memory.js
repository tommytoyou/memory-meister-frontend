import React from 'react';
import { Link } from 'react-router-dom';


let button = document.getElementById('shuffleButton');

button.addEventListener("click", () => {
  console.log(mydeck)
  flipCards(mydeck)
})


class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;

  }
}

class Deck {
  constructor() {
    this.deck = [];
  }
  createDeck(suits, values) {
    for (let suit of suits) {
      for (let value of values) {
        this.deck.push(new Card(suit, value));
      }
    }
    return this.deck.length;
  }
  shuffle() {
    let counter = this.deck.length, temp, i;

    while (counter) {
      i = Math.floor(Math.random() * counter--);
      temp = this.deck[counter];
      this.deck[counter] = this.deck[i];
      this.deck[i] = temp;
    }
    return this.deck;
  }
  deal() {
    let hand = [];
    while (hand.length < 9) {
      hand.push(this.deck.pop());
    }
    return hand;
  }
}
let suits = ['Diamonds'];
let values = [2, 3, 4, 5, 6, 7, 8, 9, 10];
let deck = new Deck();
deck.createDeck(suits, values);
let mydeck = deck.shuffle();


let leftCard = document.querySelector(".parentLeftImage")
function flipCards(mydeck) {
  let intervalTracker = null
  let cardIndex = 0
  intervalTracker = setInterval(() => {
    if (cardIndex === mydeck.length) {
      leftCard.setAttribute("src", "assets/playing-cards-back.png")
      console.log('stop')
      clearInterval(intervalTracker)
    } else {
      console.log(cardIndex)
      leftCard.setAttribute("src", `assets/${mydeck[cardIndex].value}D.png`)
     
      console.log("keep incrementing")
      cardIndex++
    }
  }, 500)
}


mydeck.sort()
for (let i = 2; i < 11; i++) {
  let divD = document.createElement("div");
  console.log(divD)
  divD.classList.add(`D${i}`)

  divD.onclick = function pickCard() {
    mydeck.sort()
    let element = document.querySelector(`.${divD.className}`);
    let style = getComputedStyle(element);
    let backgroundImage = style.backgroundImage;
    let parentRightImage = document.querySelector('.parentRightImage');
    parentRightImage.src = `.${backgroundImage.slice(60, -2)}`;
    // Update src of leftCard based on what mydeck[0] is
    // Then we do an if statement and do this to check that 
    //the value of the card the user clicked
    // matches the value of mydeck[0]
    // if it does were going to call mydeck.shift to remove the first item of my deck
    // If it is not game over and trigger impermenance statement
    leftCard.setAttribute("src", `assets/${mydeck[0].value}D.png`)
    
    if ( divD.className == `D${mydeck[0].value}`){
      mydeck.shift()
    } else if ( divD.className !== `D${mydeck[0].value}`){
      console.log(divD, `D${mydeck[0].value}`)
      alert("The meaning of life is impermenance. Please try again")
    }
  }
  document.querySelector('.suit-container').append(divD);
}




export default Memory;
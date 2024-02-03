// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let prompt = input.question("Let's play some scrabble! Enter a word: ");
   //console.log(oldScrabbleScorer(prompt));
   return prompt
};

function simpleScorer(word) {
   word = word.toUpperCase();
   let score = '';
   for(let i = 0; i<word.length; i++) {
     score += `Points for ${word[i]}: 1\n`
   }
   return score
 }
 
let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let score = '';
   let vowels = ['A','E','I','O','U'];

   for (let i=0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         score+= `Points for ${word[i]}: 3\n`
      } else {
          score += `Points for ${word[i]}: 1\n`
   }
}
  return score
}

let simpleScore = {
   name: `Simple Score`,
   description: `Each leter is worth 1 point.`,
   scoringFunction: simpleScorer
};

let bonusVowels = {
   name: `Bonus Vowels`,
   description: `Vowels are 3 pts, consonants are 1pt.`,
   scoringFunction: vowelBonusScorer
};

let scrabble = {
   name: `Scrabble`,
   description: `The traditional scoring algorithm.`,
   scoringFunction: oldScrabbleScorer
};

let scrabbleScorer;

const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

function scorerPrompt(word) {
   let selectScorer = input.question(`
   Which scoring algorithm would you like to use?
   
   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system
   Enter 0, 1, or 2:
   
   `);
   console.log(scoringAlgorithms[selectScorer].scoringFunction(word))
}

function transform() {};

let newPointStructure;

function runProgram() {
   word = initialPrompt();
   scorerPrompt(word);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

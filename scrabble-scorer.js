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

let formatStr = (str) => str.split(' ').join('').toUpperCase();

function oldScrabbleScorer(word) {
	word = formatStr(word);
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
   //let isValid = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "R", "X", "Y", "Z", " "]
   // let empty = [];
   for (key in newPointStructure){  
     empty.push(key);
     console.log(key)
   }
   
   let prompt = input.question("Let's play some scrabble! Enter a word: ");
   prompt = formatStr(prompt);
     
   // while(!empty.includes(prompt)){
   //     prompt = input.question(`Word must be [a-z] or " ": `);
   //     prompt = formatStr(prompt);
   //     }
   return prompt
}

function simpleScorer(word) {
   let score = word.length;
   for(let i = 0; i<word.length; i++) {
     console.log(`Points for ${word[i]}: 1`)
   }
   console.log(`"${word}" | Total Points: `)
   return score
 }
 
let vowelBonusScorer = function(word) {
   word = formatStr(word);
   let total = 0;
   //let score;
   let vowels = ['A','E','I','O','U'];
   for (let i=0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         console.log(`Points for ${word[i]}: 3\n`)
         total += 3;
      } else {
          console.log(`Points for ${word[i]}: 1\n`)
          total += 1;
   }
}
console.log(`"${word}" | Total Points: `)   
return total
}

let simpleScore = {
   name: `Simple Score`,
   description: `Each letter is worth 1 point.`,
   scorerFunction: simpleScorer
};

let bonusVowels = {
   name: `Bonus Vowels`,
   description: `Vowels are 3 pts, consonants are 1pt.`,
   scorerFunction: vowelBonusScorer
};

let scrabble = {
   name: `Scrabble`,
   description: `The traditional scoring algorithm.`,
   scorerFunction: scrabbleScorer
};

 function scrabbleScorer(word) {
  let total = 0;
  
  for(let i=0; i<word.length; i++){
    for(key in newPointStructure) {
      if(key.toUpperCase().includes(word[i])){
        console.log(`Points for '${word[i]}': ${Number(newPointStructure[key])}`)
        total+= Number(newPointStructure[key])
      }
    }
  }
  console.log( `'${word}', total points: ${total}!`)
  return total
 
}


const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

function scorerPrompt(word) {
   let selectScorer = input.question(`
   Which scoring algorithm would you like to use?
   
   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system
   Enter 0, 1, or 2:
   
   `);
   selectScorer = Number(selectScorer);
  
   while(!(selectScorer == 0||selectScorer==1||selectScorer==2)) {
      selectScorer = input.question(`Invalid Entry: Try again. 
      
      0 - Simple: One point per character
      1 - Vowel Bonus: Vowels are worth 3 points
      2 - Scrabble: Uses scrabble point system
      Enter 0, 1, or 2:
      `);
      selectScorer = Number(selectScorer);
   }
   console.log(scoringAlgorithms[selectScorer].scorerFunction(word))
}

function transform(obj) {
   let transformedObj = {};
   for (key in obj) {
      for (let i = 0; i <obj[key].length; i++) {
         transformedObj[obj[key][i].toLowerCase()] = Number(key);
      }
   }
   return transformedObj
}

const newPointStructure = transform(oldPointStructure);
newPointStructure[" "] = 0;
//console.log(newPointStructure)

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

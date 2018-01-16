const arrQuestions = ["Which is the most populous continent?", "What is the capital of New Zealand?", "Which ocean is to the north of the Russian Federation?", "What do we call a mountain which could erupt?" ,"In which country is Mount Everest?" ,"Which sport is played at Wimbledon?", "How many rings are there in the Olympic Games symbol?" ,"Who invented the telephone?", "Who developed the theory of relativity?", "Which classical composer became deaf at an advanced age?" ,"Who wrote the books about Harry Potter?", "What is the traditional musical instrument of Scotland?", "His favourite drink is blood.", "An ugly woman practicing magic.", "What do we call the study of birds?"];
const arrAnswers = ["Asia", "Wellington", "Arctic Ocean", "volcano", "Nepal", "tennis", "5", "Alexandre Bell", "Albert Einstein", "Beethoven", "Joanne Rowling", "bagpipes", "vampire", "witch", "ornithology"];
const arrVariants = [["africa", "Asia", "europe", "north america"], ["Wellington", "Luanda", "Canberra", "Havana"], ["Indian Ocean", "Arctic Ocean", "Pacific Ocean", "Southern Ocean" ], ["big mountain", "true mountain", "volcano", "cool mountain"], ["India", "Indonesia", "Senegal", "Nepal"], ["tennis", "football", "golf", "basketball"], ["5", "3", "9", "7"], ["Alexandre Bell", "Marie Curie", "Otto Hahn", "Nikola Tesla"], ["Albert Einstein", "Alexandre Bell", "Marie Curie", "Otto Hahn"], ["Beethoven", "Johann Sebastian Bach", "Giuseppe Tartini", "Carlo Graziani"], ["Joanne Rowling", "Sarah Flower Adams", "George Eliot", "Agatha Christie"], ["bagpipes", "Balafon", "Glockenspiel", "Marimba"], ["vampire", "zombie", "werewoolf", "sorcerer"], ["witch", "enchantress", "fairy", "vampire"], ["ornithology", "biology", "geology", "meteorology"]];
const question = document.getElementById('question');
const form1 = document.getElementById('variants');
var counter = 0;
const radioButtons = document.querySelectorAll(".variant-input");
const radioLabels = document.querySelectorAll(".variant-label");
question.innerHTML = arrQuestions[counter];
radioButtons.forEach(function(elem,index) {
  elem.value = arrVariants[counter][index];
});
radioLabels.forEach(function(elem,index) {
  elem.innerHTML = arrVariants[counter][index];
});
let countOfAnswers = 0;
let countOfRightAnswers = 0;
function checkAnswer(){
	countOfAnswers++;
	console.log(countOfAnswers);
	radioButtons.forEach(function(elem){
		if(elem.checked === true){
			if(elem.value === arrAnswers[counter]){ alert ("yes"); countOfRightAnswers++;} else {alert ("no, the right answer " +  arrAnswers[counter])};
		 };
	});
	console.log(countOfRightAnswers)
	counter++;
	if (counter < arrQuestions.length){
		question.innerHTML = arrQuestions[counter]
	};
	radioButtons.forEach(function(elem) {
	  elem.checked = false
	});
radioButtons.forEach(function(elem,index) {
  elem.value = arrVariants[counter][index];
});
radioLabels.forEach(function(elem,index) {
  elem.innerHTML = arrVariants[counter][index];
});

};


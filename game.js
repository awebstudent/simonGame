var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];

$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});


function nextSequence(){
  userClickedPattern = [];
  level++;
 $("h1").text("Level " + level);

  var randomNumber = Math.round(Math.random() * 3);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");
  setTimeout(function(){
   $("." + currentColour).removeClass("pressed")
    },100);
}

var level = 0;
var start = false;
$(document).on("keydown",function(){
  if(start === false){
     $("h1").text("Level " + level);
    nextSequence();
    start = true;

 }
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over!");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

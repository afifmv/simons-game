buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
gameStarted = false;
level = 0;

$(document).on("keypress", function () {
  if (gameStarted) {
  } else {
    gameStarted = true;
    $("h1").text("Level " + level);
    nextSequence();
  }
});

$(".btn").on("click", function (event) {
  userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  randomNumber = generateRandomBetweenZeroToThree();
  randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);

  playGamePattern();
}

function generateRandomBetweenZeroToThree() {
  randomNumber = Math.random();
  if (randomNumber > 0.4) {
    generateRandomBetweenZeroToThree();
  }
  return Math.floor(randomNumber * 10);
}

function playSound(name) {
  audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("correct!");
    if (gamePattern.length == currentLevel + 1) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    console.log("wrong!");
    audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

function playGamePattern() {
  for (index in gamePattern) {
    delayedTask(index);
  }
}

function delayedTask(index) {
  setTimeout(function () {
    color = gamePattern[index];
    $("#" + color)
      .fadeOut(100)
      .fadeIn(100);

    playSound(color);
  }, 50 * (index + 1));
}

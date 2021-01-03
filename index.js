const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let index = 0;

//color pattern
function nextSequence() {
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    index = 0;
    nextLevel();
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    const sound = new Audio("sounds/" + randomChosenColour + ".mp3");
    sound.play();
}

function setTimeoutToPlay(time) {
    setTimeout(function() {
        nextSequence();
    }, time) 
}

function pressA() {
    $(document).on("keypress", function(event) {
        if (event.which === 97) {
            setTimeoutToPlay(600)
        }   
        $(document).off();
    })
}

function gameOver() {
    $("#level-title").text("Game Over");
    const sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    gamePattern = [];
    
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200)

    setTimeout(function() {
        $("#level-title").text("Press A Key to continue")
    }, 1000)
}

$(".btn").on("click", function() {
    
    const that = this
    $(this).addClass("pressed");
    setTimeout(function() {
        $(that).removeClass("pressed");
    }, 100);

    const gamePatternIndex = gamePattern[index];
    const btnId = $(this).attr("id")
    
    if (btnId === gamePatternIndex) {
        if (gamePattern.length === index + 1) {
            setTimeoutToPlay(1000);
        } else {
            index++
        } 
       
    } else {
        gameOver();

    }
})

function nextLevel() {
    $("#level-title").text("Level " + gamePattern.length)
}

pressA();
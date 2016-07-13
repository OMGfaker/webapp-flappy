jQuery("#credits").on("click", function() {
    var message = "Game created by Galvin!";
    alert(message);
});

function registerScore(score) {var playerName = prompt("What's your name?");
var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";

}

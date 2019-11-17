

var currentTime = 0;

alert("When the screen turns green, press any key as soon as possible!");

var stopGame = (event) => {
    if (started) {
        var timeTaken = (new Date().getTime() - currentTime) / 1000;
        alert(`You took ${timeTaken} seconds to respond!`);
        started = false;
        fetch("/addgame", {
            "method": "POST",
            "body": JSON.stringify({
                'age': parseInt(age),
                'sleep': sleep,
                'time': time,
                'reflex': timeTaken
            })
        }).then((response) => alert("Thank you for playing! You may now close this page."));
        window.removeEventListener('keydown', stopGame);
    } else {
        alert("Too early! Try again!");

        alert("When the screen turns green, press any key as soon as possible!");

        document.getElementById("colorchanger").style.backgroundColor = "#FF5252";

        var timeToSleep = Math.random() * 10;
        console.log(timeToSleep);

        setTimeout(startGame, timeToSleep*1000);
    }

}

var startGame = () => {
    console.log("Started game");
    document.getElementById('colorchanger').style.backgroundColor = "#69F0AE";
    currentTime = new Date().getTime();
    started = true;
}

window.addEventListener('keydown', stopGame);

var timeToSleep = Math.random() * 5 + 2;

setTimeout(startGame, timeToSleep*1000);

var started = false;
var email = null;
var age = null;
var sleep = null;
var time = null;

var zoomtext = document.getElementById("zoomtext");
var intro = document.getElementById("intro");
var instructions = document.getElementById("instructions");
var game = document.getElementById("game");
var gamearrow = document.getElementById("gamearrow");
var outro = document.getElementById("outro");

var data = []; 

function startgame() {
    alert("Let's just get through a few statistical questions before the epic game! Please answer them as accurately as you can - they are critical to our results.");
    email = prompt("What's your email?");
    while (!confirm(`Is ${email} correct?`)) {
        email = prompt("No problem! Please enter it again: ");
    }

    age = null;
    while (!age) {
        age = prompt("To the nearest year, how old are you?");
        if (!age) alert("Please enter an integer!");
    }

    sleep = null;
    while (!sleep) {
        sleep = parseInt(prompt("How much sleep did you get last night? Enter it as a single whole number."))
        if (!sleep) alert("Please enter an integer!");
    }

    time = new Date().getHours();

    letsdothis();

}

function letsdothis() {

    intro.style.display = "none";

    zoomtext.innerText = "Let's";
    zoomtext.style.display = "block";
    setTimeout(() => {
        zoomtext.innerText = "Do";
        zoomtext.style.animation = "none";
        zoomtext.offsetHeight;
        zoomtext.style.animation = null;

        setTimeout(() => {
            zoomtext.innerText = "This!";
            zoomtext.style.animation = "none";
            zoomtext.offsetHeight;
            zoomtext.style.animation = null;

            setTimeout(instruct, 1000);

        }, 1000);
    }, 1000);
}

function instruct() {
    instructions.style.display = "block";
    var dismissInstructions = () => {
        window.removeEventListener('keydown', dismissInstructions);
        play();
    }
    window.addEventListener('keydown', dismissInstructions);
}

var newNum;
var timeGenerated;
function generateNew() {
    gamearrow.style.color = null;
    newNum = Math.ceil(Math.random() * 3);

    var newColor = "";
    var newIcon = "";

    switch (newNum) {
        case 1:
            newColor = "yellow";
            newIcon = "arrow_back";
            break;
        case 2:
            newColor = "green";
            newIcon = "arrow_upward";
            break;
        case 3:
            newColor = "red";
            newIcon = "arrow_forward";
            break;
    }

    game.style.backgroundColor = newColor;
    gamearrow.innerText = newIcon;

    timeGenerated = new Date().getTime();
}

function regRight(timeElapsed) {
    console.log("Yeet");
    gamearrow.style.color = "green";
    gamearrow.innerText = "check";
    data.push({
        "status": "correct",
        "time": timeElapsed
    });
}

function regWrong(timeElapsed) {
    gamearrow.style.color = "red";
    gamearrow.innerText = "clear";
    data.push({
        "status": "incorrect",
        "time": timeElapsed
    });
}

var trials = 1;
function play() {
    instructions.style.display = "none";
    game.style.display = "block";

    setTimeout(generateNew, Math.floor(Math.random() * 3000) + 1000);
    window.addEventListener('keydown', (event) => {
        console.log(event.key);
        if (newNum) {
            var timeElapsed = (new Date().getTime() - timeGenerated) / 1000;
            switch (newNum) {
                case 1:
                    (event.key === "ArrowLeft") ? regRight(timeElapsed) : regWrong(timeElapsed);
                    break;
                case 2:
                    (event.key === "ArrowUp") ? regRight(timeElapsed) : regWrong(timeElapsed);
                    break;
                case 3:
                    (event.key === "ArrowRight") ? regRight(timeElapsed) : regWrong(timeElapsed);
                    break;
            }
            game.style.backgroundColor = "black";
            newNum = null;
            if (trials < 15) {
                setTimeout(generateNew, Math.floor(Math.random() * 3000) + 1000);
                trials += 1;
            } else {
                conclude();
            }
        }   
    });
}

function conclude() {
    game.style.display = "none";
    outro.style.display = "block";

    outro.innerText = `
    Thank you for playing!
    Trial 1: ${data[0]['status']} in ${data[0]['time']}s
    Trial 2: ${data[1]['status']} in ${data[1]['time']}s
    Trial 3: ${data[2]['status']} in ${data[2]['time']}s
    Trial 4: ${data[3]['status']} in ${data[3]['time']}s
    Trial 5: ${data[4]['status']} in ${data[4]['time']}s
    Trial 6: ${data[5]['status']} in ${data[5]['time']}s
    Trial 7: ${data[6]['status']} in ${data[6]['time']}s
    Trial 8: ${data[7]['status']} in ${data[7]['time']}s
    Trial 9: ${data[8]['status']} in ${data[8]['time']}s
    Trial 10: ${data[9]['status']} in ${data[9]['time']}s
    Trial 11: ${data[10]['status']} in ${data[10]['time']}s
    Trial 12: ${data[11]['status']} in ${data[11]['time']}s
    Trial 13: ${data[12]['status']} in ${data[12]['time']}s
    Trial 14: ${data[13]['status']} in ${data[13]['time']}s
    Trial 15: ${data[14]['status']} in ${data[14]['time']}s
    `;

    fetch("/addgame", {
        "method": "POST",
        "body": JSON.stringify({
            'email': email,
            'age': age,
            'sleep': sleep,
            'time': time,
            'data': data,
        })
    }).then((response) => alert("Thank you for playing! You may now close this page."));
}
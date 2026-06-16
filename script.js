const eyes = document.querySelectorAll(".eye");

function clearStates() {

    eyes.forEach(eye => {

        eye.classList.remove(
            "blink",
            "look-left",
            "look-right",
            "cute"
        );

    });

}

function blink() {

    eyes.forEach(eye => {
        eye.classList.add("blink");
    });

    setTimeout(() => {

        eyes.forEach(eye => {
            eye.classList.remove("blink");
        });

    }, 150);

}

function doubleBlink() {

    blink();

    setTimeout(() => {
        blink();
    }, 250);

}

function lookLeft() {

    clearStates();

    eyes.forEach(eye => {
        eye.classList.add("look-left");
    });

    setTimeout(() => {

        eyes.forEach(eye => {
            eye.classList.remove("look-left");
        });

    }, 1200);

}

function lookRight() {

    clearStates();

    eyes.forEach(eye => {
        eye.classList.add("look-right");
    });

    setTimeout(() => {

        eyes.forEach(eye => {
            eye.classList.remove("look-right");
        });

    }, 1200);

}

function cuteEyes() {

    clearStates();

    eyes.forEach(eye => {
        eye.classList.add("cute");
    });

    setTimeout(() => {

        eyes.forEach(eye => {
            eye.classList.remove("cute");
        });

    }, 2000);

}

function lookAround() {

    if (Math.random() > 0.5) {

        lookLeft();

    } else {

        lookRight();

    }

    setTimeout(() => {

        if (Math.random() > 0.5) {
            blink();
        }

    }, 500);

}

function randomBehavior() {

    const random = Math.random();

    if (random < 0.55) {

        blink();

    } else if (random < 0.65) {

        doubleBlink();

    } else if (random < 0.82) {

        lookLeft();

    } else if (random < 0.95) {

        lookRight();

    } else {

        cuteEyes();

    }

    const nextAction =
        3000 + Math.random() * 5000;

    setTimeout(
        randomBehavior,
        nextAction
    );

}

randomBehavior();

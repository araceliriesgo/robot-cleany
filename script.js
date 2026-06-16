const screensaver =
    document.getElementById("screensaver");

const app =
    document.getElementById("app");

const emailInput =
    document.getElementById("email");

const continueButton =
    document.getElementById("continueButton");

const eyes =
    document.querySelectorAll(".eye");

let inactivityTimer;

/* -------------------------- */
/* EMAIL */
/* -------------------------- */

function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}

emailInput.addEventListener("input", () => {

    const email =
        emailInput.value.trim();

    continueButton.disabled =
        !validateEmail(email);

    resetInactivityTimer();

});

continueButton.addEventListener("click", () => {

    alert(
        "Email ingresado: " +
        emailInput.value
    );

});

/* -------------------------- */
/* TRANSICIONES */
/* -------------------------- */

function showForm() {

    screensaver.classList.add("fade-out");

    setTimeout(() => {

        screensaver.classList.add("hidden");

        app.classList.remove("hidden");
        app.classList.add("fade-in");

        speak("Escribí o dictá tu email para ingresar");

        resetInactivityTimer();

        setTimeout(() => {

            emailInput.focus({ preventScroll: true });

            window.scrollTo(0, 0);

        }, 150);

    }, 500);
}

function showScreensaver() {

    app.classList.add("hidden");

    app.classList.remove("fade-in");

    screensaver.classList.remove(
        "hidden",
        "fade-out"
    );

    emailInput.value = "";

    continueButton.disabled = true;

    clearStates();

    blink();

}

/* -------------------------- */
/* TIMEOUT */
/* -------------------------- */

function resetInactivityTimer() {

    clearTimeout(inactivityTimer);

    inactivityTimer = setTimeout(() => {

        showScreensaver();

    }, 10000);

}

document.addEventListener(
    "pointerdown",
    () => {

        if (
            !screensaver.classList.contains(
                "hidden"
            )
        ) {
            showForm();
        } else {
            resetInactivityTimer();
        }

    }
);

document.addEventListener(
    "keydown",
    resetInactivityTimer
);

/* -------------------------- */
/* OJOS */
/* -------------------------- */

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

        eye.classList.add(
            "look-left"
        );

    });

    setTimeout(() => {

        clearStates();

    }, 1000);

}

function lookRight() {

    clearStates();

    eyes.forEach(eye => {

        eye.classList.add(
            "look-right"
        );

    });

    setTimeout(() => {

        clearStates();

    }, 1000);

}

function cuteEyes() {

    clearStates();

    eyes.forEach(eye => {

        eye.classList.add(
            "cute"
        );

    });

    setTimeout(() => {

        clearStates();

    }, 1500);

}

function randomBehavior() {

    if (
        screensaver.classList.contains(
            "hidden"
        )
    ) {

        setTimeout(
            randomBehavior,
            2000
        );

        return;

    }

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
        1500 + Math.random() * 2000;

    setTimeout(
        randomBehavior,
        nextAction
    );

}

randomBehavior();

function speak(text) {

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "es-AR";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);

}
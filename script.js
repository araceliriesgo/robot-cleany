const screensaver = document.getElementById("screensaver");
const app = document.getElementById("app");
const emailInput = document.getElementById("email");
const continueButton = document.getElementById("continueButton");
const eyes = document.querySelectorAll(".eye");

let inactivityTimer;

/* ========================== */
/* KEYBOARD FIX (iOS PRO) */
/* ========================== */

function setViewportHeight() {
    const vh = window.visualViewport
        ? window.visualViewport.height
        : window.innerHeight;

    document.documentElement.style.setProperty(
        "--vh",
        `${vh * 0.01}px`
    );
}

setViewportHeight();

window.visualViewport?.addEventListener("resize", setViewportHeight);
window.addEventListener("resize", setViewportHeight);

/* ========================== */
/* EMAIL VALIDATION */
/* ========================== */

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();

    continueButton.disabled = !validateEmail(email);

    resetInactivityTimer();
});

/* ========================== */
/* BUTTON */
/* ========================== */

continueButton.addEventListener("click", () => {
    alert("Email ingresado: " + emailInput.value);
});

/* ========================== */
/* TRANSITIONS */
/* ========================== */

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

            // evita salto en iOS
            window.scrollTo(0, 0);
        }, 150);
    }, 500);
}

function showScreensaver() {
    app.classList.add("hidden");
    app.classList.remove("fade-in");

    screensaver.classList.remove("hidden", "fade-out");

    emailInput.value = "";
    continueButton.disabled = true;

    clearStates();
    blink();
}

/* ========================== */
/* INACTIVITY TIMER */
/* ========================== */

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);

    inactivityTimer = setTimeout(() => {
        showScreensaver();
    }, 10000);
}

document.addEventListener("pointerdown", () => {
    if (!screensaver.classList.contains("hidden")) {
        showForm();
    } else {
        resetInactivityTimer();
    }
});

document.addEventListener("keydown", resetInactivityTimer);

/* ========================== */
/* KEYBOARD STATE CLASS (IMPORTANT) */
/* ========================== */

emailInput.addEventListener("focus", () => {
    document.body.classList.add("keyboard-open");
});

emailInput.addEventListener("blur", () => {
    document.body.classList.remove("keyboard-open");
});

/* ========================== */
/* EYES SYSTEM */
/* ========================== */

function clearStates() {
    eyes.forEach(eye => {
        eye.classList.remove("blink", "look-left", "look-right", "cute");
    });
}

function blink() {
    eyes.forEach(eye => eye.classList.add("blink"));

    setTimeout(() => {
        eyes.forEach(eye => eye.classList.remove("blink"));
    }, 150);
}

function doubleBlink() {
    blink();
    setTimeout(blink, 250);
}

function lookLeft() {
    clearStates();
    eyes.forEach(eye => eye.classList.add("look-left"));

    setTimeout(clearStates, 1000);
}

function lookRight() {
    clearStates();
    eyes.forEach(eye => eye.classList.add("look-right"));

    setTimeout(clearStates, 1000);
}

function cuteEyes() {
    clearStates();
    eyes.forEach(eye => eye.classList.add("cute"));

    setTimeout(clearStates, 1500);
}

function randomBehavior() {
    if (screensaver.classList.contains("hidden")) {
        setTimeout(randomBehavior, 2000);
        return;
    }

    const r = Math.random();

    if (r < 0.55) blink();
    else if (r < 0.65) doubleBlink();
    else if (r < 0.82) lookLeft();
    else if (r < 0.95) lookRight();
    else cuteEyes();

    setTimeout(randomBehavior, 1500 + Math.random() * 2000);
}

randomBehavior();

/* ========================== */
/* SPEECH */
/* ========================== */

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "es-AR";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
}
const eyes = document.querySelectorAll(".eye");

function blink() {

    eyes.forEach(eye => {
        eye.classList.add("blink");
    });

    setTimeout(() => {

        eyes.forEach(eye => {
            eye.classList.remove("blink");
        });

    },120);

}

function startBlinking() {

    const delay = 1000 + Math.random() * 4000;

    setTimeout(() => {

        blink();

        // 25% probabilidad de doble parpadeo
        if(Math.random() < 0.25){

            setTimeout(() => {
                blink();
            },250);

        }

        startBlinking();

    },delay);
}

startBlinking();
const eyes =
    document.querySelectorAll(".eye");

function blink(){

    eyes.forEach(eye=>{
        eye.classList.add("blink");
    });

    setTimeout(()=>{
        eyes.forEach(eye=>{
            eye.classList.remove("blink");
        });
    },120);
}

function loop(){

    const delay =
        3000 + Math.random()*4000;

    setTimeout(()=>{

        blink();

        loop();

    },delay);
}

loop();
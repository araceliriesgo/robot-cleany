const eyes = document.querySelectorAll(".eye");

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

function randomBlink(){

    const delay =
        3000 + Math.random()*4000;

    setTimeout(()=>{

        blink();

        if(Math.random() < 0.25){

            setTimeout(()=>{
                blink();
            },250);

        }

        randomBlink();

    },delay);
}

randomBlink();
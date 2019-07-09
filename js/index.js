const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = 100;
const ctx = canvas.getContext('2d');
let i = 1;

function init() {
    ctx.save();
    ctx.translate(150, 50);
    setInterval(draw, 40);
}

function draw() {
    ctx.fillStyle = `hsla(${Math.random() * 350}, 94%, 50%, .5)`;
    ctx.lineWidth = 1;

    if (i < 50) {
        for (let j = 0; j < i * 6; j++) { // draw individual dots
            ctx.rotate(Math.PI * 2 / (i * 6));
            ctx.beginPath();
            ctx.arc(0, i * 34, 32, 0, Math.PI * 2, true);
            ctx.fill();
        }
    };

    i += 1;
}

init();
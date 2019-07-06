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
    ctx.fillStyle = 'rgba(' + (255 - Math.random() * 250) + ',' + (255 - Math.random() * 250) + ',100, 0.7)';

    if (i < 50) {
        for (let j = 0; j < i * 6; j++) { // draw individual dots
            ctx.rotate(Math.PI * 2 / (i * 6));
            ctx.beginPath();
            ctx.arc(0, i * 35, 25, 0, Math.PI * 2, true);
            ctx.fill();
        }
    };

    i += 1;
}

init();
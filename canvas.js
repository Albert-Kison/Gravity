canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const gravity = 1;
const frictionY = 0.9;
const frictionX = 0.5;

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;
    this.color = `rgb(${r}, ${g}, ${b})`;

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'blue';
        
        ctx.fillStyle = this.color;
        ctx.fill();
        // ctx.stroke(); 
    }

    this.update = function() {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * frictionY;
        } else {
            this.dy += gravity;
        }

        if (this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.x + this.radius + this.dx > canvas.width) {
            this.dx = -this.dx;
        }

        this.dx = this.dx * 0.999;

        this.y += this.dy;
        this.x += this.dx;

        this.draw();
    }
}

let circles = []
for (let i = 0; i < 1000; i++) {
    const radius = 50;
    const x = Math.random() * (canvas.width - radius * 2 - 300) + radius + 100;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() -  0.5) * 40;
    const dy = (Math.random() -  0.5) * 10;

    circles.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
        console.log(`${i}: ${Math.round(circles[i].dx)} ${Math.round(circles[i].dy)}`);
    }

    
}

animate();
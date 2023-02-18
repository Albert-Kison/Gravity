canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

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
        

        this.draw();
    }
}

let circles = []
for (let i = 0; i < 15; i++) {
    const radius = 100;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;;
    const dx = (Math.random() -  0.5) * 10;
    const dy = (Math.random() -  0.5) * 10;

    circles.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < circles.length; i++) {
        circles[i].update();
    }

    
}

animate();
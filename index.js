const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
let stars = [];
const numStars = 200;
const speedFactor = 0.05;

canvas.width = width;
canvas.height = height;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';

window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  stars = initializeStars();
});

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function initializeStars() {
  const newStars = [];
  for (let i = 0; i < numStars; i++) {
    newStars.push({
      x: random(0, width),
      y: random(0, height),
      radius: random(1, 3),
      opacity: random(0.5, 1),
      twinkleFactor: random(-0.02, 0.02),
      speedX: random(-speedFactor, speedFactor),
      speedY: random(-speedFactor, speedFactor)
    });
  }
  return newStars;
}

stars = initializeStars();

function drawStar(star) {
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, star.opacity))})`;
  ctx.fill();
  ctx.closePath();
}

function updateStar(star) {
  star.x += star.speedX;
  star.y += star.speedY;

  if (star.x < -star.radius) {
    star.x = width + star.radius;
  } else if (star.x > width + star.radius) {
    star.x = -star.radius;
  }

  if (star.y < -star.radius) {
    star.y = height + star.radius;
  } else if (star.y > height + star.radius) {
    star.y = -star.radius;
  }

  star.opacity += star.twinkleFactor;
  if (star.opacity > 1 || star.opacity < 0.5) {
    star.twinkleFactor *= -1;
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, width, height);
  stars.forEach(star => {
    updateStar(star);
    drawStar(star);
  });
}

animate();
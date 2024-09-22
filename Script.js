
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 600;

let player = {
    x: 50,
    y: 500,
    width: 30,
    height: 30,
    dy: 0,
    gravity: 0.5,
    jumpPower: -10,
    jumping: false
};

let platforms = [];
let score = 0;

function createPlatform() {
    const x = Math.random() * (canvas.width - 60);
    const y = Math.random() * (canvas.height - 100) + 50;
    platforms.push({ x, y, width: 60, height: 10 });
}

function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = 'black';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function update() {
    player.dy += player.gravity;
    player.y += player.dy;

    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.jumping = false;
    }

    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height >= platform.y &&
            player.y + player.height <= platform.y + platform.height
        ) {
            player.dy = player.jumpPower;
            player.jumping = true;
            score++;
        }
    });

    if (player.jumping) {
        player.dy += player.gravity;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlatforms();
    drawPlayer();
    ctx.fillText(`Score: ${score}`, 10, 20);
}

document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && !player.jumping) {
        player.dy = player.jumpPower;
        player.jumping = true;
    }
});

setInterval(createPlatform, 2000);
setInterval(update, 20);

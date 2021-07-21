let ctx = document.getElementById("gc").getContext("2d");
let snake = [
	[250, 250]
];
let apple = [rand(), rand()];
let xv, yv = 10;
let dir = 0;
let moved = false;
let count = 0;

function rand() {
	return Math.floor(Math.random() * (19 - 0 + 1) + 0) * 25;
}

document.addEventListener('keydown', function(e) {
	if (moved == false) {
		if (e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
			if ((dir == "ArrowUp" && e.key != "ArrowDown") || (dir == "ArrowDown" && e.key != "ArrowUp") || (dir == "ArrowLeft" && e.key != "ArrowRight") || (dir == "ArrowRight" && e.key != "ArrowLeft") || dir == 0) {
				dir = e.key;
			}
		}
		moved = true;
	}
});

function move() {
	if (dir == "ArrowUp") {
		snake.unshift([snake[0][0], snake[0][1] - 25]);
	} else if (dir == "ArrowDown") {
		snake.unshift([snake[0][0], snake[0][1] + 25]);
	} else if (dir == "ArrowLeft") {
		snake.unshift([snake[0][0] - 25, snake[0][1]]);
	} else if (dir == "ArrowRight") {
		snake.unshift([snake[0][0] + 25, snake[0][1]]);
	}

	if (dir != 0) {
		snake.pop();
	}
}

function shorten() {
	while (snake.length > 1) {
		snake.pop();
	}
}

function coll() {
	if (snake[0][0] < 0) {
		snake[0][0] = 475;
	} else if (snake[0][1] < 0) {
		snake[0][1] = 475;
	} else if (snake[0][0] > 475) {
		snake[0][0] = 0;
	} else if (snake[0][1] > 475) {
		snake[0][1] = 0;
	}

	if (snake[0][0] == apple[0] && snake[0][1] == apple[1]) {
		apple[0] = rand();
		apple[1] = rand();
		count = 5;
	}

	for (let i = 1; i < snake.length; i++) {
		if (snake[i][0] == apple[0] && snake[i][1] == apple[1]) {
			apple[0] = rand();
			apple[1] = rand();
			break;
		}
	}

	for (let i = 1; i < snake.length; i++) {
		if (snake[i][0] == snake[0][0] && snake[i][1] == snake[0][1]) {
			shorten();
			break;
		}
	}
}

function draw() {
	ctx.clearRect(0, 0, 500, 500);
	ctx.fillStyle = "green";
	for (let i = 0; i < snake.length; i++) {
		ctx.fillRect(snake[i][0], snake[i][1], 25, 25);
	}
	ctx.fillStyle = "red";
	ctx.fillRect(apple[0], apple[1], 25, 25);
}

function game() {
	move();
	coll();
	draw();
	moved = false;
	if (count > 0) {
		snake.push([snake[snake.length - 1][0], snake[snake.length - 1][1]])
		count--;
	}
}

setInterval(game, 1000 / 10);
'use strict';

// Cria o canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

/**
 * bgImage.onload, marioImage, starImage : só vai começar o jogo quando 
 * as imagens forem carregadas.
 */

// Imagem de Fundo
var bgReady = false; // background pronto
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = 'images/background.png';

// Imgaem do Mário
var marioReady = false; // boneco pronto
var marioImage = new Image();
marioImage.onload = function () {
	marioReady = true;
};
marioImage.src = 'images/mario.png';

// Imagem da Estrela
var starReady = false;
var starImage = new Image();
starImage.onload = function () {
	starReady = true;
};
starImage.src = 'images/star.png';

// Objetos do Jogo
var mario = {
	speed: 256 // movimento em pixels por segundo
};
var star = {};
var starCaught = 0;

// Controle do Teclado
var keysDown = {}; // tecla presionada

// Quando a tecla for pressionada
window.addEventListener('keydown', function (e) {
	keysDown[e.keyCode] = true;
}, false);

// Quando a tecla não for mais pressionada
window.addEventListener('keyup', function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reseta o jogo quando o Mário pega a estrela
var reset = function reset() {
	mario.x = canvas.width / 2;
	mario.y = canvas.height / 2;

	// Posiciona a estrela randomicamente na tela
	star.x = 32 + Math.random() * (canvas.width - 64);
	star.y = 32 + Math.random() * (canvas.height - 64);
};

// Atualiza os objetos do jogo
var update = function update(modifier) {
	if (38 in keysDown) {
		mario.y -= mario.speed * modifier; // pressionando a seta para cima
	}

	if (40 in keysDown) {
		mario.y += mario.speed * modifier; // pressionando a seta para baixo
	}

	if (37 in keysDown) {
		mario.x -= mario.speed * modifier; // pressionando a seta para esquerda
	}

	if (39 in keysDown) {
		mario.x += mario.speed * modifier; // pressionando a seta para direita
	}

	// Os personagens se encostaram
	if (mario.x <= star.x + 32 && star.x <= mario.x + 32 && mario.y <= star.y + 32 && star.y <= mario.y + 32) {
		++starCaught;
		reset();
	}
};

// Renderiza tudo
var render = function render() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (marioReady) {
		ctx.drawImage(marioImage, mario.x, mario.y);
	}

	if (starReady) {
		ctx.drawImage(starImage, star.x, star.y);
	}

	// Pontuação
	ctx.fillStyle = 'rgb(250, 250, 250)';
	ctx.font = '24px Helvetica';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.fillText('Estrelas pegas: ' + starCaught, 32, 32);
};

// Controla o loop do jogo
var main = function main() {
	var now = Date.now(); // ex: 32000
	var delta = now - then; // ex: 2000

	update(delta / 1000); // ex: 2 (modifier)
	render();

	then = now; // ex: 32000

	// Executa isso o mais breve possível
	requestAnimationFrame(main);
};

// Suporte cross-browser para requestAnimationFrame
var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Começa o jogo
var then = Date.now(); // ex: 30000
reset();
main();
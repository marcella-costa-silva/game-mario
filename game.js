'use strict';

// Cria o canvas
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

/**
 * bgImage.onload, heroImage, monsterImage : só vai começar o jogo quando 
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
var heroReady = false; // boneco pronto
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = 'images/mario.png';

// Imagem da Estrela
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = 'images/star.png';

// Objetos do Jogo
var hero = {
	speed: 256 // movimento em pixels por segundo
};
var monster = {};
var monsterCaught = 0;

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
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Posiciona a estrela randomicamente na tela
	monster.x = 32 + Math.random() * (canvas.width - 64);
	monster.y = 32 + Math.random() * (canvas.height - 64);
};

// Atualiza os objetos do jogo
var update = function update(modifier) {
	if (38 in keysDown) {
		hero.y -= hero.speed * modifier; // pressionando a seta para cima
	}

	if (40 in keysDown) {
		hero.y += hero.speed * modifier; // pressionando a seta para baixo
	}

	if (37 in keysDown) {
		hero.x -= hero.speed * modifier; // pressionando a seta para esquerda
	}

	if (39 in keysDown) {
		hero.x += hero.speed * modifier; // pressionando a seta para direita
	}

	// Os personagens se encostaram
	if (hero.x <= monster.x + 32 && monster.x <= hero.x + 32 && hero.y <= monster.y + 32 && monster.y <= hero.y + 32) {
		++monsterCaught;
		reset();
	}
};

// Renderiza tudo
var render = function render() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Pontuação
	ctx.fillStyle = 'rgb(250, 250, 250)';
	ctx.font = '24px Helvetica';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.fillText('Estrelas pegas: ' + monsterCaught, 32, 32);
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
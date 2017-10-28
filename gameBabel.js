// Cria o canvas
const canvas = document.createElement('canvas');
const ctx    = canvas.getContext('2d');
canvas.width  = 512;
canvas.height = 480;
document.body.appendChild(canvas);

/*
 * bgImage.onload, marioImage, starImage: só vai começar o jogo quando 
 * as imagens forem carregadas.
 **/

// Imagem de Fundo
let bgReady   = false; // background pronto
const bgImage = new Image();

bgImage.onload = function () {
	bgReady = true;
};

bgImage.src = 'images/background.png';

// Imgaem do Mário
let marioReady   = false; // boneco pronto
const marioImage = new Image();

marioImage.onload = function () {
	marioReady = true;
};

marioImage.src = 'images/mario.png';

// Imagem da Estrela
let starReady   = false;
const starImage = new Image();

starImage.onload = function () {
	starReady = true;
}

starImage.src = 'images/star.png';

// Objetos do Jogo
const mario = {
	speed: 256 // movimento em pixels por segundo
};

const star = {};
let starCaught = 0;

// Controle do Teclado
const keysDown = {};

// Quando a tecla for pressionada
window.addEventListener('keydown', function (e) {
	keysDown[e.keyCode] = true;
}, false);

// Quando a tecla não for mais pressionada
window.addEventListener('keyup', function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reseta o jogo quando o Mário pega a estrela
const reset = function () {
	mario.x = canvas.width / 2;
	mario.y = canvas.height / 2;

	// posiciona a estrela randomicamente na tela
	// 32 tamanho da imagem
	star.x = 32 + (Math.random() * (canvas.width - 64));
	star.y = 32 + (Math.random() * (canvas.height - 64));
};

// Atualiza os objetos do jogo
const update = function (modifier) {
	if (38 in keysDown) { // pressionando a seta para cima
		mario.y -= mario.speed * modifier;
	}

	if (40 in keysDown) { // pressionando a seta para baixo
		mario.y += mario.speed * modifier;
	}

	if (37 in keysDown) { // pressionando a seta para esquerda
		mario.x -= mario.speed * modifier;
	}

	if (39 in keysDown) { // pressionando a seta para direita
		mario.x += mario.speed * modifier;
	}

	// Os personagens se encostaram
	if (
	     mario.x    <= (star.x + 32) && 
	     star.x <= (mario.x + 32)    && 
	     mario.y    <= (star.y + 32) && 
	     star.y <= (mario.y + 32)
	) {
		++starCaught;
		reset();
	}
};

// Renderiza tudo
const render = function () {
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
const main = function () {
	const now = Date.now(); // ex: 32000
	const delta = now - then; // ex: 2000

	update(delta / 1000); // ex: 2 (modifier)
	render();

	then = now; // ex: 32000

	// Executa o mais breve possível
	requestAnimationFrame(main);
};

// Suporte cross-browser para requestAnimationFrame
const w = window;
const requestAnimationFrame = w.requestAnimationFrame || 
                              w.webkitRequestAnimationFrame || 
                              w.msRequestAnimationFrame || 
                              w.mozRequestAnimationFrame;

// Começa o jogo
let then = Date.now(); // ex: 30000
reset();
main();
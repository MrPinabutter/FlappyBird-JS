console.log("Flappy bird");

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


const chao = {
    srcX:0,
    srcY:610,
    largura:224, 
    altura:112,
    x:0,
    y:canvas.height - 112,   // tamanho do canva - altura da imagem 
    desenha(){
        contexto.drawImage(  // Desenha a imagem no canva
            sprites,          // Imagem
            chao.srcX, chao.srcY,
            chao.largura, chao.altura,
            chao.x, chao.y,
            chao.largura, chao.altura,
        )

        contexto.drawImage(
            sprites,          // Imagem
            chao.srcX, chao.srcY,
            chao.largura, chao.altura,
            canvas.width - 224, chao.y,
            chao.largura, chao.altura,
        )
    }
}

const background = {
    srcX:390,
    srcY:0,
    largura:275, 
    altura:204,
    x:0,
    y:canvas.height - 204,   // tamanho do canva - altura da imagem 
    desenha(){
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,          // Imagem
            background.srcX, background.srcY,
            background.largura, background.altura,
            background.x, background.y,
            background.largura, background.altura,
        )

        contexto.drawImage(
            sprites,          // Imagem
            background.srcX, background.srcY,
            background.largura, background.altura,
            background.x+background.largura, background.y,
            background.largura, background.altura,
        )
    }
}

const flappyBird = {
    srcX: 0,
    srcY: 0,
    largura: 33, 
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.2,
    velocidade: 0,
    atualiza() {
        if(flappyBird.y < chao.y - 24){
            flappyBird.velocidade += flappyBird.gravidade 
            flappyBird.y += flappyBird.velocidade   
        }
    },
    desenha(){
        contexto.drawImage(
            sprites,          // Imagem
            flappyBird.srcX, flappyBird.srcY,
            flappyBird.largura, flappyBird.altura,
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura,
        )
    },
}


function loop(){
    background.desenha();
    chao.desenha();
    flappyBird.desenha();
    flappyBird.atualiza();

    requestAnimationFrame(loop);
};

loop();
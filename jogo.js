console.log("Flappy bird"); // Teste

// Importação da imamgem
const sprites = new Image();
sprites.src = './sprites.png';

// Seleção da area do jogo no canva
const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');


// Elementos do jogo
    const chao = {
        srcX:0,
        srcY:610,
        largura:224, 
        altura:112,
        x:0,
        y:canvas.height - 112,   // (tamanho do canva - altura da imagem)
        desenha(){
            contexto.drawImage(  // Desenha a imagem no canva
                sprites,         
                chao.srcX, chao.srcY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura,
            )

            contexto.drawImage(
                sprites,          
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
        y:canvas.height - 204,   // (tamanho do canva - altura da imagem)
        desenha(){
            contexto.fillStyle = '#70c5ce';
            contexto.fillRect(0, 0, canvas.width, canvas.height)

            contexto.drawImage(
                sprites,        
                background.srcX, background.srcY,
                background.largura, background.altura,
                background.x, background.y,
                background.largura, background.altura,
            )

            contexto.drawImage(
                sprites,       
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


        atualiza() {    // Movimentação do passarinho
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
        }
    }

    const mensagemGetReady = {
        srcX: 134,
        srcY: 0,
        largura: 174, 
        altura: 152,
        x: (canvas.width/2) - 174/2,
        y: 50,

        desenha(){
            contexto.drawImage(
                sprites,          // Imagem
                mensagemGetReady.srcX, mensagemGetReady.srcY,
                mensagemGetReady.largura, mensagemGetReady.altura,
                mensagemGetReady.x, mensagemGetReady.y,
                mensagemGetReady.largura, mensagemGetReady.altura,
            )
        }
    }


// Telas
    let telaAtiva = {}
    function mudaTela(novaTela){
        telaAtiva = novaTela;
    };

    const Telas = {
        INICIO: {
            desenha(){
                background.desenha();
                chao.desenha();
                flappyBird.desenha();
                mensagemGetReady.desenha();
            },
            click(){
                mudaTela(Telas.JOGO)
            },
            atualiza(){

            }
        }
    };

    Telas.JOGO = {
        desenha() {
            background.desenha();
            chao.desenha();
            flappyBird.desenha();
        },
        atualiza(){
            flappyBird.atualiza();
        }
    }


// Execução do jogo 
    function loop(){        
        
        telaAtiva.desenha(),
        telaAtiva.atualiza(),

        requestAnimationFrame(loop);
    };

    window.addEventListener('click', () => {
        if(telaAtiva.click()){
            telaAtiva.click();
        };
    });

    mudaTela(Telas.INICIO)
    loop();
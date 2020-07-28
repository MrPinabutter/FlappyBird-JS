console.log("Flappy bird"); // Teste

// Importação de audios
    const som_HIT = new Audio();
    som_HIT.src = './efeitos/hit.wav';

    const som_CAIU = new Audio();
    som_CAIU.src = './efeitos/caiu.wav';

    const som_PONTO = new Audio();
    som_PONTO.src = './efeitos/ponto.wav';
    
    const som_PULO = new Audio();
    som_PULO.src = './efeitos/pulo.wav';

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

    function fazColisaoVertical(obj1, obj2){
        const obj1_Y = obj1.y + obj1.altura;
        const obj2_Y = obj2.y; 

        if (obj1_Y >= obj2_Y){
            return true;
        }else{
            return false;
        }
    }

    function newFlappy(){
        const flappyBird = {
            srcX: 0,
            srcY: 0,
            largura: 33, 
            altura: 24,
            x: 10,
            y: 50,
            gravidade: 0.3,
            velocidade: 0,
            pulo: 8,

            pula(){
                som_PULO.play();
                flappyBird.velocidade = - flappyBird.pulo
            },

            atualiza() {    // Movimentação do passarinho
                if(!fazColisaoVertical(flappyBird, chao)){
                    flappyBird.velocidade += flappyBird.gravidade 
                    flappyBird.y += flappyBird.velocidade   
                }else{
                    som_HIT.play();

                    setTimeout(() => {
                        mudaTela(Telas.INICIO)
                    }, 500)
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

        return flappyBird;
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
    const globais = {}      // Variaveis globais para o jogo
    let telaAtiva = {};
    function mudaTela(novaTela){
        telaAtiva = novaTela;

        if(telaAtiva.inicializa){
            telaAtiva.inicializa();
        }
    };

    const Telas = {
        INICIO: {
            inicializa(){       // Reseta os valores do flappy bird
                globais.flappyBird = newFlappy();
            },
            desenha(){
                background.desenha();
                chao.desenha();
                globais.flappyBird.desenha();
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
            globais.flappyBird.desenha();
        },
        click(){
            globais.flappyBird.pula();
        },
        atualiza(){
            globais.flappyBird.atualiza();
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
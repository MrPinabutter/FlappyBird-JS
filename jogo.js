console.log("Flappy bird"); // Teste

// Frame do jogo
    let frames = 0;

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
    function newChao(){
        const chao = {
            srcX:0,
            srcY:610,
            largura:224, 
            altura:112,
            x:0,
            y:canvas.height - 112,   // (tamanho do canva - altura da imagem)
            atualiza(){
                const moveChao = 1;
                const atualizaEm = chao.largura / 2;
                
                if(chao.x <= -atualizaEm){
                    chao.x = 0
                }
                
                chao.x -= moveChao
            },
            desenha(){
                contexto.drawImage(  // Desenha a imagem no canva
                    sprites,         
                    chao.srcX, chao.srcY,
                    chao.largura, chao.altura,
                    chao.x, chao.y,
                    chao.largura, chao.altura,
                );

                contexto.drawImage(
                    sprites,          
                    chao.srcX, chao.srcY,
                    chao.largura, chao.altura,
                    chao.x + chao.largura, chao.y,
                    chao.largura, chao.altura,
                );
            }
        }

        return chao;
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
            pulo: 5,

            pula(){
                if(globais.isDead == false){
                    som_PULO.play();
                    flappyBird.velocidade = -flappyBird.pulo
                }
            },

            atualiza() {    // Movimentação do passarinho
                if(globais.flappyBird.y < 0){
                    globais.flappyBird.velocidade = 1
                }

                if(!fazColisaoVertical(flappyBird, globais.chao)){  // Colisão Flappy-Cano
                    flappyBird.velocidade += flappyBird.gravidade 
                    flappyBird.y += flappyBird.velocidade   
                }else{
                    som_HIT.play();
                    globais.isDead = true
                    setTimeout(() => {
                        mudaTela(Telas.INICIO)
                    }, 500)
                }
            },
            movimentos: [
                {srcX: 0, srcY: 0},     // Asa pra cima
                {srcX: 0, srcY: 26},    // Asa meio
                {srcX: 0, srcY: 52},    // Asa pra baixo    
                {srcX: 0, srcY: 26}     // Asa meio
            ],
            frameAtual: 0,
            atualizaFrame(){
                const intervaloDeFrames = 7;    // Intervalo de tempo para desacelerar o movimento do flappy bird
                const passouIntervalo = frames % intervaloDeFrames == 0    // Limitando o intervalo

                if ((passouIntervalo && globais.isDead == false) || (passouIntervalo && telaAtiva == Telas.INICIO)) {
                    flappyBird.frameAtual = frames % 4; // O mod de 4 resulta em todos os possiveis do passarinho
                }

            },
            desenha(){
                flappyBird.atualizaFrame();
                const {srcX, srcY} = flappyBird.movimentos[flappyBird.frameAtual]

                contexto.drawImage(
                    sprites,          // Imagem
                    srcX, srcY,
                    flappyBird.largura, flappyBird.altura,
                    flappyBird.x, flappyBird.y,
                    flappyBird.largura, flappyBird.altura,
                )
            }
        }

        return flappyBird;
    }

    function newCanos(){
        const canos = {
            largura: 52, 
            altura: 400,
            chao: {
                srcX: 0,
                srcY: 169
            },
            ceu:{
                srcX: 52,
                srcY: 169
            },
            desenha(){
                canos.pares.forEach((par) => {
                    const espacoCanos = 80;
                    const yRandom = par.y;
    
                    const canoCeuX = par.x;
                    const canoCeuY = yRandom;
                    // Cano céu
                        contexto.drawImage(
                            sprites,         
                            canos.ceu.srcX, canos.ceu.srcY,
                            canos.largura, canos.altura,
                            canoCeuX, canoCeuY,
                            canos.largura, canos.altura,
                        )
                    
                    const canoChaoX = par.x;
                    const canoChaoY = canos.altura + espacoCanos + yRandom;
                    // Cano chão
                        contexto.drawImage(
                            sprites,         
                            canos.chao.srcX, canos.chao.srcY,
                            canos.largura, canos.altura,
                            canoChaoX, canoChaoY,
                            canos.largura, canos.altura,
                        )
                    par.canoCeu = {
                        x: canoCeuX,
                        y: canos.altura + canoCeuY
                    };
                    par.canoChao = {
                        x: canoChaoX,
                        y: canoChaoY
                    }
                })
            },
            colisãoComFlappybird(par){
                cabecaFlappyBird = globais.flappyBird.y;
                peFlappyBird = globais.flappyBird.y + globais.flappyBird.altura;

                if((globais.flappyBird.x + canos.largura / 2 >= par.x ) && (globais.flappyBird.x <= par.x + canos.largura)){
                    if (cabecaFlappyBird <= par.canoCeu.y) {
                        console.log("Bateu no cano de cima");
                        globais.flappyBird.velocidade = 10
                        return true;
                    }
                    if (peFlappyBird >= par.canoChao.y) {
                        globais.flappyBird.velocidade = -10
                        console.log("Bateu no cano de baixo");
                        return true;
                    }
                }
                return false;
            },
            pares: [],
            atualiza(){
                const passouFrames = frames % 100 === 0;
                if(passouFrames){
                    canos.pares.push({
                        x: canvas.width,
                        y: -150 * (Math.random() + 1.2)
                    })
                }

                canos.pares.forEach((par) =>{
                    if (canos.colisãoComFlappybird(par)) {
                        console.log("Voce Perdeu!");
                        console.log("[pontos]", globais.pontos);
                        som_HIT.play()
                        globais.isDead = true
                        setTimeout(() => {
                            mudaTela(Telas.INICIO)
                        }, 500);
                    }

                    par.x -= 2;     // Movimenta os canos
                    
                    if(par.x + globais.canos.largura == globais.flappyBird.x){    // Somando pontos do usuario
                        globais.pontos += 1;
                        if(globais.isDead== false)
                            som_PONTO.play()
                    }

                    if(par.x + canos.largura <= 0){     // Apaga os canos que ja sairam da tela
                        canos.pares.shift();
                    }
                })
            }
        }
        
        return canos;
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
    const globais = {};      // Variaveis globais para o jogo
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
                globais.chao = newChao();
                globais.canos = newCanos();
            },
            desenha(){
                background.desenha();
                globais.flappyBird.desenha();
                mensagemGetReady.desenha();
                globais.chao.desenha();
            },
            click(){
                globais.isDead = false
                globais.pontos = 0;
                mudaTela(Telas.JOGO);
            },
            atualiza(){
                globais.chao.atualiza();
            }
        }
    };
    
    Telas.JOGO = {
        desenha() {
            background.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
        },
        click(){
            globais.flappyBird.pula();
        },
        atualiza(){
            globais.flappyBird.atualiza();
            globais.canos.atualiza();
            globais.chao.atualiza();
        }
    }


// Execução do jogo 
    function loop(){        
        
        telaAtiva.desenha(),
        telaAtiva.atualiza(),

        frames = frames + 1;
        requestAnimationFrame(loop);
    };

    window.addEventListener('keydown', () => {
        if(telaAtiva.click()){
            telaAtiva.click();
        };
    });

    mudaTela(Telas.INICIO)
    loop();
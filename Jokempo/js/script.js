let comecarJogo = true;
const BotoesEscolha = document.querySelectorAll('.escolhas button')
const visor = document.querySelector('.visor')

BotoesEscolha.forEach(botao => {
    botao.addEventListener('click', () => {
        const escolha = Number(botao.value)
        Jogo(escolha)
    })
})

function Jogo(escolhaJogador) {
    if(!comecarJogo) return;
    
    comecarJogo = false
    const escolhaDoBot = Math.floor(Math.random() * 3) + 1; // Gera numero de 1 a 3

    const resultado = validarResultados(escolhaJogador, escolhaDoBot)
    gerarElementos(escolhaJogador, escolhaDoBot, resultado)
}

function validarResultados(escolhaDoBot, escolhaJogador) {
    
    // Condições de vitória, empate e derrota
    const empate = escolhaJogador === escolhaDoBot
    
    const vitoria = escolhaJogador === 1 && escolhaDoBot === 3 ||
    escolhaJogador === 2 && escolhaDoBot === 1 || escolhaJogador === 3 && escolhaDoBot === 2

    const derrota = escolhaDoBot === 1 && escolhaJogador === 3 ||
    escolhaDoBot === 2 && escolhaJogador === 1 || escolhaDoBot === 3 && escolhaJogador === 2

    let resultado;

    if(vitoria) {
        resultado = 'vitoria'
    }
    else if(derrota) {
        resultado = 'derrota'
    }
    else if(empate) {
        resultado = 'empate'
    }

    return resultado;
}

function gerarElementos(escolhaJogador, escolhaDoBot, resultado) {
    const ImagemJogador = document.createElement('img')
    ImagemJogador.classList.add('escolha1')

    const imagemBot = document.createElement('img')
    imagemBot.classList.add('escolha2')

    switch(escolhaJogador) {
        case 1:
            ImagemJogador.setAttribute("src", "../img/pedra.png")
        break;

        case 2:
            ImagemJogador.setAttribute("src", "../img/papel.png")
        break;

        case 3:
            ImagemJogador.setAttribute("src", "../img/tesoura.png")
        break;
    }

    switch(escolhaDoBot) {
        case 1:
            imagemBot.setAttribute("src", "../img/pedra.png")
        break;

        case 2:
            imagemBot.setAttribute("src", "../img/papel.png")
        break;

        case 3:
            imagemBot.setAttribute("src", "../img/tesoura.png")
        break;
    }

    const AnunciamentoVencedor = document.createElement('p')
    AnunciamentoVencedor.classList.add('resultado')

    const Versus = document.createElement('p')
    Versus.classList.add('versus')
    Versus.textContent = "VS"

    const JogarDenovoTxt = document.createElement('p')
    JogarDenovoTxt.classList.add('jogar-novamente')
    JogarDenovoTxt.textContent = "Deseja jogar novamente?"

    const botaoPlayAgain = document.createElement('button')
    botaoPlayAgain.classList.add('botao-jogarDenovo')
    botaoPlayAgain.textContent = '▶'

    if(resultado === 'vitoria'){
        AnunciamentoVencedor.textContent = "Você venceu!"
    }
    else if(resultado === 'derrota'){
        AnunciamentoVencedor.textContent = "Você perdeu!"
    }
    else if(resultado === 'empate') {
        AnunciamentoVencedor.textContent = "Empate!"
    }
    
    ExibirElementos(imagemBot, ImagemJogador, resultado)
}

function ExibirElementos(imagemBot, ImagemJogador, resultado) {
    visor.appendChild(imagemBot)
    visor.appendChild(ImagemJogador)
}
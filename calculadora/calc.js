const display = document.querySelector('.visor p')
const botoes = document.querySelectorAll('button')

let valorAtual = ''
let operador = null
let valorAnterior = ''

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const valor = botao.textContent
        tratarEntrada(valor)
    })
})

function tratarEntrada(valor) {
    if(!isNaN(valor)) {
        adicionarNumero(valor)
    }
    else if(valor === ',') {
        adicionarDecimal()
    }
    else if(valor === 'AC') {
        limpar()
    }
    else if(valor === '←') {
        apagar()
    }
    else if(valor === '=') {
        calcular()
    }
    else {
        escolherOperador(valor)
    }
}

function adicionarNumero(num) {
    valorAtual += num
    atualizarDisplay()
}

function adicionarDecimal() {
    if(valorAtual.includes(',')) {
        return
    }

    if (valorAtual === '') valorAtual = '0'
    valorAtual += ','
    atualizarDisplay()
}

function escolherOperador(op) {
    if(valorAtual === '') return
    if(valorAnterior !== '') {
        calcular()
    }
    
    operador = op
    valorAnterior = valorAtual
    valorAtual = ''
}

function apagar() {
    valorAtual = valorAtual.slice(0, -1)
    atualizarDisplay()
}

function calcular() {
    if(valorAnterior === '' || valorAtual === '') return

    let resultado

    const a = parseFloat(valorAnterior.replace(',', '.'))
    const b = parseFloat(valorAtual.replace(',', '.'))

    switch(operador) {
        case '/': resultado = b === 0 ? "Erro! Divisão por 0!" : a / b; break
        case '*': resultado = a * b; break
        case '-': resultado = a - b; break
        case '+': resultado = a + b; break
    }

    valorAtual = resultado.toString().replace('.', ',')
    operador = null
    valorAnterior = ''
    atualizarDisplay()

    if(resultado === "Erro! Divisão por 0!") valorAtual = ""
}

function limpar() {
    valorAtual = ''
    valorAnterior = ''
    operador = null
    display.textContent = '0'
}

function atualizarDisplay() {
    display.textContent = valorAtual || 0
}
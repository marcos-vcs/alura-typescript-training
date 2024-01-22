import { NegociacaoController } from "./controllers/negociacao-controller.js";

const controller = new NegociacaoController();

/* toda vez que submeter o form vai chamar o método adiciona do controller */
const form = document.querySelector('.form');
if(form){
    form.addEventListener('submit', event => {
        event.preventDefault(); /* evita o refresh da página quando envia o form */
        controller.adiciona();
    })
} else {
    throw Error('Não foi possível inicializar a aplicação.');
}

const botaoImporta = document.querySelector('#botao-importar');
if(botaoImporta){
    botaoImporta.addEventListener('click', () => {
        controller.importaDados();
    })
}else{
    throw Error('seletor botao-importar não foi encontrado.')
}

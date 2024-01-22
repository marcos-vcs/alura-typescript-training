import { NegociacaoController } from "./controllers/negociacao-controller.js";
const controller = new NegociacaoController();
const form = document.querySelector('.form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        controller.adiciona();
    });
}
else {
    throw Error('Não foi possível inicializar a aplicação.');
}
const botaoImporta = document.querySelector('#botao-importar');
if (botaoImporta) {
    botaoImporta.addEventListener('click', () => {
        controller.importaDados();
    });
}
else {
    throw Error('seletor botao-importar não foi encontrado.');
}
//# sourceMappingURL=app.js.map
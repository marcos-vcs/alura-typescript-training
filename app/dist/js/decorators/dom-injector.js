export function domInjector(seletor) {
    return function (target, propertyKey) {
        console.log(`Modificando prototype ${target.constructor.name} 
            e adicionando getter para a propriedade ${propertyKey}`);
        let elemento;
        const getter = function () {
            if (!elemento) {
                console.log(`buscando elemento do DOM com o seletor ${seletor} para injetar em ${propertyKey}`);
                elemento = document.querySelector(seletor);
            }
            return elemento;
        };
        Object.defineProperty(target, propertyKey, {
            get: getter
        });
    };
}
//# sourceMappingURL=dom-injector.js.map
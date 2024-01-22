export function scape(target, propertyKey, descriptor) {
    const metodoOrigial = descriptor.value;
    descriptor.value = function (...args) {
        let retorno = metodoOrigial.apply(this, args);
        if (typeof retorno === 'string') {
            console.log(`@escape em ação na classe ${this.constructor.name} para o método ${propertyKey}`);
            retorno = retorno.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        return retorno;
    };
}
//# sourceMappingURL=scape.js.map
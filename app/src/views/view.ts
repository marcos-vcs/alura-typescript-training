export abstract class View<T> {
  protected elemento: HTMLElement;

  constructor(seletor: string) {
    const elemento = document.querySelector(seletor);
    if(elemento){
      this.elemento = elemento as HTMLElement;
    }else{
      throw Error(`Seletor ${seletor} não existe no DOM`);
    }
  }

  protected abstract template(model: T): string;

  public update(model: T): void {
    let template = this.template(model);
    this.elemento.innerHTML = template;
  }
}

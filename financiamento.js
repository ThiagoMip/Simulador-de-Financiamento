import {Parcela} from './parcela.js';

class Financiamento{
    #taxaJuros; //Juros mensais
    #prazo; //em meses
    #parcelas = [];
    constructor(valor, entrada, taxaJuros, prazo){
        this.#taxaJuros = taxaJuros;
        this.#prazo = prazo;
        //Composição - financiamento possui ou tem parcelas 
        this.#parcelas.push(new Financiamento(0, 0, 0, 0, valor - entrada));
    }
}
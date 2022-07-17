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
    static calcJuros(valor, taxaJuros){
        return valor * (taxaJuros / 100);
    }
    calcParcelasMensais(){
        let saldo = this.#parcelas[this.#parcelas.length - 1].getSaldo();

        let prazo = this.#prazo - (this.#parcelas.length - 1);

        let amortizacao = saldo / prazo;

        for(let i=0; i < prazo; i++){
            const numero = this.#parcelas.length;
            const juros = Financiamento.calcJuros(saldo, this.#taxaJuros);
            const valor = juros + amortizacao;

            saldo -= amortizacao;

            if(saldo < 0){ saldo = 0;}

            this.#parcelas.push(new Parcela(numero, valor, juros, amortizacao, saldo));
        }
    }
    exibeParcelas(){
        const parcelas = this.#parcelas.slice(1);
        
        for(const parcela of parcelas){
            const linha = corpoTabela.isertRow(-1);
            for(const dado of parcela.getDadoFormatados()){
                const celula = linha.insertCell(-1);
                celula.textContent = dado;
            }
        }
    }
}
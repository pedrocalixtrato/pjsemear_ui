import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'sma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lancamentosTotal = [
    { tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: '30/06/2017',
      dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José' },
    { tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: '10/06/2017',
      dataPagamento: '09/06/2017', valor: 80000, pessoa: 'Atacado Brasil' },
    { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: '20/07/2017',
      dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda' },
    { tipo: 'DESPESA', descricao: 'Mensalidade de escola', dataVencimento: '05/06/2017',
      dataPagamento: '30/05/2017', valor: 800, pessoa: 'Escola Abelha Rainha' },
    { tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: '18/08/2017',
      dataPagamento: null, valor: 55000, pessoa: 'Sebastião Souza' },
    { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: '10/07/2017',
      dataPagamento: '09/07/2017', valor: 1750, pessoa: 'Casa Nova Imóveis' },
    { tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: '13/07/2017',
      dataPagamento: null, valor: 180, pessoa: 'Academia Top' }
  ];

  pagina = 0;
  qtdPorPagina = 3;
  lancamentos: any;

  public paginaAtual = 1;

  constructor() {
    this.popularLancamentos();
  }

  paginar($event: any) {
    this.pagina = $event - 1;
    this.popularLancamentos();
  }

  popularLancamentos() {
    this.lancamentos = [];
    for (let i = ( this.pagina * this.qtdPorPagina ); i < (this.pagina * this.qtdPorPagina + this.qtdPorPagina); i++) {
      if (i >= this.lancamentosTotal.length) {
        break;
      }
      this.lancamentos.push(this.lancamentosTotal[i]);
    }
  }
}

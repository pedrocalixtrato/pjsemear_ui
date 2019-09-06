import {RelatorioComponent} from '../base/base-shared/relatorio/relatorio.component';
import {Component, OnInit, ViewChild} from '@angular/core';
import {PactoDataGridConfig} from '../base/base-core/data-grid/data-grid.model';
import {Router} from '@angular/router';

@Component({
  selector: 'sma-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit {

  @ViewChild('tableData', {static: true}) tableData: RelatorioComponent;
  @ViewChild('buttonName', {static: true}) buttonName;
  @ViewChild('logradouroColumnName', {static: true}) logradouroColumnName;
  @ViewChild('codigoColumnName', {static: true} ) codigoColumnName;

  table: PactoDataGridConfig;

  lancamentosTotal = [
    {
      tipo: 'DESPESA', descricao: 'Compra de pão', dataVencimento: '30/06/2017',
      dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José'
    },
    {
      tipo: 'RECEITA', descricao: 'Venda de software', dataVencimento: '10/06/2017',
      dataPagamento: '09/06/2017', valor: 80000, pessoa: 'Atacado Brasil'
    },
    {
      tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: '20/07/2017',
      dataPagamento: null, valor: 14312, pessoa: 'Ministério da Fazenda'
    },
    {
      tipo: 'DESPESA', descricao: 'Mensalidade de escola', dataVencimento: '05/06/2017',
      dataPagamento: '30/05/2017', valor: 800, pessoa: 'Escola Abelha Rainha'
    },
    {
      tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: '18/08/2017',
      dataPagamento: null, valor: 55000, pessoa: 'Sebastião Souza'
    },
    {
      tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: '10/07/2017',
      dataPagamento: '09/07/2017', valor: 1750, pessoa: 'Casa Nova Imóveis'
    },
    {
      tipo: 'DESPESA', descricao: 'Mensalidade musculação', dataVencimento: '13/07/2017',
      dataPagamento: null, valor: 180, pessoa: 'Academia Top'
    }
  ];

  pagina = 0;
  qtdPorPagina = 3;
  lancamentos: any;

  public paginaAtual = 1;

  constructor(
    private router: Router
  ) {
    // this.popularLancamentos();
  }

  ngOnInit() {
    this.configTable();
  }

  paginar($event: any) {
    this.pagina = $event - 1;
    this.popularLancamentos();
  }
  editClickHandler(row: any) {
    debugger
    this.router.navigate(['enderecos', row.id]);
  }

  addClickHandler() {
    this.router.navigateByUrl('/enderecos/novo');
  }

  popularLancamentos() {
    this.lancamentos = [];
    for (let i = (this.pagina * this.qtdPorPagina); i < (this.pagina * this.qtdPorPagina + this.qtdPorPagina); i++) {
      if (i >= this.lancamentosTotal.length) {
        break;
      }
      this.lancamentos.push(this.lancamentosTotal[i]);
    }
  }
  private fetchData() {
    this.tableData.reloadData();
  }

  private configTable() {

    this.table = new PactoDataGridConfig({
      endpoint: 'enderecos',
      quickSearch: true,
      rowClick: true,
      buttons: {
        conteudo: this.buttonName,
        nome: 'add',
        id: 'adicionarAmbiente'
      },
      columns: [
        {
          nome: 'id',
          titulo: this.codigoColumnName,
          buscaRapida: true,
          visible: true,
          defaultVisible: true,
          campo: 'id'
        },
        {
          nome: 'logradouro',
          titulo: this.logradouroColumnName,
          buscaRapida: false,
          visible: true,
          ordenavel: true,
          defaultVisible: true,
          campo: 'logradouro'
        }
      ],
      actions: [
        {
          nome: 'edit',
          iconClass: 'fa fa-pencil',
        },
        {
          nome: 'remove',
          iconClass: 'fa fa-trash-o',
        }
      ]
    });
  }
  actionClickHandler($event: { row: any, iconName: string }) {
    console.log('passou', $event);
  }
}

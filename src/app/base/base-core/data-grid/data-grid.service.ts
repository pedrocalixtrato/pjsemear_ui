import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {RestService} from '../rest/rest.service';
import {BaseCoreModule} from '../base-core.module';
import {ApiResponseList} from '../rest/rest.model';
import {Injectable} from '@angular/core';

export interface DataFiltro {
  quicksearchValue?: filterValue;
  quicksearchFields?: Array<filterValue>;
  filters?: { [key: string]: filterValue | Array<filterValue> };
  configs?: { [key: string]: any };
  page?: number;
  size?: number;
  /**
   * ASC/DESC
   */
  sortDirection?: string;
  sortField?: string;
}

type filterValue = number | string;

@Injectable({
  providedIn: BaseCoreModule
})
export class DataGridService {

  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Assinatura do endpoint GET /endpoint?{PARAMS}
   *
   * PARAMS:
   *
   *    &sort=FIELD,DIRECTION
   *    &page=3
   *    &size=20
   *    filters= {
   *        quicksearchValue: string,
   *        quicksearchFields: string[],
   *        NOME_CAMPO: VALOR_CAMPO,
   *        NOME_CAMPO: [VALOR_1, VALOR_2, ...]
   *    }
   */
  obterDados(endpoint: string, filtros: DataFiltro): Observable<ApiResponseList<any>> {
    const params = this.getParams(filtros);
    const url = 'http://192.99.228.142:8082/enderecos';
    const headers = new HttpHeaders({
           Authorization: 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
     });

    if (1 !== 1) {
      return Observable.create(observer => {
        setTimeout(() => {
          observer.next(this.getFakeLancamentos()['lancamentos-despesa']);
        });
      });
    } else {
      return this.http.get(url, {
        headers
      });
    }

  }

  private prepareParams(filtros) {
    // sort
    if (filtros.sortField && filtros.sortDirection) {
      const direction = filtros.sortDirection.toUpperCase();
      filtros.sort = `${filtros.sortField},${direction}`;
    }
    delete filtros.sortField;
    delete filtros.sortDirection;

  }

  private getParams(filtros): any {
    this.prepareParams(filtros);
    if (filtros.filters) {
      filtros.filters = JSON.stringify(filtros.filters);
    }
    if (filtros.configs) {
      filtros.configs = JSON.stringify(filtros.configs);
    }
    return filtros;
  }

  getFake() {
    return {
      'indicadores-carteira-professores': {
        content: [
          {
            professor: {
              nome: 'Josué Miranda dos Reis',
              id: 567
            },
            comTreino: 34,
            semTreino: 38,
            vencidos: 12,
            proxVencimento: 890,
            avaliacao: 98,
            estrelas2: 1
          },
          {
            comTreino: 589,
            semTreino: 338,
            vencidos: 567,
            proxVencimento: 20,
            avaliacao: 70,
            estrelas2: 231
          }
        ]
      },
      'indicadores-carteira-professores/alunos': {
        content: [
          {
            id: 34,
            matricula: 45675,
            nome: 'Maryane Dos Reis',
            situacao: 'IN',
            terminoContrato: 23423424242,
            terminoProgVigente: 234242424
          }
        ]
      }
    };
  }

  getFakeLancamentos() {
    return {
      'lancamentos-despesa': {
        content: [
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
        ]
      }
    };
  }
}

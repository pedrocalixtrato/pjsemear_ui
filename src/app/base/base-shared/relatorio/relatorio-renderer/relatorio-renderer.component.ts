import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {
  PactoActionConfig,
  PactoDataGridColumnConfig,
  PactoDataGridConfig,
  PactoDataGridOrdenacaoDirecao
} from '../../../base-core/data-grid/data-grid.model';

declare var $;

@Component({
  selector: 'sma-relatorio-renderer',
  templateUrl: './relatorio-renderer.component.html',
  styleUrls: ['./relatorio-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class RelatorioRendererComponent implements OnInit {
  @Input('dataGridConfig') dataGridConfig: PactoDataGridConfig;
  @Input('data') data: Array<any>;
  @Input('loading') loading = false;
  @Input('rawDataIcons') rawDataIcons: Array<Array<PactoActionConfig>>;

  @Output('sort') sort: EventEmitter<{ column: string, direction: string }> = new EventEmitter();
  @Output('cellClick') cellClick: EventEmitter<{ row: any, column: any }> = new EventEmitter();
  @Output('iconClick') iconClick: EventEmitter<{ row: any, iconName: string }> = new EventEmitter();
  @Output('rowClick') rowClick: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  get dados() {
    return this.data;
  }

  get visibleColumns() {
    return this.dataGridConfig.columns.filter(column => {
      if (column.visible != null) {
        return column.visible;
      } else {
        return column.defaultVisible;
      }
    });
  }

  ngOnInit() {
  }

  rowClickHandler(row, $event) {
    const $target = ($event.target);
    const actionClick = $target.closest('.action-cell');
    if (!actionClick && this.dataGridConfig.rowClick) {
      this.rowClick.emit(row);
    }
  }

  getSortIconClass(column: string) {
    const ordenada = this.dataGridConfig.state.ordenacaoColuna === column;
    const asc = this.dataGridConfig.state.ordenacaoDirecao === PactoDataGridOrdenacaoDirecao.ASC;
    const desc = this.dataGridConfig.state.ordenacaoDirecao === PactoDataGridOrdenacaoDirecao.DESC;
    const ordenavel = this.dataGridConfig.columns.find(c => c.nome === column).ordenavel;
    if (ordenada && asc) {
      return 'fa fa-sort-asc';
    } else if (ordenada && desc) {
      return 'fa fa-sort-desc';
    } else if (ordenavel) {
      return 'fa fa-sort';
    }
  }

  iconClickHandler(row: any, icon: PactoActionConfig) {
    this.iconClick.emit({
      row,
      iconName: icon.nome
    });
  }

  isSortable(column: string) {
    return this.dataGridConfig.columns.find(i => i.nome === column).ordenavel;
  }

  sortClick(column: PactoDataGridColumnConfig) {
    if (this.isSortable(column.nome)) {
      this.updateSortState(column);
      this.sort.emit({
        column: this.dataGridConfig.state.ordenacaoColuna,
        direction: this.dataGridConfig.state.ordenacaoDirecao
      });
    }
  }

  columnCellClickHandler(row, column) {
    this.cellClick.emit({row, column});
  }

  private updateSortState(column: PactoDataGridColumnConfig) {
    if (!column.ordenavel) {
      return false;
    }
    if (this.dataGridConfig.state.ordenacaoColuna !== column.nome) {
      this.dataGridConfig.state.ordenacaoColuna = column.nome;
      this.dataGridConfig.state.ordenacaoDirecao = PactoDataGridOrdenacaoDirecao.ASC;
    } else if (this.dataGridConfig.state.ordenacaoDirecao === PactoDataGridOrdenacaoDirecao.ASC) {
      this.dataGridConfig.state.ordenacaoDirecao = PactoDataGridOrdenacaoDirecao.DESC;
    } else {
      this.dataGridConfig.state.ordenacaoDirecao = PactoDataGridOrdenacaoDirecao.ASC;
    }
  }

}

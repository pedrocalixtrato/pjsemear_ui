import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import {DataFiltro, DataGridService} from '../../base-core/data-grid/data-grid.service';
import {GridFilterConfig} from '../../base-core/data-grid/data-grid-filter.model';
import {PactoActionConfig, PactoDataGridConfig} from '../../base-core/data-grid/data-grid.model';
import {DataGridFilterComponent} from '../data-grid/data-grid-filter/data-grid-filter.component';
import {ApiResponseList} from '../../base-core/rest/rest.model';

@Component({
  selector: 'sma-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RelatorioComponent implements OnInit, AfterViewInit {
  @Input('tableTitle') tableTitle: TemplateRef<any>;
  @Input('tableDescription') tableDescription: TemplateRef<any>;
  @Input('baseFilter') baseFilter: DataFiltro = {};
  @Input('filterConfig') filterConfig: GridFilterConfig;
  @Input('table') table: PactoDataGridConfig = new PactoDataGridConfig({
    endpoint: null,
    state: null,
    buttons: null,
    columns: []
  });

  @Output('iconClick') iconClick: EventEmitter<{row: any, iconName: string}> = new EventEmitter();
  @Output('cellClick') cellClick: EventEmitter<{row: any, column: any}> = new EventEmitter();
  @Output('rowClick') rowClick: EventEmitter<any> = new EventEmitter();
  @Output('btnClick') btnClick: EventEmitter<any> = new EventEmitter();
  @Output('filterConfigUpdate') filterConfigUpdate: EventEmitter<any> = new EventEmitter();

  @ViewChild('quickSearch', {static: true}) quickSearch;
  @ViewChild('filterDropdown', {static: true}) filterDropdown: NgbDropdown;
  @ViewChild('dataGridFilter', {static: true}) dataGridFilter: DataGridFilterComponent;
  @ViewChild('filterToggleButton', {static: true}) filterToggleButton: ElementRef;

  ngbPage;
  private dataFetchSubscription: Subscription;
  private temporaryFilters;

  pageSizeControl: FormControl = new FormControl(10);
  quickSearchControl: FormControl = new FormControl();
  dataFetchLoading = false;
  data: ApiResponseList<any> = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    numberOfElements: 0,
    size: 0,
    number: 0
  };
  rawData = [];
  rawDataIcons: Array<Array<PactoActionConfig>> = [];

  @HostListener('document:click', ['$event.target'])
  public clickHandler(targetElement) {
    const filter = this.filterConfig && this.table.showFilters;
    if (filter) {
      const filterBtnClick = this.isDescendant(this.filterToggleButton.nativeElement, targetElement);
      const filterClick = this.isDescendant(this.dataGridFilter.nativeElement, targetElement);
      const calendarClick = this.isCalendarClick(targetElement);
      if (!filterClick && !filterBtnClick && !calendarClick) {
        this.filterDropdown.close();
      }
    }
  }

  constructor(private dataService: DataGridService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initialSetup();
      if (this.dataGridFilter) {
        this.temporaryFilters = this.dataGridFilter.getFilterData();
      }
      this.fetchData();
    });
  }

  reloadData() {
    this.fetchData();
  }
  sortUpdateHandler(sort) {
    this.fetchData();
  }

  pageChangeHandler(page) {
    this.table.state.paginaNumero = page - 1;
    this.fetchData();
  }

  btnCLickHandler() {
    this.btnClick.emit(this.table.buttons.nome);
  }
  filterHandler(filter) {
    this.temporaryFilters = filter;
    this.filterDropdown.close();
    this.fetchData();
  }

  cellClickHandler($event) {
    this.cellClick.emit($event);
  }

  alterfilterConfigUpdate(statusConfid) {
    this.filterConfigUpdate.emit(statusConfid);
  }

  private populateRawDataIcons() {
    this.rawDataIcons = [];
    this.rawData.forEach(rawItem => {
      const actions = [];
      this.table.actions.forEach(action => {
        if (action.showIconFn === null) {
          actions.push(action);
        } else if (action.showIconFn(rawItem)) {
          actions.push(action);
        }
      });

      this.rawDataIcons.push(actions);
    });
  }

  private isDescendant(parent, child) {
    let node = child.parentNode;
    if (parent === child) {
      return true;
    } else {
      while (node !== null) {
        if (node === parent) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    }
  }

  private isCalendarClick(target) {
    let node = target.parentNode;
    while (node !== null) {
      if (node.tagName === 'NGB-DATEPICKER') {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  private initialSetup() {
    // current page
    this.ngbPage = this.table.state.paginaNumero + 1;
    // quick search
    if (this.table.quickSearch) {
      this.quickSearchControl.valueChanges.subscribe(() => {
        this.table.state.paginaNumero = 0;
        this.ngbPage = 1;
        this.fetchData();
      });
    }
    // page size
    this.pageSizeControl.valueChanges.subscribe(pageSize => {
      this.table.state.paginaTamanho = parseInt(pageSize, 10);
      this.table.state.paginaNumero = 0;
      this.ngbPage = 1;
      this.fetchData();
    });
  }

  private fetchData() {
    const filtros = this.fetchFiltros();
    const baseFilter: DataFiltro = JSON.parse(JSON.stringify(this.baseFilter));

    /**
     * Merge 'filters'
     */
    if (baseFilter.filters) {
      Object.assign(filtros.filters, baseFilter.filters);
    }

    this.dataFetchLoading = true;
    this.rawData = [];

    if (this.dataFetchSubscription) {
      this.dataFetchSubscription.unsubscribe();
    }

    this.dataFetchSubscription = this.dataService.obterDados(this.table.endpoint, filtros).subscribe(data => {
      this.dataFetchLoading = false;
      this.data = data;
      this.rawData = data.content;
      this.populateRawDataIcons();
    });
  }

  fetchFiltros(): DataFiltro {
    const filtros: DataFiltro = {
      filters: this.temporaryFilters && this.temporaryFilters.filters ? this.temporaryFilters.filters : {},
      configs: this.temporaryFilters && this.temporaryFilters.configs ? this.temporaryFilters.configs : {},
      sortField: this.table.state.ordenacaoColuna,
      sortDirection: this.table.state.ordenacaoDirecao
    };

    if (this.table.quickSearch) {
      filtros.filters.quicksearchValue = this.quickSearchControl.value;
      filtros.filters.quicksearchFields = this.fetchQuicksearchFields();
    }

    if (this.table.pagination) {
      filtros.page = this.table.state.paginaNumero;
      filtros.size = this.table.state.paginaTamanho;
    }
    this.sanitizeFilter(filtros);
    const copy: DataFiltro = {};
    Object.assign(copy, filtros);
    return copy;
  }

  private sanitizeFilter(filtro: DataFiltro) {
    if (!filtro.sortField) {
      filtro.sortDirection = null;
    }
    this.removeUnsetValues(filtro);
    this.removeUnsetValues(filtro.filters);
  }

  private removeUnsetValues(object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];
        if (element === undefined || element === null || element.length === 0) {
          delete object[key];
        }
      }
    }
  }

  private fetchQuicksearchFields() {
    const result = [];
    this.table.columns.forEach(column => {
      if (column.buscaRapida) {
        result.push(column.nome);
      }
    });
    return result;
  }

}

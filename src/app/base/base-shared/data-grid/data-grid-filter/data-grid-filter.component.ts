import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {GridFilter, GridFilterConfig, GridFilterMany, GridFilterType} from '../../../base-core/data-grid/data-grid-filter.model';
import {PactoDataGridColumnConfig} from '../../../base-core/data-grid/data-grid.model';

declare var moment;


@Component({
  selector: 'sma-data-grid-filter',
  templateUrl: './data-grid-filter.component.html',
  styleUrls: ['./data-grid-filter.component.scss']
})
export class DataGridFilterComponent implements OnInit {
  @Input('config') config: GridFilterConfig;
  @Input('columnsConfig') columnsConfig: PactoDataGridColumnConfig;
  @Output('filter') filter: EventEmitter<any> = new EventEmitter();
  @Output('configUpdate') configUpdate: EventEmitter<any> = new EventEmitter();

  constructor(private element: ElementRef) {
  }

  get nativeElement() {
    return this.element.nativeElement;
  }

  filterCollapseStatus = {};
  filterManyFilterControls: { [name: string]: FormControl } = {};
  filterMonthYearFilterControls: { [name: string]: FormControl } = {};
  /**
   * Contains the currently selectd values of the filters.
   */
  filterSelectionStatus = {};
  filterDateControls: { [name: string]: FormControl } = {};
  alternativeOptionsControl: FormControl = new FormControl(false);
  configOptionsControl: FormGroup = new FormGroup({});
  formGroup: FormGroup = new FormGroup({
    dateSelected: new FormControl(0),
    anoSelected: new FormControl(0)
  });
  mesData = [];
  mesAtual: number;
  anoData = [];
  anoAtual: number;


  ngOnInit() {
    this.getDateCurrent();
    this.initStatusVariable();
    this.setUpDatepickerControls();
    this.setUpDateMonthYear();
    this.setUpFilterManyFilter();
    this.getMesesData();

  }

  changeMonth() {
    this.formGroup.get('dateSelected').setValue(this.formGroup.get('dateSelected').value);
    console.log(this.formGroup.get('dateSelected').value);
  }

  changeYear() {
    this.formGroup.get('anoSelected').setValue(this.formGroup.get('anoSelected').value);
    console.log(this.formGroup.get('anoSelected').value);
  }

  getDateCurrent() {
    this.mesAtual = new Date().getMonth() + 1;
    this.anoAtual = new Date().getFullYear();
    this.formGroup.get('dateSelected').setValue(this.mesAtual);
    this.formGroup.get('anoSelected').setValue(this.anoAtual);
  }

  get GridFilterType() {
    return GridFilterType;
  }

  getFilterOptions(filter) {
    if (filter.alternativeOptions && this.alternativeOptionsControl.value) {
      return filter.alternativeOptions;
    } else {
      return filter.options;
    }
  }

  clearFilter($event: MouseEvent, filter: GridFilter) {
    $event.stopPropagation();
    if (filter.type === GridFilterType.MANY) {
      this.filterSelectionStatus[filter.name] = [];
    } else {
      this.filterDateControls[filter.name].reset();
    }
  }

  clearFilterManyFilter($event: MouseEvent, filter: GridFilter) {
    $event.stopPropagation();
    this.filterManyFilterControls[filter.name].setValue('');
  }

  filterClick(filter: GridFilter) {
    this.filterCollapseStatus[filter.name] = !this.filterCollapseStatus[filter.name];
  }

  filterHasValue(filter: GridFilter) {
    return this.filterSelectionStatus[filter.name].length;
  }

  clickManyOptionHandler(filter: GridFilterMany, value: number) {
    const values: Array<any> = this.filterSelectionStatus[filter.name];
    if (values.includes(value)) {
      const removeIndex = values.findIndex(i => {
        return i === value;
      });
      values.splice(removeIndex, 1);
    } else {
      values.push(value);
    }
  }

  visibleColumnClickHandler(column: PactoDataGridColumnConfig) {
    if (column.visible != null) {
      column.visible = !column.visible;
    } else {
      column.visible = !column.defaultVisible;
    }
  }

  columnIsVisible(column: PactoDataGridColumnConfig) {
    if (column.visible != null) {
      return column.visible;
    } else {
      return column.defaultVisible;
    }
  }

  searchClickHandler() {
    const data = this.emitFilterData();
  }

  getFilterData() {
    const filters = Object.assign({}, this.filterSelectionStatus);
    for (const key in this.filterDateControls) {
      if (this.filterDateControls.hasOwnProperty(key)) {
        const element = this.filterDateControls[key];
        filters[key] = element.value;
      }
    }
    const result: any = {};
    result.filters = filters;
    result.configs = this.configOptionsControl.getRawValue();
    return result;
  }

  alterConfigUpdate(configId) {
    this.config.configs.forEach(config => {
      if (config.id === configId) {
        config.cleanParams.forEach(nameFilter => {
          this.filterSelectionStatus[nameFilter] = [];
        });
      }
    });
    this.configUpdate.emit({clickConfigId: configId, configsValue: this.configOptionsControl.getRawValue()});
  }

  private setUpFilterManyFilter() {
    this.config.filters.forEach(filter => {
      if (filter.type === GridFilterType.MANY) {
        this.filterManyFilterControls[filter.name] = new FormControl('');
      }
    });
  }

  private setUpDateMonthYear() {
    this.config.filters.forEach(filter => {
      if (filter.type === GridFilterType.DATE_MONTH_YEAR) {
        const mes = this.formGroup.get('dateSelected').value;
        const ano = this.formGroup.get('anoSelected').value;
        this.filterSelectionStatus[filter.name] = [];
        const values: Array<any> = this.filterSelectionStatus[filter.name];
        values.push({mes, ano});
      }
    });
  }

  private setUpDatepickerControls() {
    this.config.filters.forEach(filter => {
      if (filter.type === GridFilterType.DATE_POINT) {
        this.filterDateControls[filter.name] = new FormControl(filter.initialValue);
      }
    });
  }

  private initStatusVariable() {
    this.config.filters.forEach(filter => {
      if (filter.type === GridFilterType.DATE_POINT) {
        this.filterSelectionStatus[filter.name] = null;
      } else {
        this.filterSelectionStatus[filter.name] = filter.initialValue ? filter.initialValue : [];
      }
    });
    if (this.config.configs) {
      this.config.configs.forEach(config => {
        this.configOptionsControl.addControl(config.id, new FormControl(config.initialValue ? config.initialValue : false));
      });
    }
  }

  private emitFilterData() {
    this.setUpDateMonthYear();
    const result = this.getFilterData();
    this.filter.emit(result);
  }


  setMesesArray(now) {
    for (let i = 1; i < 7; i++) {
      const mesData = [];
      const newDate = new Date(moment().subtract(i, 'month'));
      const newYear = new Date(moment().subtract(i, 'year'));
      mesData.push({mes: newDate.getMonth() + 1, id: i});
      this.anoData.push({ano: newYear.getUTCFullYear(), id: i});
      this.convertMonth(mesData);
    }
  }

  convertMonth(mesData) {
    mesData.forEach(mes => {
      if (mes.mes === 1) {
        this.mesData.push({id: mes.mes, mes: 'Jan'});
      }
      if (mes.mes === 2) {
        this.mesData.push({id: mes.mes, mes: 'Fev'});
      }
      if (mes.mes === 3) {
        this.mesData.push({id: mes.mes, mes: 'Mar'});
      }
      if (mes.mes === 4) {
        this.mesData.push({id: mes.mes, mes: 'Abr'});
      }
      if (mes.mes === 5) {
        this.mesData.push({id: mes.mes, mes: 'Mai'});
      }
      if (mes.mes === 6) {
        this.mesData.push({id: mes.mes, mes: 'Jun'});
      }
      if (mes.mes === 7) {
        this.mesData.push({id: mes.mes, mes: 'Jul'});
      }
      if (mes.mes === 8) {
        this.mesData.push({id: mes.mes, mes: 'Ago'});
      }
      if (mes.mes === 9) {
        this.mesData.push({id: mes.mes, mes: 'Set'});
      }
      if (mes.mes === 10) {
        this.mesData.push({id: mes.mes, mes: 'Out'});
      }
      if (mes.mes === 11) {
        this.mesData.push({id: mes.mes, mes: 'Nov'});
      }
      if (mes.mes === 12) {
        this.mesData.push({id: mes.mes, mes: 'Dez'});
      }
    });
  }

  getMesesData() {
    this.setMesesArray(new Date());
  }
}

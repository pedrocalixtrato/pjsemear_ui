import { TemplateRef } from '@angular/core';

export enum PactoDataGridOrdenacaoDirecao {
    ASC = 'ASC',
    DESC = 'DESC'
}

export class PactoDataGridState {
    ordenacaoColuna: string;
    ordenacaoDirecao: PactoDataGridOrdenacaoDirecao;
    paginaTamanho: number;
    paginaNumero: number;

    constructor(dados?) {
        dados = dados || {};
        this.ordenacaoColuna = dados.ordenacaoColuna;
        this.ordenacaoDirecao = dados.ordenacaoDirecao || PactoDataGridOrdenacaoDirecao.ASC;
        this.paginaTamanho = dados.paginaTamanho || 10;
        this.paginaNumero = dados.paginaNumero || 0;
    }
}

export interface PactoDataGridConfigDto {
    endpoint?: string;
    quickSearch?: boolean;
    exportButton?: boolean;
    showFilters?: boolean;
    pagination?: boolean;
    rowClick?: boolean;
    totalRow?: boolean;
    actions?: Array<{nome: string, iconClass: string, tooltipText?: string, showIconFn?: (row: any) => boolean}>;
    showSimpleTotalCount?: boolean;
    buttons?: PactoDataGridButtonConfig;
    columns?: Array<PactoDataGridColumnConfigDto>;
    state?: PactoDataGridState;
}


export class PactoDataGridColumnConfig {
    titulo: TemplateRef<any>;
    mostrarTitulo: boolean;
    ordenavel: boolean;
    /**
     * É um atributo da entidade e é
     * filtrado pela busca rápida.
     */
    buscaRapida: boolean;
    cellPointerCursor: boolean;
    campo: string;
    nome: string;
    visible: boolean;
    defaultVisible: boolean;
    celula: TemplateRef<any>;
    classes: Array<string>;

    constructor(dados: PactoDataGridColumnConfigDto) {
        this.nome = dados.nome;
        this.titulo = dados.titulo;
        this.mostrarTitulo = dados.mostrarTitulo === undefined ? true : dados.mostrarTitulo;
        this.buscaRapida = dados.buscaRapida != null ? dados.buscaRapida : false;
        this.cellPointerCursor = dados.cellPointerCursor != null ? dados.cellPointerCursor : false;
        this.ordenavel = dados.ordenavel != null ? dados.ordenavel : true;
        this.defaultVisible = dados.defaultVisible != null ? dados.defaultVisible : false;
        this.campo = dados.campo || dados.nome;
        this.celula = dados.celula;
        this.visible = dados.visible;
        this.classes = dados.classes || [];
    }
}

export class PactoActionConfig {
    nome: string;
    iconClass: string;
    tooltipText?: string;
    showIconFn?: (row: any) => boolean;

    constructor(dados) {
        this.nome = dados.nome;
        this.iconClass = dados.iconClass;
        this.tooltipText = dados.tooltipText;
        this.showIconFn = dados.showIconFn ? dados.showIconFn : null;
    }
}

export class PactoDataGridConfig {
    endpoint: string;
    quickSearch: boolean;
    exportButton: boolean;
    pagination: boolean;
    showFilters: boolean;
    rowClick: boolean;
    totalRow: boolean;
    showSimpleTotalCount: boolean;
    actions: Array<PactoActionConfig> = [];
    columns: Array<PactoDataGridColumnConfig> = [];
    buttons: PactoDataGridButtonConfig;
    state: PactoDataGridState;

    constructor(config: PactoDataGridConfigDto) {
        if (config.columns) {
            config.columns.forEach(column => {
                this.columns.push(new PactoDataGridColumnConfig(column));
            });
        }

        if (config.actions) {
            config.actions.forEach(action => {
                this.actions.push(new PactoActionConfig(action));
            });
        }

        this.quickSearch = config.quickSearch != null ? config.quickSearch : false;
        this.showFilters = config.showFilters != null ? config.showFilters : true;
        this.exportButton = config.exportButton != null ? config.exportButton : false;
        this.showSimpleTotalCount = config.showSimpleTotalCount != null ? config.showSimpleTotalCount : false;
        this.rowClick = config.rowClick != null ? config.rowClick : true;
        this.pagination = config.pagination != null ? config.pagination : true;
        this.totalRow = config.totalRow != null ? config.totalRow : false;
        this.buttons = config.buttons;
        this.endpoint = config.endpoint;
        this.state = new PactoDataGridState(config.state);
    }
}

export class PactoDataGridButtonConfig {
    conteudo: TemplateRef<any>;
    nome: string;
    id?: string;
}

interface PactoDataGridColumnConfigDto {
    nome: string;
    titulo: TemplateRef<any>;
    mostrarTitulo?: boolean;
    ordenavel?: boolean;
    buscaRapida?: boolean;
    cellPointerCursor?: boolean;
    visible?: boolean;
    defaultVisible?: boolean;
    campo?: string;
    classes?: Array<string>;
    celula?: TemplateRef<any>;
}

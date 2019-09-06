import { TemplateRef } from '@angular/core';

export interface GridFilterConfig {
    filters?: Array<GridFilterMany | GridFilter>;
    configs?: Array<GridConfig>;
}

/**
 * FILTERS
 */
export enum GridFilterType {
    MANY,
    DATE_POINT,
    DATE_MONTH_YEAR
}
export interface GridFilter {
    name: string;
    type?: GridFilterType;
    label?: TemplateRef<any>;
    initialValue?: Array<number> | number | Array<string>;
}

/**
 * FILTER MANY
 */
export interface GridFilterMany extends GridFilter {
    options: Array<GridFilterManyOption>;
    alternativeOptions: Array<GridFilterManyOption>;
    /**
     * A template that expects a variable 'name'
     * and uses it to translate into the proper language.
     * The key passed in as 'name' will be the
     * 'value' of the option.
     */
    translator?: TemplateRef<any>;
    alternativeOptionsLabel?: TemplateRef<any>;
}
export interface GridConfig {
    id: any;
    label: TemplateRef<any>;
    initialValue?: boolean;
    cleanParams?: Array<string>;
}
export interface GridFilterManyOption {
    value: any;
    label: any;
}


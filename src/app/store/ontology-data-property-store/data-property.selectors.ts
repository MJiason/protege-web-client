import {createFeatureSelector, createSelector} from '@ngrx/store';
import {OntologyDataPropertyState} from './data-property.reducer';

export const selectOntologyDataPropertyState =
    createFeatureSelector<OntologyDataPropertyState>('dataProperty');

export const selectAllDataProperties = createSelector(
    selectOntologyDataPropertyState,
    (state) => state.dataProperties
);

export const selectDataPropertyLoading = createSelector(
    selectOntologyDataPropertyState,
    (state) => state.loading
);

export const selectDataPropertyError = createSelector(
    selectOntologyDataPropertyState,
    (state) => state.error
);

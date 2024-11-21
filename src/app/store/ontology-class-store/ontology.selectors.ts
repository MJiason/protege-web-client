import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OntologyState } from './ontology.reducer';

export const selectOntologyState = createFeatureSelector<OntologyState>('ontology');

export const selectOntologyClasses = createSelector(
    selectOntologyState,
    (state) => state.ontologyClasses
);

export const selectOntologyLoading = createSelector(
    selectOntologyState,
    (state) => state.loading
);

export const selectOntologyError = createSelector(
    selectOntologyState,
    (state) => state.error
);

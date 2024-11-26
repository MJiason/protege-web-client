import {createFeatureSelector, createSelector} from "@ngrx/store";
import {OntologyIndividualState} from "./ontology-individual.reducer";

export const selectOntologyIndividualState = createFeatureSelector<OntologyIndividualState>(
    'ontologyIndividual'
);

export const selectAllOntologyIndividuals = createSelector(
    selectOntologyIndividualState,
    (state) => state.individuals
);

export const selectLoading = createSelector(
    selectOntologyIndividualState,
    (state) => state.loading
);

export const selectError = createSelector(
    selectOntologyIndividualState,
    (state) => state.error
);

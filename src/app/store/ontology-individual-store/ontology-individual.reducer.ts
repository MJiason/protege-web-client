import {OntologyIndividualAPI} from "../../models/owl/OwlApiModels";
import {createReducer, on} from "@ngrx/store";
import {
    addOntologyIndividualSuccess,
    loadOntologyIndividuals,
    loadOntologyIndividualsFailure,
    loadOntologyIndividualsSuccess, removeOntologyIndividualSuccess, updateOntologyIndividualSuccess
} from "./ontology-individual.actions";

export interface OntologyIndividualState {
    individuals: OntologyIndividualAPI[];
    loading: boolean;
    error: string | null;
}

export const initialState: OntologyIndividualState = {
    individuals: [],
    loading: false,
    error: null,
};

export const ontologyIndividualReducer = createReducer(
    initialState,
    // Load individuals
    on(loadOntologyIndividuals, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(loadOntologyIndividualsSuccess, (state, { individuals }) => ({
        ...state,
        individuals,
        loading: false,
    })),
    on(loadOntologyIndividualsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),
    // Add an individual
    on(addOntologyIndividualSuccess, (state, { individual }) => ({
        ...state,
        individuals: [...state.individuals, individual],
    })),
    // Update an individual
    on(updateOntologyIndividualSuccess, (state, { individual }) => ({
        ...state,
        individuals: state.individuals.map((i) =>
            i.uniqueName === individual.uniqueName ? individual : i
        ),
    })),
    // Remove an individual
    on(removeOntologyIndividualSuccess, (state, { uniqueName }) => ({
        ...state,
        individuals: state.individuals.filter((i) => i.uniqueName !== uniqueName),
    }))
);

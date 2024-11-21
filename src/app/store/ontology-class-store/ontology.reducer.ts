import {createReducer, on} from '@ngrx/store';
import {
    loadOntologyClasses,
    loadOntologyClassesSuccess,
    loadOntologyClassesFailure,
    updateOntologyClass, updateOntologyClassSuccess, updateOntologyClassFailure
} from './ontology.actions';
import {OntologyClassAPI} from "../../models/owl/OwlApiModels";


export interface OntologyState {
    ontologyClasses: OntologyClassAPI[];
    loading: boolean;
    error: string | null;
}

export const initialOntologyState: OntologyState = {
    ontologyClasses: [],
    loading: false,
    error: null,
};

export const ontologyReducer = createReducer(
    initialOntologyState,
    on(loadOntologyClasses, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(loadOntologyClassesSuccess, (state, {ontologyClasses}) => ({
        ...state,
        loading: false,
        ontologyClasses,
    })),
    on(loadOntologyClassesFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error,
    })),

    // Handle Update
    on(updateOntologyClass, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(updateOntologyClassSuccess, (state, {updatedClass}) => ({
        ...state,
        loading: false,
        ontologyClasses: state.ontologyClasses.map((ontologyClass) =>
            ontologyClass.uniqueName === updatedClass.uniqueName ? updatedClass : ontologyClass
        ),
    })),
    on(updateOntologyClassFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error,
    }))
);


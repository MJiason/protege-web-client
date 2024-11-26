import {createReducer, on} from '@ngrx/store';
import {
    loadOntologyClasses,
    loadOntologyClassesSuccess,
    loadOntologyClassesFailure,
    updateOntologyClass,
    updateOntologyClassSuccess,
    updateOntologyClassFailure,
    removeOntologyClass,
    removeOntologyClassSuccess, removeOntologyClassFailure
} from './class.actions';
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

export const classReducer = createReducer(
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
        ontologyClasses: state.ontologyClasses.concat(updatedClass),
    })),
    on(updateOntologyClassFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error,
    })),

    // Handle Remove
    on(removeOntologyClass, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(removeOntologyClassSuccess, (state, { uniqueName }) => ({
        ...state,
        loading: false,
        ontologyClasses: state.ontologyClasses.filter(
            (ontologyClass) => ontologyClass.uniqueName !== uniqueName
        ),
    })),
    on(removeOntologyClassFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);


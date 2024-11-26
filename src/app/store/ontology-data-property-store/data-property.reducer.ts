import {
    addOntologyDataProperty,
    addOntologyDataPropertyFailure,
    addOntologyDataPropertySuccess,
    loadOntologyDataProperties,
    loadOntologyDataPropertiesFailure,
    loadOntologyDataPropertiesSuccess,
    removeOntologyDataProperty,
    removeOntologyDataPropertyFailure,
    removeOntologyDataPropertySuccess
} from "./data-property.actions";
import {createReducer, on} from "@ngrx/store";
import {OntologyDataPropertyAPI} from "../../models/owl/OwlApiModels";

export interface OntologyDataPropertyState {
    dataProperties: OntologyDataPropertyAPI[];
    loading: boolean;
    error: string | null;
}

export const initialState: OntologyDataPropertyState = {
    dataProperties: [],
    loading: false,
    error: null,
};

export const dataPropertyReducer = createReducer(
    initialState,

    // Load Ontology Data Properties
    on(loadOntologyDataProperties, (state) => ({
        ...state,
        loading: true,
        error: null,
    })),
    on(loadOntologyDataPropertiesSuccess, (state, {dataProperties}) => ({
        ...state,
        loading: false,
        dataProperties,
    })),
    on(loadOntologyDataPropertiesFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error,
    })),

    // Add Data Property
    on(addOntologyDataProperty, (state) => ({
        ...state,
        loading: true,
    })),
    on(addOntologyDataPropertySuccess, (state, {dataProperty}) => ({
        ...state,
        loading: false,
        dataProperties: [...state.dataProperties, dataProperty],
    })),
    on(addOntologyDataPropertyFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error,
    })),

    // Remove Data Property
    on(removeOntologyDataProperty, (state) => ({
        ...state,
        loading: true,
    })),
    on(removeOntologyDataPropertySuccess, (state, {uniqueName}) => ({
        ...state,
        loading: false,
        dataProperties: state.dataProperties.filter(
            (dataProperty) => dataProperty.uniqueName !== uniqueName
        ),
    })),
    on(removeOntologyDataPropertyFailure, (state, {error}) => ({
        ...state,
        loading: false,
        error,
    }))
);

// Load Ontology Data Properties
import {createAction, props} from "@ngrx/store";
import {OntologyDataPropertyAPI} from "../../models/owl/OwlApiModels";

export const loadOntologyDataProperties = createAction('[Ontology Data Property] Load');
export const loadOntologyDataPropertiesSuccess = createAction(
    '[Ontology Data Property] Load Success',
    props<{ dataProperties: OntologyDataPropertyAPI[] }>()
);
export const loadOntologyDataPropertiesFailure = createAction(
    '[Ontology Data Property] Load Failure',
    props<{ error: any }>()
);

// Add a Data Property
export const addOntologyDataProperty = createAction(
    '[Ontology Data Property] Add',
    props<{ dataProperty: OntologyDataPropertyAPI }>()
);
export const addOntologyDataPropertySuccess = createAction(
    '[Ontology Data Property] Add Success',
    props<{ dataProperty: OntologyDataPropertyAPI }>()
);
export const addOntologyDataPropertyFailure = createAction(
    '[Ontology Data Property] Add Failure',
    props<{ error: any }>()
);

// Remove a Data Property
export const removeOntologyDataProperty = createAction(
    '[Ontology Data Property] Remove',
    props<{ uniqueName: string }>()
);
export const removeOntologyDataPropertySuccess = createAction(
    '[Ontology Data Property] Remove Success',
    props<{ uniqueName: string }>()
);
export const removeOntologyDataPropertyFailure = createAction(
    '[Ontology Data Property] Remove Failure',
    props<{ error: any }>()
);

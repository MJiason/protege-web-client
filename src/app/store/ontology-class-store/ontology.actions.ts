import { createAction, props } from '@ngrx/store';
import {OntologyClassAPI} from "../../models/owl/OwlApiModels";


export const loadOntologyClasses = createAction('[Ontology] Load Ontology Classes');
export const loadOntologyClassesSuccess = createAction(
    '[Ontology] Load Ontology Classes Success',
    props<{ ontologyClasses: OntologyClassAPI[] }>()
);
export const loadOntologyClassesFailure = createAction(
    '[Ontology] Load Ontology Classes Failure',
    props<{ error: any }>()
);

export const updateOntologyClass = createAction(
    '[Ontology] Update Ontology Class',
    props<{ updatedClass: OntologyClassAPI }>()
);

export const updateOntologyClassSuccess = createAction(
    '[Ontology] Update Ontology Class Success',
    props<{ updatedClass: OntologyClassAPI }>()
);

export const updateOntologyClassFailure = createAction(
    '[Ontology] Update Ontology Class Failure',
    props<{ error: any }>()
);

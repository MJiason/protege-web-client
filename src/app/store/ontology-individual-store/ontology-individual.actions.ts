// Load individuals
import {createAction, props} from "@ngrx/store";
import {OntologyIndividualAPI} from "../../models/owl/OwlApiModels";

export const loadOntologyIndividuals = createAction(
    '[Ontology Individual] Load Individuals'
);

export const loadOntologyIndividualsSuccess = createAction(
    '[Ontology Individual] Load Individuals Success',
    props<{ individuals: OntologyIndividualAPI[] }>()
);

export const loadOntologyIndividualsFailure = createAction(
    '[Ontology Individual] Load Individuals Failure',
    props<{ error: string }>()
);

// Add an individual
export const addOntologyIndividual = createAction(
    '[Ontology Individual] Add Individual',
    props<{ individual: OntologyIndividualAPI }>()
);

export const addOntologyIndividualSuccess = createAction(
    '[Ontology Individual] Add Individual Success',
    props<{ individual: OntologyIndividualAPI }>()
);

export const addOntologyIndividualFailure = createAction(
    '[Ontology Individual] Add Individual Failure',
    props<{ error: string }>()
);

// Update an individual
export const updateOntologyIndividual = createAction(
    '[Ontology Individual] Update Individual',
    props<{ individual: OntologyIndividualAPI }>()
);

export const updateOntologyIndividualSuccess = createAction(
    '[Ontology Individual] Update Individual Success',
    props<{ individual: OntologyIndividualAPI }>()
);

export const updateOntologyIndividualFailure = createAction(
    '[Ontology Individual] Update Individual Failure',
    props<{ error: string }>()
);

// Remove an individual
export const removeOntologyIndividual = createAction(
    '[Ontology Individual] Remove Individual',
    props<{ uniqueName: string }>()
);

export const removeOntologyIndividualSuccess = createAction(
    '[Ontology Individual] Remove Individual Success',
    props<{ uniqueName: string }>()
);

export const removeOntologyIndividualFailure = createAction(
    '[Ontology Individual] Remove Individual Failure',
    props<{ error: string }>()
);

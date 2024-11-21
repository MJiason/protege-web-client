export interface OntologyAnnotationAPI {
    property: string;
    value: string;
    language: string;
}

export interface OntologyClassAPI {
    uniqueName: string;
    label: string;
    comment: string;
    annotations: OntologyAnnotationAPI[]
}

export interface OntologyDataPropertyAPI {
    uniqueName: string;
    domain: OntologyClassAPI[];
    range: string;
    label: string;
    comment: string;
}

export interface OntologyIndividualAPI {
    uniqueName: string;
    classAPI: OntologyClassAPI;
    label: string;
    comment: string;
    dataProperties: OntologyDataPropertyAPI[];
    objectProperties: OntologyObjectPropertyAPI[];
}

export interface OntologyObjectPropertyAPI {
    uniqueName: string;
    domain: OntologyClassAPI[];
    range: OntologyClassAPI[];
    label: string;
    comment: string;
    propertyType: PropertyType;
    annotations: OntologyAnnotationAPI[]
}


export enum PropertyType {
    FunctionalProperty,            // A property that links each instance of a class to a single instance of another class
    InverseFunctionalProperty,     // A property where each value is associated with at most one subject
    TransitiveProperty,            // A property that is transitive (e.g., if A is related to B and B to C, then A is related to C)
    SymmetricProperty,             // A property that is symmetric (e.g., if A is related to B, then B is related to A)
    AsymmetricProperty,            // A property that is asymmetric (e.g., if A is related to B, then B is not related to A)
    ReflexiveProperty,             // A property where every individual is related to itself
    IrreflexiveProperty
}


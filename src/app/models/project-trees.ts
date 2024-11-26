
import {OntologyClassAPI, OntologyDataPropertyAPI, OntologyIndividualAPI} from "./owl/OwlApiModels";

export interface TreeNode {
    entity: OntologyClassAPI | OntologyDataPropertyAPI | OntologyIndividualAPI;
    children?: TreeNode[];
}








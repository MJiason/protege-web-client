import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {
    selectAllOntologyIndividuals,
    selectError,
    selectLoading
} from "../../../../../store/ontology-individual-store/ontology-individual.selectors";
import {Observable} from "rxjs";
import { OntologyDataPropertyAPI, OntologyIndividualAPI} from "../../../../../models/owl/OwlApiModels";
import {
    addOntologyIndividual,
    loadOntologyIndividuals,
    removeOntologyIndividual
} from "../../../../../store/ontology-individual-store/ontology-individual.actions";
import {FormMode} from "../classes/classes.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {selectOntologyClasses} from "../../../../../store/ontology-class-store/class.selectors";
import {map} from "rxjs/operators";
import {TreeNode} from "../../../../../models/project-trees";

@Component({
    selector: 'app-individuals',
    templateUrl: './individuals.component.html',
    styleUrls: ['./individuals.component.less']
})
export class IndividualsComponent implements OnInit {

    public formMode: FormMode = FormMode.CREATE;

    public individualPropertyForm: FormGroup;


    loading$: Observable<boolean>;
    error$: Observable<string | null>
    individuals$: Observable<OntologyIndividualAPI[]>;
    public ontologyClasses$: Observable<string[]>;
    private selectedProperty!: OntologyDataPropertyAPI;

    constructor(
        private store: Store,
        private fb: FormBuilder
    ) {
        this.ontologyClasses$ = this.store.select(selectOntologyClasses).pipe(
            map((classes) => classes.map((ontologyClass) => ontologyClass.uniqueName))
        );
        this.individuals$ = this.store.select(selectAllOntologyIndividuals);
        this.loading$ = this.store.select(selectLoading);
        this.error$ = this.store.select(selectError);

        this.individualPropertyForm = this.fb.group({
            uniqueName: ["", Validators.required],
            label: [""],
            comment: [""],
            className: [""],
        });
    }

    ngOnInit(): void {
        this.store.dispatch(loadOntologyIndividuals());
    }

    public onNodeSelected(node: TreeNode) {
        this.formMode = FormMode.UPDATE;
        this.selectedProperty = node.entity as OntologyDataPropertyAPI;
        this.individualPropertyForm.setValue(node.entity);
    }

    public removeSelectedClass() {
        if (this.selectedProperty) {
            this.store.dispatch(removeOntologyIndividual({uniqueName: this.selectedProperty.uniqueName}));
        }
    }
    public addNewDataProperty() {
        this.formMode = FormMode.CREATE;
        this.individualPropertyForm.reset();
    }

    public onFormSubmit() {
        if (this.formMode == FormMode.CREATE) {
            this.store.dispatch(addOntologyIndividual({individual: this.individualPropertyForm.getRawValue()}));
        } else {
            this.removeSelectedClass();
            this.store.dispatch(addOntologyIndividual({individual: this.individualPropertyForm.getRawValue()}));
        }
        this.individualPropertyForm.reset();
    }

    protected readonly FormMode = FormMode;


}

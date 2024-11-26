import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {OntologyClassAPI, OntologyDataPropertyAPI} from "../../../../../models/owl/OwlApiModels";
import {Store} from "@ngrx/store";
import {
    selectAllDataProperties,
    selectDataPropertyError,
    selectDataPropertyLoading
} from "../../../../../store/ontology-data-property-store/data-property.selectors";
import {
    addOntologyDataProperty,
    loadOntologyDataProperties,
    removeOntologyDataProperty
} from "../../../../../store/ontology-data-property-store/data-property.actions";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormMode} from "../classes/classes.component";
import {selectOntologyClasses} from "../../../../../store/ontology-class-store/class.selectors";
import {TreeNode} from "../../../../../models/project-trees";
import {dataPropertiesRanges} from "../../../../../models/projects";

@Component({
    selector: 'app-properties',
    templateUrl: './properties.component.html',
    styleUrls: ['./properties.component.less']
})
export class PropertiesComponent implements OnInit {

    public formMode: FormMode = FormMode.CREATE;

    public dataPropertyForm: FormGroup;
    private selectedProperty!: OntologyDataPropertyAPI;

    public loading$: Observable<boolean>;
    public error$: Observable<string | null>;
    public dataProperties$: Observable<OntologyDataPropertyAPI[]>;
    public ontologyClasses$: Observable<OntologyClassAPI[]>;


    constructor(
        private store: Store,
        private fb: FormBuilder
    ) {

        this.error$ = this.store.select(selectDataPropertyError);
        this.loading$ = this.store.select(selectDataPropertyLoading);
        this.dataProperties$ = this.store.select(selectAllDataProperties);
        this.ontologyClasses$ = this.store.select(selectOntologyClasses);


        this.dataPropertyForm = this.fb.group({
            uniqueName: ["", Validators.required],
            label: [""],
            comment: [""],
            range: [""],
            domain: [[], Validators.required],
        });
    }

    ngOnInit(): void {
        this.dataProperties$ = this.store.select(selectAllDataProperties);
        this.loading$ = this.store.select(selectDataPropertyLoading);
        this.error$ = this.store.select(selectDataPropertyError);

        this.store.dispatch(loadOntologyDataProperties());
    }


    public onNodeSelected(node: TreeNode) {
        this.formMode = FormMode.UPDATE;
        this.selectedProperty = node.entity as OntologyDataPropertyAPI;
        this.dataPropertyForm.setValue(node.entity);
    }

    public removeSelectedClass() {
        if (this.selectedProperty) {
            this.store.dispatch(removeOntologyDataProperty({uniqueName: this.selectedProperty.uniqueName}));
        }
    }

    public addNewDataProperty() {
        this.formMode = FormMode.CREATE;
        this.dataPropertyForm.reset();
    }

    onFormSubmit() {
        console.log(this.dataPropertyForm);
        if (this.formMode == FormMode.CREATE) {
            this.store.dispatch(addOntologyDataProperty({dataProperty: this.dataPropertyForm.getRawValue()}));
        } else {
            this.removeSelectedClass();
            this.store.dispatch(addOntologyDataProperty({dataProperty: this.dataPropertyForm.getRawValue()}));
        }
        this.dataPropertyForm.reset();
    }

    protected readonly FormMode = FormMode;
    protected readonly dataPropertiesRanges = dataPropertiesRanges;
}

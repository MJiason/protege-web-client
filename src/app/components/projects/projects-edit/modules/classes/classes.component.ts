import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
    selectOntologyClasses,
    selectOntologyError,
    selectOntologyLoading
} from "../../../../../store/ontology-class-store/class.selectors";
import {Observable} from "rxjs";
import {OntologyClassAPI} from "../../../../../models/owl/OwlApiModels";
import {Store} from "@ngrx/store";
import {
    loadOntologyClasses,
    removeOntologyClass,
    updateOntologyClass
} from "../../../../../store/ontology-class-store/class.actions";
import {TreeNode} from "../../../../../models/project-trees";


@Component({
    selector: 'classes',
    templateUrl: './classes.component.html',
    styleUrls: ['./classes.component.less']
})
export class ClassesComponent implements OnInit {

    public classForm: FormGroup;
    public formMode: FormMode = FormMode.CREATE;

    public loading$: Observable<boolean>;
    public error$: Observable<string | null>;
    public ontologyClasses$: Observable<OntologyClassAPI[]>;
    public selectedClass!: OntologyClassAPI;

    constructor(
        private fb: FormBuilder,
        private store: Store
    ) {
        this.classForm = this.fb.group({
            uniqueName: [null, Validators.required],
            label: [null],
            comment: [null]
        });

        this.ontologyClasses$ = this.store.select(selectOntologyClasses);
        this.loading$ = this.store.select(selectOntologyLoading);
        this.error$ = this.store.select(selectOntologyError);
    }

    public ngOnInit(): void {
        this.store.dispatch(loadOntologyClasses());
    }

    public onNodeSelected(node: TreeNode) {
        this.formMode = FormMode.UPDATE;
        this.selectedClass = node.entity as OntologyClassAPI;
        this.classForm.setValue(node.entity);
    }

    public removeSelectedClass() {
        if (this.selectedClass) {
            this.store.dispatch(removeOntologyClass({uniqueName: this.selectedClass.uniqueName}));
        }
    }

    public addNewClass() {
        this.formMode = FormMode.CREATE;
        this.classForm.reset();
    }

    public onFormSubmit() {
        if (this.formMode == FormMode.CREATE) {
            this.store.dispatch(updateOntologyClass({updatedClass: this.classForm.getRawValue()}));
        } else {
            this.store.dispatch(removeOntologyClass({uniqueName: this.selectedClass.uniqueName}));
            this.store.dispatch(updateOntologyClass({updatedClass: this.classForm.getRawValue()}));
        }
    }

    protected readonly FormMode = FormMode;
}

export enum FormMode {
    CREATE,
    UPDATE
}

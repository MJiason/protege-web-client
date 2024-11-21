import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
    selectOntologyClasses,
    selectOntologyError,
    selectOntologyLoading
} from "../../../store/ontology-class-store/ontology.selectors";
import {Observable} from "rxjs";
import {OntologyClassAPI} from "../../../models/owl/OwlApiModels";
import {Store} from "@ngrx/store";
import {loadOntologyClasses, updateOntologyClass} from "../../../store/ontology-class-store/ontology.actions";
import {TreeNode} from "../../../models/project-trees";



@Component({
    selector: 'classes',
    templateUrl: './classes.component.html',
    styleUrls: ['./classes.component.less']
})
export class ClassesComponent implements OnInit {

    classForm: FormGroup;

    loading$: Observable<boolean>;
    error$: Observable<string | null>;
    ontologyClasses$: Observable<OntologyClassAPI[]>;
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
        this.selectedClass = node.entity;
        this.classForm.setValue(node.entity);
    }

    public onFormSubmit() {
        if (this.selectedClass) {
            this.store.dispatch(updateOntologyClass({ updatedClass: this.classForm.getRawValue() }))
        }
    }

}

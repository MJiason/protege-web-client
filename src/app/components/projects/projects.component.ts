import {Component, TemplateRef} from '@angular/core';
import {PopupComponent} from "../ui/popup/popup.component";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectData, projectDataArray} from "../../models/projects";

import {addProject} from "../../store/project-store/project.actions";
import {Store} from "@ngrx/store";
import {InoutService} from "../../services/inout.service";
import {loadOntologyClasses} from "../../store/ontology-class-store/class.actions";


@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.less']
})
export class ProjectsComponent {
    projectForm: FormGroup;

    constructor(public dialog: MatDialog,
                private fb: FormBuilder,
                private store: Store,
                private inoutService: InoutService
    ) {
        this.projectForm = this.fb.group({
            name: new FormControl<string | null>("", {
                validators: [Validators.required]
            }),
            description: new FormControl<string | null>(""),
            file: new FormControl<File | undefined>(undefined)
        });
    }

    public openDialog(template: TemplateRef<PopupComponent>): void {
        this.dialog.open(template);
    }

    public onCreateForm(): void {
        let newProject = <ProjectData>{
            id: (projectDataArray.length + 1).toString(),
            name: this.projectForm.getRawValue().name,
            createdWhen: Date.now(),
            file: this.projectForm.getRawValue().file
        }
        if (newProject.file) {
            this.inoutService.uploadOntology(newProject.file).subscribe(res => console.log(res));
        }
        this.store.dispatch(addProject({project: newProject}));
        this.store.dispatch(loadOntologyClasses());
    }

    public onFileInput() {
        if (!this.projectForm.getRawValue().name) {
            this.projectForm.setValue(<ProjectData>{
                ...this.projectForm.getRawValue(),
                name: <File> this.projectForm.getRawValue().file.name,
            });
        }
    }
}

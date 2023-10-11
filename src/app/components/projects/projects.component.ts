import {Component, TemplateRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {PopupComponent} from "../ui/popup/popup.component";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.less']
})
export class ProjectsComponent {
    projectForm: FormGroup;
    constructor(public dialog: MatDialog,
                private fb: FormBuilder) {
        this.projectForm = this.fb.group({
            name: [null, Validators.required],
            language: [null, Validators.required],
            description: [null, Validators.required]
        });
    }

    public openDialog(template: TemplateRef<PopupComponent>): void {
        this.dialog.open(template);
    }

    public onCreateForm(): void {
        console.log(this.projectForm.getRawValue());
    }

}

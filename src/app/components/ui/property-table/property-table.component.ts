import {Component, ViewChild} from '@angular/core';
import {MatTable} from "@angular/material/table";
import {Annotation} from "../../../models/projects";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.less']
})
export class PropertyTableComponent {
    @ViewChild(MatTable) table!: MatTable<Annotation>;

    annotationForm: FormGroup;
    displayedColumns: string[] = ['property', 'type', 'lang', "delete"];
    dataSource:Annotation[] = [];

    constructor(private fb: FormBuilder) {
        this.annotationForm = this.fb.group({
            property: [null, Validators.required],
            type: [null, Validators.required],
            lang: [null, Validators.required]
        });
    }
    languages = [
        'English',
        'Spanish',
        'French',
        'German',
        // Add more languages as needed
    ];

    types = [
        'Data',
        'Number',
        'Text',
    ];

    onAddAnnotation() {
        this.dataSource.push(<Annotation> {
            property: this.annotationForm.getRawValue().property,
            value: this.annotationForm.getRawValue().type,
            lang: this.annotationForm.getRawValue().lang,
        });
        this.table.renderRows();
    }

    removeItem(item: any): void {
        // Implement your remove logic here, for example, by filtering the data source.
        this.dataSource = this.dataSource.filter((data) => data !== item);
        this.table.renderRows();
    }
}

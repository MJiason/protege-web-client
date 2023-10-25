import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTable} from "@angular/material/table";
import {Annotation} from "../../../models/projects";





const ELEMENT_DATA: Annotation[] = [


];

@Component({
    selector: 'editable-table',
    templateUrl: './editable-table.component.html',
    styleUrls: ['./editable-table.component.less']
})
export class EditableTableComponent {
    @ViewChild(MatTable) table!: MatTable<Annotation>;

    annotationForm: FormGroup;
    displayedColumns: string[] = ['property', 'value', 'lang', "delete"];
    dataSource:Annotation[] = [];

    constructor(private fb: FormBuilder) {
        this.annotationForm = this.fb.group({
            property: [null, Validators.required],
            value: [null, Validators.required],
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

    onAddAnnotation() {
        this.dataSource.push(<Annotation> {
            property: this.annotationForm.getRawValue().property,
            value: this.annotationForm.getRawValue().value,
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

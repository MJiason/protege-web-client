import {Component, ElementRef, forwardRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, startWith} from "rxjs/operators";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Observable} from "rxjs";
import {OntologyClassAPI} from "../../../models/owl/OwlApiModels";





@Component({
    selector: 'app-chips',
    templateUrl: './chips.component.html',
    styleUrls: ['./chips.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ChipsComponent),
            multi: true,
        },
    ],
})
export class ChipsComponent implements OnInit, ControlValueAccessor {


    @Input() public dataSelector!: Observable<OntologyClassAPI[]>
    private onChange: (value: string[]) => void = () => {};
    public onTouched: () => void = () => {};


    separatorKeysCodes: number[] = [ENTER, COMMA];
    formControl = new FormControl(null);
    filteredEntities: Observable<OntologyClassAPI[]>;
    selectedEntities: OntologyClassAPI[] = [];
    allEntities: OntologyClassAPI[] = [];


    @ViewChild('entityInput') entityInput!: ElementRef<HTMLInputElement>;

    announcer = inject(LiveAnnouncer);

    constructor() {
        this.filteredEntities = this.formControl.valueChanges.pipe(
            startWith(null),
            map((entity: string | null) =>  this._filter(entity)),
        );
    }

    public ngOnInit(): void {
        this.dataSelector.subscribe(data => {
            this.allEntities = data;
            this.formControl.setValue(null);
        });
    }


    public remove(entity: OntologyClassAPI): void {
        const index = this.selectedEntities.indexOf(entity);

        if (index >= 0) {
            this.selectedEntities.splice(index, 1);
            this.onChange(this.selectedEntities.map(elem => elem.uniqueName));
            this.formControl.setValue(null);

            this.announcer.announce(`Removed ${entity}`);
        }
    }

    public selected(event: MatAutocompleteSelectedEvent): void {
        this.selectedEntities.push(event.option.value);
        this.entityInput.nativeElement.value = '';
        this.formControl.setValue(null);
        this.onChange(this.selectedEntities.map(elem => elem.uniqueName));
    }

    private _filter(value: string | null): OntologyClassAPI[] {
        if (typeof value === 'string') {
            const filterValue = value.toLowerCase();
            return this.allEntities.filter(entity => entity.uniqueName.toLowerCase().includes(filterValue) &&
            !this.selectedEntities.includes(entity));
        }
        return this.allEntities.filter(entity => !this.selectedEntities.includes(entity))
    }

    // Register the callback for value changes
    registerOnChange(fn: (value: string[]) => void): void {
        this.onChange = fn;
    }

    // Register the callback for the touched event
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    writeValue(newValue: string[]): void {
        this.selectedEntities = newValue && newValue.length
            ? this.allEntities.filter(entity=> newValue.includes(entity.uniqueName))
            :[];
        this.formControl.setValue(null);
    }


}

import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
    addOntologyDataProperty,
    addOntologyDataPropertyFailure,
    addOntologyDataPropertySuccess,
    loadOntologyDataProperties,
    loadOntologyDataPropertiesFailure,
    loadOntologyDataPropertiesSuccess,
    removeOntologyDataProperty,
    removeOntologyDataPropertyFailure,
    removeOntologyDataPropertySuccess
} from "./data-property.actions";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {DataPropertyService} from "../../services/data-property.service";

@Injectable()
export class DataPropertyEffects {
    loadOntologyDataProperties$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadOntologyDataProperties),
            mergeMap(() =>
                this.ontologyService.getAll().pipe(
                    map((dataProperties) => loadOntologyDataPropertiesSuccess({dataProperties})),
                    catchError((error) => of(loadOntologyDataPropertiesFailure({error})))
                )
            )
        )
    );

    addOntologyDataProperty$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addOntologyDataProperty),
            mergeMap(({dataProperty}) =>
                this.ontologyService.add(dataProperty).pipe(
                    map((newDataProperty) => addOntologyDataPropertySuccess({dataProperty: newDataProperty})),
                    catchError((error) => of(addOntologyDataPropertyFailure({error})))
                )
            )
        )
    );

    removeOntologyDataProperty$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeOntologyDataProperty),
            mergeMap(({uniqueName}) =>
                this.ontologyService.delete(uniqueName).pipe(
                    map(() => removeOntologyDataPropertySuccess({uniqueName})),
                    catchError((error) => of(removeOntologyDataPropertyFailure({error})))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private ontologyService: DataPropertyService
    ) {
    }
}

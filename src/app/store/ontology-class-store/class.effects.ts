import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import {
    loadOntologyClasses,
    loadOntologyClassesSuccess,
    loadOntologyClassesFailure,
    updateOntologyClass,
    updateOntologyClassSuccess,
    updateOntologyClassFailure,
    removeOntologyClassFailure, removeOntologyClassSuccess, removeOntologyClass,
} from './class.actions';
import {ClassService} from "../../services/class.service";

@Injectable()
export class ClassEffects {
    loadOntologyClasses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadOntologyClasses),
            mergeMap(() =>
                this.ontologyService.getOntologyClasses().pipe(
                    map((ontologyClasses) => loadOntologyClassesSuccess({ ontologyClasses })),
                    catchError((error) => of(loadOntologyClassesFailure({ error })))
                )
            )
        )
    );

    updateOntologyClass$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateOntologyClass),
            mergeMap(({ updatedClass }) =>
                this.ontologyService.updateOntologyClass(updatedClass).pipe(
                    map((response) => updateOntologyClassSuccess({ updatedClass: response })),
                    catchError((error) => of(updateOntologyClassFailure({ error })))
                )
            )
        )
    );

    removeOntologyClass$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeOntologyClass),
            mergeMap(({ uniqueName }) =>
                this.ontologyService.deleteOntologyClass(uniqueName).pipe(
                    map(() => removeOntologyClassSuccess({ uniqueName })),
                    catchError((error) => of(removeOntologyClassFailure({ error })))
                )
            )
        )
    );

    constructor(private actions$: Actions, private ontologyService: ClassService) {}
}

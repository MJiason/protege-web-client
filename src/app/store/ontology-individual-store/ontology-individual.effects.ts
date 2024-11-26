import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap} from "rxjs/operators";
import {
    addOntologyIndividual,
    addOntologyIndividualFailure,
    addOntologyIndividualSuccess,
    loadOntologyIndividuals,
    loadOntologyIndividualsFailure,
    loadOntologyIndividualsSuccess,
    removeOntologyIndividual,
    removeOntologyIndividualFailure,
    removeOntologyIndividualSuccess,
    updateOntologyIndividual,
    updateOntologyIndividualFailure,
    updateOntologyIndividualSuccess
} from "./ontology-individual.actions";
import {of} from "rxjs";
import {IndividualService} from "../../services/individual.service";

@Injectable()
export class OntologyIndividualEffects {
    constructor(private actions$: Actions, private ontologyService: IndividualService) {}

    loadIndividuals$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadOntologyIndividuals),
            mergeMap(() =>
                this.ontologyService.getIndividuals().pipe(
                    map((individuals) =>
                        loadOntologyIndividualsSuccess({ individuals })
                    ),
                    catchError((error) =>
                        of(loadOntologyIndividualsFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    addIndividual$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addOntologyIndividual),
            mergeMap((action) =>
                this.ontologyService.addIndividual(action.individual).pipe(
                    map((individual) =>
                        addOntologyIndividualSuccess({ individual })
                    ),
                    catchError((error) =>
                        of(addOntologyIndividualFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    updateIndividual$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateOntologyIndividual),
            mergeMap((action) =>
                this.ontologyService.updateIndividual(action.individual).pipe(
                    map((updatedIndividual) =>
                        updateOntologyIndividualSuccess({ individual: updatedIndividual })
                    ),
                    catchError((error) =>
                        of(updateOntologyIndividualFailure({ error: error.message }))
                    )
                )
            )
        )
    );

    deleteIndividual$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeOntologyIndividual),
            mergeMap((action) =>
                this.ontologyService.deleteIndividual(action.uniqueName).pipe(
                    map(() =>
                        removeOntologyIndividualSuccess({ uniqueName: action.uniqueName })
                    ),
                    catchError((error) =>
                        of(removeOntologyIndividualFailure({ error: error.message }))
                    )
                )
            )
        )
    );
}

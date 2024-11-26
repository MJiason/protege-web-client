import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OntologyIndividualAPI} from "../models/owl/OwlApiModels";

@Injectable({
  providedIn: 'root'
})
export class IndividualService {

    private apiUrl = 'http://localhost:8080/api/ontology/individuals';

    constructor(private http: HttpClient) {}

    getIndividuals(): Observable<OntologyIndividualAPI[]> {
        return this.http.get<OntologyIndividualAPI[]>(`${this.apiUrl}`);
    }

    addIndividual(individual: OntologyIndividualAPI): Observable<OntologyIndividualAPI> {
        return this.http.post<OntologyIndividualAPI>(`${this.apiUrl}`, individual);
    }

    updateIndividual(individual: OntologyIndividualAPI): Observable<OntologyIndividualAPI> {
        return this.http.put<OntologyIndividualAPI>(`${this.apiUrl}/${individual.uniqueName}`, individual);
    }

    deleteIndividual(uniqueName: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${uniqueName}`);
    }
}

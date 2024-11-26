import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OntologyClassAPI} from "../models/owl/OwlApiModels";

@Injectable({
    providedIn: 'root'
})
export class ClassService {

    private apiUrl = 'http://localhost:8080/api/ontology/classes'; // Replace with your backend URL


    constructor(private http: HttpClient) {
    }

    getOntologyClasses(): Observable<OntologyClassAPI[]> {
        return this.http.get<OntologyClassAPI[]>(this.apiUrl);
    }

    updateOntologyClass(updatedClass: OntologyClassAPI): Observable<OntologyClassAPI> {
        return this.http.post<OntologyClassAPI>(`${this.apiUrl}`, updatedClass);
    }

    deleteOntologyClass(uniqueName: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${uniqueName}`);
    }
}

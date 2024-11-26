import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OntologyDataPropertyAPI} from "../models/owl/OwlApiModels";

@Injectable({
  providedIn: 'root'
})
export class DataPropertyService {
    private apiUrl = 'http://localhost:8080/api/ontology/data-properties';

    constructor(private http: HttpClient) {}

    getAll(): Observable<OntologyDataPropertyAPI[]> {
        return this.http.get<OntologyDataPropertyAPI[]>(this.apiUrl);
    }

    add(dataProperty: OntologyDataPropertyAPI): Observable<OntologyDataPropertyAPI> {
        return this.http.post<OntologyDataPropertyAPI>(this.apiUrl, dataProperty);
    }

    delete(uniqueName: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${uniqueName}`);
    }
}

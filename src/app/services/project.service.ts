import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ClassShort} from "../models/projects";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    private API_URL: string = 'http://localhost:8080/api/ontology';

    constructor(private httpClient: HttpClient) {
    }

    public getClasses(): Observable<ClassShort[]> {
        return this.httpClient.get<ClassShort[]>(this.API_URL);
    }
}

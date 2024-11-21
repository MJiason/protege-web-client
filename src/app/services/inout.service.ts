import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class InoutService {

    private API_URL = "http://localhost:8080/api/ontology/file/upload";

    constructor(private httpClient: HttpClient) {
    }

    public uploadOntology (ontology: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', ontology);
        return this.httpClient.post(this.API_URL, formData);
    }
}

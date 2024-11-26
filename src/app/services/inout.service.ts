import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class InoutService {

    private API_URL_UPLOAD = "http://localhost:8080/api/ontology/file/upload";
    private API_URL_DOWNLOAD = "http://localhost:8080/api/ontology/file/download";

    constructor(private httpClient: HttpClient) {
    }

    public uploadOntology(ontology: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', ontology);
        return this.httpClient.post(this.API_URL_UPLOAD, formData);
    }

    public downloadOntology() : Observable<Blob> {
        return this.httpClient.get(this.API_URL_DOWNLOAD, {
            responseType: 'blob',
        });
    }
}

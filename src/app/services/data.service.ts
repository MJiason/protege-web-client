import {Injectable} from '@angular/core';
import {projectDataArray} from "../models/projects";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    public project1;
    constructor() {
        this.project1 = projectDataArray;
    }
}

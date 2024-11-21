import { createAction, props } from '@ngrx/store';
import {ProjectData} from "../../models/projects";


export const addProject = createAction(
    '[Project] Add Project',
    props<{ project: ProjectData }>()
);

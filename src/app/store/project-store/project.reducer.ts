import { createReducer, on } from '@ngrx/store';
import { addProject } from './project.actions';
import {ProjectData} from "../../models/projects";


export interface ProjectState {
    projects: ProjectData[];
}

export const initialState: ProjectState = {
    projects: [],
};

export const projectReducer = createReducer(
    initialState,
    on(addProject, (state, { project }) => ({
        ...state,
        projects: [...state.projects, project],
    }))
);

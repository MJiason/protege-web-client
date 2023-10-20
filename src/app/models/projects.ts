import {firstTree, TreeNode} from "./project-trees";

export interface ProjectData {
    id: string;
    name: string;
    createdWhen: string;
    classesTree: TreeNode[] | undefined;
}

export interface Class {
    id: string;
    name: string;
    relations: Annotation[];
    annotations: Annotation[];
}

export interface Annotation {
    property: string;
    value: string;
    lang: string;
}

export const projectDataArray: ProjectData[] = [
    {
        id: '1',
        name: 'Project 1',
        createdWhen: '2023-10-19T08:00:00',
        classesTree: firstTree
    }];

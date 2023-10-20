import {Class, ProjectData} from "./projects";

export interface TreeNode {
    entity: Class | undefined;
    children?: TreeNode[];
}


export const firstClass: Class = <Class>{
    id: "1",
    name: "Thing",
    annotations: [],
    relations: []
}

export const firstClass1: Class = <Class>{
    id: "2",
    name: "Subject",
    annotations: [],
    relations: []
}

export const node: TreeNode =
    <TreeNode>{
        entity: firstClass1,
        children: []
    };

export const firstTree: TreeNode[] = [
    <TreeNode>{
        entity: firstClass,
        children: []
    }];


export const secondTree: TreeNode[] = [
    <TreeNode>{
        entity: firstClass,
        children: [node]
    }];








export interface ProjectData {
    id: string;
    name: string;
    createdWhen: number;
    file: File | undefined;
}

export interface Class {
    id: string;
    name: string;
}

export interface ClassShort {
    className: string;
    parentName: string;
    comment:string;
}

export interface Annotation {
    property: string;
    value: string;
    lang: string;
}

export const projectDataArray: ProjectData[] = [];

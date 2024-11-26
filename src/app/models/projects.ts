

export interface ProjectData {
    id: string;
    name: string;
    createdWhen: number;
    file: File | undefined;
}


export interface ClassShort {
    className: string;
    parentName: string;
    comment:string;
}


export const dataPropertiesRanges = [
    "", "boolean", "number", "string", "another"
]



export const projectDataArray: ProjectData[] = [];

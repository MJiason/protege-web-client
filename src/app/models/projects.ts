export interface ProjectData {
    id: string;
    name: string;
    createdWhen: string;
    lastModified: string;
}

export const projectDataArray: ProjectData[] = [
    {
        id: '1',
        name: 'Project 1',
        createdWhen: '2023-10-04T08:00:00',
        lastModified: '2023-10-04T08:30:00',
    },
    {
        id: '2',
        name: 'Project 2',
        createdWhen: '2023-10-04T09:15:00',
        lastModified: '2023-10-04T09:45:00',
    },
    {
        id: '3',
        name: 'Project 3',
        createdWhen: '2023-10-04T10:30:00',
        lastModified: '2023-10-04T11:00:00',
    },
    {
        id: '4',
        name: 'Project 4',
        createdWhen: '2023-10-04T12:45:00',
        lastModified: '2023-10-04T13:15:00',
    },
    {
        id: '5',
        name: 'Project 5',
        createdWhen: '2023-10-04T14:30:00',
        lastModified: '2023-10-04T15:00:00',
    },
];

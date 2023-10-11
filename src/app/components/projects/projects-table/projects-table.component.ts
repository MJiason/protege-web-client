import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProjectData, projectDataArray} from "../../../models/projects";

@Component({
    selector: 'projects-table',
    templateUrl: './projects-table.component.html',
    styleUrls: ['./projects-table.component.less']
})
export class ProjectsTableComponent {
    displayedColumns: string[] = ['id', 'name', 'createdWhen', 'lastModified'];
    dataSource: MatTableDataSource<ProjectData>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor() {

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(projectDataArray);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}

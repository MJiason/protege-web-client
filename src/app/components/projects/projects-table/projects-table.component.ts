import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProjectData, projectDataArray} from "../../../models/projects";
import {Router} from "@angular/router";

@Component({
    selector: 'projects-table',
    templateUrl: './projects-table.component.html',
    styleUrls: ['./projects-table.component.less']
})
export class ProjectsTableComponent implements AfterViewInit{
    displayedColumns: string[] = ['id', 'name', 'createdWhen', 'download'];
    dataSource: MatTableDataSource<ProjectData>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private router: Router) {

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(projectDataArray);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public navigateToProject(projectId: string) {
        this.router.navigate(['/project', projectId]).then(
            // todo add logic
        );
    }

    download(event: any) {
        event.preventDefault();
        event.stopPropagation();
        const link = document.createElement('a');
        link.href = 'assets/ontology.owl';
        link.download = 'ontology.owl';
        link.click();
    }


}

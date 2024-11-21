import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ProjectData, projectDataArray} from "../../../models/projects";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {selectAllProjects} from "../../../store/project-store/project.selectors";

@Component({
    selector: 'projects-table',
    templateUrl: './projects-table.component.html',
    styleUrls: ['./projects-table.component.less']
})
export class ProjectsTableComponent implements AfterViewInit {
    displayedColumns: string[] = ['id', 'name', 'createdWhen'];
    dataSource: MatTableDataSource<ProjectData>;
    projects$: Observable<ProjectData[]>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    constructor(
        private router: Router,
        private store: Store
    ) {

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(projectDataArray);
        this.projects$ = this.store.select(selectAllProjects);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.projects$.subscribe(projects => {
            this.dataSource.data = projects;
        })
    }

    public navigateToProject(projectId: string) {
        this.router.navigate(['/project', projectId]).then(
            // todo add logic
        );
    }


}

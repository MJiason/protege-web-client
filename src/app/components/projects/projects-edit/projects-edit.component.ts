import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProjectData} from "../../../models/projects";
import {selectAllProjects} from "../../../store/project-store/project.selectors";
import {Store} from "@ngrx/store";


@Component({
    selector: 'projects-edit',
    templateUrl: './projects-edit.component.html',
    styleUrls: ['./projects-edit.component.less']
})
export class ProjectsEditComponent implements OnInit {

    selectedProject!: ProjectData | undefined;

    constructor(
        private cdr: ChangeDetectorRef,
        private store: Store,
    ) {
    }

    ngOnInit(): void {
        this.store.select(selectAllProjects).subscribe(
            projects => this.selectedProject = projects[0]
        );
    }


    changeTab() {
        this.cdr.detectChanges();
        this.cdr.markForCheck();
    }
}

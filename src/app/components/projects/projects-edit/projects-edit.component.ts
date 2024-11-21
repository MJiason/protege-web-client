import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../../services/data.service";
import {ProjectData} from "../../../models/projects";


@Component({
    selector: 'projects-edit',
    templateUrl: './projects-edit.component.html',
    styleUrls: ['./projects-edit.component.less']
})
export class ProjectsEditComponent implements OnInit {
    projectId!: string | null;
    selectedProject!: ProjectData | undefined;

    constructor(
        private route: ActivatedRoute,
        private data: DataService,
    ) {
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.projectId = params.get('id');
            this.selectedProject = this.data.project1.find(p => p.id === this.projectId);
        });
    }


}

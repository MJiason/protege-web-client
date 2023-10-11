import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.less']
})
export class ProjectsEditComponent implements OnInit{
    projectId!: string | null;
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.projectId = params.get('id');
            // Fetch and display details for the item with this ID
        });
    }
}

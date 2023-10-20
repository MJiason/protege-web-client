import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../services/data.service";
import {Class, ProjectData} from "../../../models/projects";
import {secondTree, TreeNode} from "../../../models/project-trees";
import {MatDialog} from "@angular/material/dialog";
import {PopupComponent} from "../../ui/popup/popup.component";
interface Food {
    value: string;
    viewValue: string;
}
@Component({
  selector: 'projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.less']
})
export class ProjectsEditComponent implements OnInit{
    projectId!: string | null;
    selectedProject!: ProjectData | undefined;
    newClassForm!: FormGroup;
    parentVal: any;
    @ViewChild('createClassPopup') newClass!: TemplateRef<PopupComponent>;

    constructor(
        private route: ActivatedRoute,
        private data: DataService,
        public dialog: MatDialog,
        private fb: FormBuilder
    ) {
        this.newClassForm = this.fb.group({
            name: [null, Validators.required],
            language: [null, Validators.required],
        });
    }


    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.projectId = params.get('id');
            this.selectedProject = this.data.project1.find(p=> p.id === this.projectId);
            console.log(this.selectedProject)
            // Fetch and display details for the item with this ID
        });
    }


    parents = ["Thing", "Subject"];
    onNodeSelected(event: TreeNode) {
        if (event.entity?.name.toLowerCase() === "subject") {
            this.parentVal = "Thing";
        }
    }

    public openDialog(template: TemplateRef<PopupComponent>): void {
        this.dialog.open(template);
    }

    addClass() {
        this.openDialog(this.newClass)
    }

    onCreateForm() {
        const newClass = <Class> {
            id: this.newClassForm.getRawValue().name,
            name: this.newClassForm.getRawValue().name,
            relations: [],
            annotations: [],
        }

        const node = <TreeNode> {
            entity: newClass
        }

        // @ts-ignore
        this.data?.project1[0].classesTree[0].children?.push(node);
    }


    protected readonly secondTree = secondTree;
}

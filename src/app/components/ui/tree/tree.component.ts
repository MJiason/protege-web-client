import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTreeNestedDataSource} from "@angular/material/tree";
import {NestedTreeControl} from "@angular/cdk/tree";
import {TreeNode} from "../../../models/project-trees";
import {SelectionModel} from "@angular/cdk/collections";
import {Observable} from "rxjs";
import {OntologyClassAPI} from "../../../models/owl/OwlApiModels";

@Component({
    selector: 'tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.less']
})

export class TreeComponent implements OnInit {

    @Input() dataSelector!: Observable<OntologyClassAPI[]>
    @Output() nodeSelected = new EventEmitter<TreeNode>();
    @Output() addClass = new EventEmitter<any>();


    constructor(private cdr: ChangeDetectorRef) {
    }

    treeControl = new NestedTreeControl<TreeNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<TreeNode>();
    selection = new SelectionModel<TreeNode>(true);
    currentNode: TreeNode | undefined;

    ngOnInit(): void {
        if (this.dataSelector.subscribe(data => {
            this.dataSource.data = data.map(elem => <TreeNode>{
               entity: elem,
               children: undefined
           });
        }))
        console.log(this.dataSource.data)
    }


    public hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

    public onNodeClicked(node: TreeNode): void {
        if (this.selection.isSelected(node)) {
            this.selection.deselect(node);
        } else {
            this.selection.clear();
            this.selection.select(node);
        }
        this.currentNode = node;
        this.nodeSelected.emit(node);
    }

    onDeleteNodeByClassId() {

    }

    addClassFn() {
        //this.addClass.emit();

        this.cdr.detectChanges();
    }
}

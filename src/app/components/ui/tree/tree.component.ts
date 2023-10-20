import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from "@angular/material/tree";
import {FlatTreeControl, NestedTreeControl} from "@angular/cdk/tree";
import {node, secondTree, TreeNode} from "../../../models/project-trees";
import {SelectionModel} from "@angular/cdk/collections";
import {Class} from "../../../models/projects";

/** Flat node with expandable and level information */
interface ExampleFlatNode {
    expandable: boolean;
    name: string;
    level: number;
}

@Component({
    selector: 'tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.less']
})

export class TreeComponent implements OnInit {

    @Input() treeData!: any;
    @Output() nodeSelected = new EventEmitter<TreeNode>();
    @Output() addClass = new EventEmitter<any>();


    constructor(private cdr: ChangeDetectorRef) {
    }

    treeControl = new NestedTreeControl<TreeNode>(node => node.children);
    dataSource = new MatTreeNestedDataSource<TreeNode>();
    selection = new SelectionModel<TreeNode>(true);
    currentNode: TreeNode | undefined;

    ngOnInit(): void {
        this.dataSource.data = this.treeData;
    }

    deleteNodeByClassId(classId: string | undefined, node: TreeNode[] | undefined): TreeNode[] | undefined {
        if (!node) {
            return node;
        }

        // Filter the children array to remove the node with the specified classId
        node = node.filter((child) => {
            if (child.entity && child.entity.id === classId) {
                // Node with the specified classId found and removed
                return false;
            } else {
                // Recursively call the function for child nodes
                child.children = this.deleteNodeByClassId(classId, child.children);
                return true;
            }
        });

        return node;
    }

    hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

    onNodeClicked(node: TreeNode): void {
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
        let node = this.deleteNodeByClassId(this.currentNode?.entity?.id, this.treeData);
        this.dataSource.data = node as TreeNode[];
        this.treeControl.dataNodes = node as TreeNode[];
        this.cdr.detectChanges();
    }

    addClassFn() {
        this.addClass.emit();

        this.dataSource.data = secondTree;
        this.treeControl.dataNodes = secondTree;
        this.cdr.detectChanges();
    }
}

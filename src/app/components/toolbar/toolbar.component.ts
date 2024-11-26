import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectAllProjects} from "../../store/project-store/project.selectors";
import {InoutService} from "../../services/inout.service";

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {
    public isDownloadShown = false;

    message = 'welcome';
    fileName = "unnamed.owl"
    fileExtension = ".owl"


    public constructor(
        private store: Store,
        private inoutService: InoutService
    ) {
    }

    public ngOnInit(): void {
        this.store.select(selectAllProjects).subscribe((project) => {
            const projectName = project && project[0] && project[0].name ? project[0].name : this.fileName;
            this.fileName = projectName && projectName.endsWith(this.fileExtension)
                ? projectName
                : projectName + this.fileExtension;
                this.isDownloadShown = project.length > 0;
        })
    }

    public download() {
        this.inoutService.downloadOntology().subscribe(blob => {
            const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
            const anchor = document.createElement('a');  // Create a link element
            anchor.href = url;
            anchor.download = this.fileName; // Filename for the downloaded file
            anchor.click();                  // Trigger the download
            window.URL.revokeObjectURL(url); // Cle
        });
    }


}

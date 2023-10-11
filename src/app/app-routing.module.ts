import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsEditComponent} from "./components/projects/projects-edit/projects-edit.component";
import {ProjectsComponent} from "./components/projects/projects.component";

const routes: Routes = [
    {path: '', component: ProjectsComponent},
    {path: 'project/:id', component: ProjectsEditComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

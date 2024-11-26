import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.less']
})
export class SidenavComponent {

    @Input() navTemplate! : TemplateRef<any>
    @Input() mainTemplate! : TemplateRef<any>

}

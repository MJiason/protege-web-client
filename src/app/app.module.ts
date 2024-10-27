import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { ProjectsComponent } from './components/projects/projects.component';
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ProjectsTableComponent } from './components/projects/projects-table/projects-table.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import { PopupComponent } from './components/ui/popup/popup.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSortModule} from "@angular/material/sort";
import { ProjectsEditComponent } from './components/projects/projects-edit/projects-edit.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatSelectModule} from "@angular/material/select";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatGridListModule} from "@angular/material/grid-list";
import { TreeComponent } from './components/ui/tree/tree.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatListModule} from "@angular/material/list";
import { EditableTableComponent } from './components/ui/editable-table/editable-table.component';
import { PropertyTableComponent } from './components/ui/property-table/property-table.component';
import { IndTableComponent } from './components/ui/ind-table/ind-table.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { LanguageSelectorComponent } from './components/toolbar/language-selector/language-selector.component';
import {MatMenuModule} from "@angular/material/menu";
import {defaultInterpolationFormat, I18NEXT_SERVICE, I18NextModule, ITranslationService} from 'angular-i18next';
import translationEn from "../assets/locales/en.json";
import translationUa from "../assets/locales/ua.json";

import LanguageDetector from "i18next-browser-languagedetector";
import LocizeApi from "i18next-locize-backend";


const i18nOptions = {
    debug: true,
    fallbackLng: 'en',
    resources: {
        en: translationEn,
        ua: translationUa
    },
    interpolation: {
        format: I18NextModule.interpolationFormat(defaultInterpolationFormat)
    }
};
export function appInit(i18next: ITranslationService) {
    return () => i18next
        .use(LocizeApi)
        .use<any>(LanguageDetector)
        .init(i18nOptions);
}

export function localeIdFactory(i18next: ITranslationService) {
    return i18next.language;
}

export const I18N_PROVIDERS = [
    {
        provide: APP_INITIALIZER,
        useFactory: appInit,
        deps: [I18NEXT_SERVICE],
        multi: true
    },
    {
        provide: LOCALE_ID,
        deps: [I18NEXT_SERVICE],
        useFactory: localeIdFactory
    }];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ProjectsComponent,
    ProjectsTableComponent,
    PopupComponent,
    ProjectsEditComponent,
    TreeComponent,
    EditableTableComponent,
    PropertyTableComponent,
    IndTableComponent,
    LanguageSelectorComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        NoopAnimationsModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSortModule,
        MatTabsModule,
        MatSelectModule,
        MatSidenavModule,
        MatGridListModule,
        MatTreeModule,
        MatListModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        I18NextModule.forRoot()
    ],
  providers: [I18N_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }

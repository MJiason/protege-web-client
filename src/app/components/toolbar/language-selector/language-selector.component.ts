import {Component, Inject, OnInit} from '@angular/core';
import {I18NEXT_SERVICE, ITranslationService} from "angular-i18next";

@Component({
  selector: 'language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.less']
})
export class LanguageSelectorComponent implements OnInit {


    constructor(@Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService) {
    }

    public language: string = 'ua';

    public ngOnInit(): void {
        this.i18NextService.events.initialized.subscribe((e) => {
            console.log(e)
            if (e) {
                this.updateState(this.i18NextService.language);
            }
        });
    }

    public changeLanguage(lang: string): void {
        if (lang !== this.i18NextService.language) {
            console.log(lang)
            this.i18NextService.changeLanguage(lang).then(x => {
                this.updateState(lang);

                console.log(this.i18NextService.language)
                document.location.reload();
            });
        }
    }

    private updateState(lang: string): void {
        this.language = lang;
    }
}

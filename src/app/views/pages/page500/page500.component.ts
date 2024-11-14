import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslationModule } from 'src/app/services/Transalation.module';

@Component({
    selector: 'app-page500',
    templateUrl: './page500.component.html',
    styleUrls: ['./page500.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, TranslationModule]
})
export class Page500Component {

  language = '';
  constructor(
    private translate: TranslateService){
    this.language =  localStorage.getItem('language')?? 'es';
    this.translate.use(this.language)
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {

    this.language =  localStorage.getItem('language')?? 'es';
      this.translate.use(this.language);
    });
  }

}

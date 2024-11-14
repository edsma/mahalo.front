import { Component } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TranslationModule } from 'src/app/services/Transalation.module';

@Component({
    selector: 'app-page404',
    templateUrl: './page404.component.html',
    styleUrls: ['./page404.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RowComponent, ColComponent, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective,TranslationModule]
})
export class Page404Component {

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

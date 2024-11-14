import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { delay, filter, map, tap } from 'rxjs/operators';

import { ColorModeService } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { TranslationModule } from './services/Transalation.module'; // Ajusta la ruta según sea necesario
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [RouterOutlet, TranslationModule] // Asegúrate de incluir TranslationModule aquí

})
export class AppComponent implements OnInit {
  title = 'Mahalo';

  readonly #destroyRef: DestroyRef = inject(DestroyRef);
  readonly #activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #titleService = inject(Title);

  readonly #colorModeService = inject(ColorModeService);
  readonly #iconSetService = inject(IconSetService);

  constructor(private router: Router,private translate: TranslateService){
    const browserLang = this.getBrowserLang();


    this.translate.onLangChange.subscribe(() => {

      this.title = this.translate.instant('Welcome') + this.title;
      this.#titleService.setTitle(this.title);
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        // Recarga el idioma después de cada navegación
        this.translate.use(this.translate.currentLang?? 'es');
      }
    });

    // iconSet singleton
    this.#iconSetService.icons = { ...iconSubset };
    this.#colorModeService.localStorageItemName.set('Mahalo-default');
    this.#colorModeService.eventName.set('ColorSchemeChange');
  }

  private getBrowserLang() {
    const lang = navigator.language || navigator.languages[0]; // Obtener el idioma del navegador
    let result =  lang.split('-')[0]; // Retorna solo el código del idioma (por ejemplo, "en" en lugar de "en-US")
    //this.translate.use(result); // Cambia esto si deseas otro idioma por defecto
  }

  ngOnInit(): void {

    this.#router.events.pipe(
        takeUntilDestroyed(this.#destroyRef)
      ).subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });

    this.#activatedRoute.queryParams
      .pipe(
        delay(1),
        map(params => <string>params['theme']?.match(/^[A-Za-z0-9\s]+/)?.[0]),
        filter(theme => ['dark', 'light', 'auto'].includes(theme)),
        tap(theme => {
          this.#colorModeService.colorMode.set(theme);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}

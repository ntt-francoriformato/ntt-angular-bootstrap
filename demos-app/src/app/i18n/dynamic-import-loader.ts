import { TranslateLoader } from '@ngx-translate/core';
import { from } from 'rxjs';

export class DynamicImportLoader implements TranslateLoader {
   
  getTranslation(lang: string) {
    const fetchIt = async () => (await import('./it.json')).default;
    const fetchEn = async () => (await import('./en.json')).default;

    const json$ = lang === 'it' ? fetchIt() : fetchEn();

    return from(json$.then((x) => x));
  }
}

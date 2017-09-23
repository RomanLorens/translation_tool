import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {Translation} from './Translation';

@Injectable()
export class TranslationsService {

  constructor(private http: Http) { }

  getLanguages() {
    return ['all', 'eng', 'pl'];
  }

  search(filter) {
    return this.http.post('/api/list', filter).map((res: Response) => res.json());
  }

  update(translations: Translation[]) {
    console.log('update http... ', translations)
    return this.http.post('/api/update', translations).map((res: Response) => res.json());
  }

}

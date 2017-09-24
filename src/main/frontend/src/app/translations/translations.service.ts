import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {Translation} from './Translation';
import {Language} from './Language'

@Injectable()
export class TranslationsService {

  constructor(private http: Http) { }

  getLanguages(){
    return this.http.get('/api/languages').map((res: Response) => res.json());
  }

  search(filter) {
    return this.http.post('/api/list', filter).map((res: Response) => res.json());
  }

  update(translations: Translation[]) {
    console.log('update http... ', translations)
    return this.http.post('/api/update', translations).map((res: Response) => res.json());
  }

}

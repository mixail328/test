import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { ContactDAO} from '../interface/ContactDAO'
import { CommonService} from './common.service';
import { HttpClient } from '@angular/common/http';
import { ContactSearchValues } from '../search/SearchObjects';
import { from } from 'rxjs';

export const CONTACT_URL_TOKEN = new InjectionToken<string>('url');


@Injectable({
  providedIn: 'root'
})
export class ContactService extends CommonService<any> implements ContactDAO{
  constructor(@Inject(CONTACT_URL_TOKEN) private baseUrl,
              private http: HttpClient
  ) {
    super(baseUrl, http);
  }

  findContacts(contactSearchValues: ContactSearchValues) {
    return this.http.post<Contact[]>(this.baseUrl + '/search', contactSearchValues);
  }
}

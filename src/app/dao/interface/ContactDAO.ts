import { Observable } from 'rxjs';
import { CommonDAO } from './commonDAO';
import { Contact } from '../../models/Contact';
import { ContactSearchValues } from '../search/SearchObjects';

export interface ContactDAO extends CommonDAO<Contact> {
    findContacts(contactSearchValues: ContactSearchValues): Observable<any>;
}

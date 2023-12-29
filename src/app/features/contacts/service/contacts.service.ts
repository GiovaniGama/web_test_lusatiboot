import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../../../core/models/contactsModel/contacts.model';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private readonly url = environment.urlApi

  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<IContact[]>{
    return this.http.get<IContact[]>(`${this.url}/contacts`);
  }

  searchContacts(term: string): Observable<IContact[]> {
    let params = new HttpParams();

    if (term) {
      params = params.set('term', term);
    }

    return this.http.get<IContact[]>(`${this.url}/contacts`, { params });
  }

  createContact(contact: IContact): Observable<IContact>{
    return  this.http.post<IContact>(`${this.url}/contacts`, contact)
  }
}

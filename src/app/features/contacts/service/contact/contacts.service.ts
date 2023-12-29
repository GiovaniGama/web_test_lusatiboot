import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../../../../core/models/contactsModel/contacts.model';
import { environment } from '../../../../../environments/environment.development';

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

  updateContact(id: number, data: any): Observable<IContact> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.url}/contacts/${id}`;
    return this.http.put<IContact>(url, data, { headers });
  }

  deleteContact(id: number): Observable<IContact>{
    const url = `${this.url}/contacts/${id}`;
    return this.http.delete<IContact>(url);
  }
}

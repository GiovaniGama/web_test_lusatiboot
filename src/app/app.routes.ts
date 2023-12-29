import { Routes } from '@angular/router';
import { ContactsComponent } from './features/contacts/contacts.component';

export const routes: Routes = [
    {path: 'contatos', component: ContactsComponent},
    {path: '', redirectTo:'contatos', pathMatch: 'full'}
];

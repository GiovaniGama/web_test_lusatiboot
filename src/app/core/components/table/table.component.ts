import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IContact, IContactHeader, IOptionsContacts } from '../../models/contactsModel/contacts.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContactsService } from '../../../features/contacts/service/contact/contacts.service';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    InputTextModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{

  @Input() cols: IContactHeader[] = [];
  @Input() dataTable: IContact[] = []; 

  expression: any;
  visible = false;

  dataContact: IContact = {
    dsContato: '',
    nrCelular: '',
    dsEmail: '',
    stAtivo: 0,
    id: 0
  }

  deleteContactData: IContact = {
    dsContato: '',
    nrCelular: '',
    dsEmail: '',
    stAtivo: 0,
    id: 0
  }

  formGroup!: FormGroup;

  options!: IOptionsContacts[];

  constructor(
    private contactsService: ContactsService,
    private fb: FormBuilder
    ){}

  ngOnInit(): void {
    this.options = [
      {name: 'Ativo', code: true},
      {name: 'Inativo', code: false},
    ];

    this.formGroup = this.fb.group({
      dsContato: ['', [Validators.required]],
      nrCelular: ['', [Validators.required]],
      dsEmail: ['', [Validators.required]],
      stAtivo: [ [], [Validators.required]],
    });
  }

  showDialog(contact: IContact) {
    this.dataContact = { ...contact };
    this.formGroup.patchValue({
      dsContato: this.dataContact.dsContato,
      nrCelular: this.dataContact.nrCelular,
      dsEmail: this.dataContact.dsEmail,
      stAtivo: [this.dataContact.stAtivo ? this.options[0] : this.options[1]],
    });
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.formGroup.reset();
  }

  editContact() {
    const formValue = this.formGroup.value;

    const selectedOptions = formValue.stAtivo.map((option: IOptionsContacts) => option.code);
    formValue.stAtivo = selectedOptions.includes(true);

    if (this.dataContact) {
      this.contactsService.updateContact(this.dataContact.id, formValue).subscribe(result => {
        const index = this.dataTable.findIndex(contact => contact.id === result.id);
        if (index !== -1) {
          this.dataTable[index] = result;
        }
      });
    }
    this.hideDialog();
  }

  deleteContact(contact: IContact){
    this.deleteContactData = {...contact};
    this.contactsService.deleteContact(this.deleteContactData.id).subscribe(result => this.dataTable.push(result))
    window.location.reload();
  }
}

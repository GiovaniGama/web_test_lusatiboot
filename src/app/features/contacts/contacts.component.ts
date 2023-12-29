import { Component, OnInit } from '@angular/core';
import { ContactsService } from './service/contact/contacts.service';
import { HttpClientModule } from '@angular/common/http';
import { IContact, IContactHeader, IOptionsContacts } from '../../core/models/contactsModel/contacts.model';
import { TableComponent } from "../../core/components/table/table.component";
import { CardComponent } from "../../core/components/card/card.component";
import { ToolbarComponent } from "../../core/components/toolbar/toolbar.component";
import { DialogModule } from 'primeng/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-contacts',
    standalone: true,
    providers: [ContactsService],
    templateUrl: './contacts.component.html',
    styleUrl: './contacts.component.scss',
    imports: [
        HttpClientModule, 
        TableComponent, 
        CardComponent, 
        ToolbarComponent, 
        DialogModule,
        InputTextModule,
        MultiSelectModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule
      ],
      animations: [
        trigger('slideInOut', [
          state('in', style({
            transform: 'translate3d(0, 0, 0)'
          })),
          state('out', style({
            transform: 'translate3d(100%, 0, 0)'
          })),
          transition('in => out', animate('400ms ease-in-out')),
          transition('out => in', animate('400ms ease-in-out'))
        ])
      ]
})
export class ContactsComponent implements OnInit{

  cols: IContactHeader[] = [];
  dataTable: IContact[] = [];
  
  numberActivecontacts:number = 0;
  numberInactivecontacts:number = 0;

  visible: boolean = false;

  termoBusca: string = '';

  options!: IOptionsContacts[];

  selectedOptions!: IOptionsContacts[];

  formGroup!: FormGroup;

  constructor(
      private contactsService: ContactsService,
      private fb: FormBuilder
      ){}

  ngOnInit(): void {
    this.contactsService.getAllContacts().subscribe((data) => {
        this.dataTable = data
        this.numberActivecontacts = this.dataTable.filter(contact => contact.stAtivo === 1).length;
        this.numberInactivecontacts = this.dataTable.filter(contact => contact.stAtivo === 0).length;
      }
    );

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'dsContato', header: 'Contato' },
      { field: 'dsEmail', header: 'Email' },
      { field: 'nrCelular', header: 'Número de Celular' },
      { field: 'stAtivo', header: 'Ativo | Inativo' }
    ];

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

  searchContacts() {
    this.contactsService.searchContacts(this.termoBusca).subscribe(
      (data) => {
        this.dataTable = data;
      },
      (error) => {
        console.error('Erro ao buscar contatos:', error);
      }
    );
  }

  showDialog() {
    this.visible = true;
  }

  createContact(){
    const formValue = this.formGroup.value;
  
    const selectedOptions = formValue.stAtivo.map((option: IOptionsContacts) => option.code);
    formValue.stAtivo = selectedOptions.includes(true);

    if (this.dataTable) {
      this.contactsService.createContact(formValue).subscribe(result => {
        const index = this.dataTable.findIndex(contact => contact.id === result.id);
        if (index !== -1) {
          this.dataTable[index] = result;
        }
      });
    }

    this.visible = false;

    this.formGroup.reset()

    window.location.reload();
  }
}

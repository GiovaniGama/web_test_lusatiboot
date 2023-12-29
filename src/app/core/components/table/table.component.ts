import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IContactHeader } from '../../models/contactsModel/contacts.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule,CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{
  @Input() cols: IContactHeader[] = [];
  @Input() dataTable: any[] = [];
expression: any;

  ngOnInit(): void {
    console.log(this.dataTable)
    console.log(this.cols)
  }
}

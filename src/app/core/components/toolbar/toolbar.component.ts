import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    ToolbarModule, 
    CommonModule, 
    SplitButtonModule, 
    InputTextModule, 
    TooltipModule,
    FormsModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() function = new EventEmitter<any>();
  @Output() secoundFunction = new EventEmitter<any>();
  @Output() termoBuscaChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() termoBusca: string = '';

  action(event: any) {
    this.function.emit(event);
  }

  functionSubmit(event: any){
    console.log(this.termoBusca)
    this.secoundFunction.emit(event);
  }

  onTermoBuscaChange(newValue: string) {
    this.termoBusca = newValue;
    this.termoBuscaChange.emit(newValue);
  }
}

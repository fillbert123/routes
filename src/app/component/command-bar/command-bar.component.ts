import { Component, EventEmitter, NgModule, Output, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.scss', '../animation.component.scss']
})
export class CommandBarComponent {
  inputValue: string = '';
  @Output() query = new EventEmitter<any>();
  @Output() backButtonClick = new EventEmitter<any>();

  changeQuery(event: any) {
    this.emitChangeQuery(event);
  }

  emitChangeQuery(event: any) {
    this.query.emit(event);
  }

  handleBackButtonClick() {
    this.backButtonClick.emit();
  }
}

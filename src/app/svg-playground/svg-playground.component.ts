import { Component } from '@angular/core';

@Component({
  selector: 'app-svg-playground',
  templateUrl: './svg-playground.component.html',
  styleUrl: './svg-playground.component.scss'
})
export class SvgPlaygroundComponent {
  print(text: string) {
    console.log(text);
  }
}

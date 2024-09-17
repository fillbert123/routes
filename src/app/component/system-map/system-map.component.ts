import { Component } from '@angular/core';

@Component({
  selector: 'app-system-map',
  templateUrl: './system-map.component.html',
  styleUrl: './system-map.component.scss'
})
export class SystemMapComponent {
  print(text: string) {
    console.log(text);
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value: any): any[] {
    if (!value) return [];
    return Object.keys(value);
  }
}
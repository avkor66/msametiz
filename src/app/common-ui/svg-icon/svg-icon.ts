import { Component, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  template: `<svg:use [attr.href]="href"></svg:use>`,
  styles: [``]
})
export class SvgIcon {
  @Input() icon = '';

  get href() {
    return `/assets/svg/icons.svg#${this.icon}`;
  }
}

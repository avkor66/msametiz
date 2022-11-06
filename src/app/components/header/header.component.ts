import { Component } from '@angular/core'
const logo = '../../../assets/data/images/logo.svg'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})

export class HeaderComponent {
  logo = logo
}

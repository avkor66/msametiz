import { Component } from '@angular/core'
const logo = '../../../assets/data/images/logo.svg'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['footer.component.scss']
})

export class FooterComponent {
  logo = logo
}

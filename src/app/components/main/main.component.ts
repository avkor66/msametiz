import { Component } from '@angular/core'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['main.component.scss']
})

export class MainComponent {
  obj = {
    tk_jde: '../../../assets/data/images/tk_logo/jde.svg',
    tk_baikalsr: '../../../assets/data/images/tk_logo/baikalsr.svg',
    tk_dellin: '../../../assets/data/images/tk_logo/dellin.png',
    tk_express: '../../../assets/data/images/tk_logo/express-auto.png',
    tk_kit: '../../../assets/data/images/tk_logo/kit.svg',
  }
}

import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['delivery.component.scss']
})

export class DeliveryComponent {
  obj = {
    tk_jde: '../../../assets/data/images/tk_logo/jde.svg',
    tk_baikalsr: '../../../assets/data/images/tk_logo/baikalsr.svg',
    tk_dellin: '../../../assets/data/images/tk_logo/dellin.png',
    tk_express: '../../../assets/data/images/tk_logo/express-auto.png',
    tk_kit: '../../../assets/data/images/tk_logo/kit.svg',
  }
}

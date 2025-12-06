import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Sidebar} from '../sidebar/sidebar';
import {ProfileService} from "../../data/services/profile";
import {Header} from "../../layout/header/header";

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Sidebar,
    Header
  ],
  templateUrl: './layout-profile.html',
  styleUrl: './layout-profile.scss'
})
export class LayoutProfile {
  // profileService = inject(ProfileService);
  // ngOnInit() {
  //   console.log('me in ngOnInit()');
  //   this.profileService.getMe().subscribe(
  //     val => {
  //       console.log('ngOnInit => getMe ', val)
  //     }
  //   )
  // }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModalComponent} from "./components/modal/modal.component";

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

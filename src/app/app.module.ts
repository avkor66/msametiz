import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { AboutComponent } from './components/about/about.component';
import { ProdComponent } from './components/prod/prod.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { ServicesComponent } from './components/services/services.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';
import { TitleComponent } from './components/title/title.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactsComponent } from './components/contacts/contacts.component';
// import { CaruselComponent } from './components/carusel/carusel.component';
import { ProductService } from './service/product.servise';
import { HttpClientModule } from "@angular/common/http";
import { LeftRightComponent } from './components/left-right/left-right.component';
import { LeftRightEqComponent } from './components/left-right-eq/left-right-eq.component';
import { SwiperModule } from 'swiper/angular';
import { CalcComponent } from './components/calc/calc.component';
import { ModalComponent } from './components/modal/modal.component';
import { SignupComponent } from './components/signup/signup.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FocusDirective } from './directives/focus.directive';

@NgModule({
  declarations: [
    TitleComponent,
    AppComponent,
    AboutComponent,
    ContactsComponent,
    DeliveryComponent,
    EquipmentComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent,
    ProdComponent,
    PageNotFoundComponent,
    ProductComponent,
    ServicesComponent,
    // CaruselComponent,
    LeftRightEqComponent,
    LeftRightComponent,
    CalcComponent,
    ModalComponent,
    SignupComponent,
    FocusDirective,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        AppRoutingModule,
        HttpClientModule,
        SwiperModule,
        RouterModule.forRoot([
            {path: 'delivery', component: DeliveryComponent},
            {path: '', component: MainComponent},
            {path: 'about', component: AboutComponent},
            {path: 'products', component: ProductComponent},
            {path: 'contacts', component: ContactsComponent},
            {path: 'equipment', component: EquipmentComponent},
            {path: 'services', component: ServicesComponent},
            {path: 'calc', component: CalcComponent},
            // {path: '', redirectTo: '/products', pathMatch: 'full'},
            {path: '**', component: PageNotFoundComponent},
        ]),
        ReactiveFormsModule,
    ],
  providers: [
    ProductService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

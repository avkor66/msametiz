import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { ProductService } from './service/product.servise';
import { HttpClientModule } from "@angular/common/http";

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
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'delivery', component: DeliveryComponent},
      {path: '', component: MainComponent},
      {path: 'about', component: AboutComponent},
      {path: 'products', component: ProductComponent},
      {path: 'contacts', component: ContactsComponent},
      {path: 'equipment', component: EquipmentComponent},
      {path: 'services', component: ServicesComponent},
      // {path: '', redirectTo: '/products', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent},
    ]),
  ],
  providers: [
    ProductService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
 
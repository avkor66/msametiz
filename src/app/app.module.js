"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var product_component_1 = require("./components/product/product.component");
var page_not_found_component_1 = require("./components/page-not-found/page-not-found.component");
var delivery_component_1 = require("./components/delivery/delivery.component");
var about_component_1 = require("./components/about/about.component");
var prod_component_1 = require("./components/prod/prod.component");
var equipment_component_1 = require("./components/equipment/equipment.component");
var services_component_1 = require("./components/services/services.component");
var main_component_1 = require("./components/main/main.component");
var header_component_1 = require("./components/header/header.component");
var title_component_1 = require("./components/title/title.component");
var footer_component_1 = require("./components/footer/footer.component");
var contacts_component_1 = require("./components/contacts/contacts.component");
var product_servise_1 = require("./service/product.servise");
var http_1 = require("@angular/common/http");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, core_1.NgModule)({
            declarations: [
                title_component_1.TitleComponent,
                app_component_1.AppComponent,
                about_component_1.AboutComponent,
                contacts_component_1.ContactsComponent,
                delivery_component_1.DeliveryComponent,
                equipment_component_1.EquipmentComponent,
                footer_component_1.FooterComponent,
                header_component_1.HeaderComponent,
                main_component_1.MainComponent,
                prod_component_1.ProdComponent,
                page_not_found_component_1.PageNotFoundComponent,
                product_component_1.ProductComponent,
                services_component_1.ServicesComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule.withServerTransition({ appId: 'serverApp' }),
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                router_1.RouterModule.forRoot([
                    { path: 'delivery', component: delivery_component_1.DeliveryComponent },
                    { path: '', component: main_component_1.MainComponent },
                    { path: 'about', component: about_component_1.AboutComponent },
                    { path: 'products', component: product_component_1.ProductComponent },
                    { path: 'contacts', component: contacts_component_1.ContactsComponent },
                    { path: 'equipment', component: equipment_component_1.EquipmentComponent },
                    { path: 'services', component: services_component_1.ServicesComponent },
                    // {path: '', redirectTo: '/products', pathMatch: 'full'},
                    { path: '**', component: page_not_found_component_1.PageNotFoundComponent },
                ]),
            ],
            providers: [
                product_servise_1.ProductService
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;

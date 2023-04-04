"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProdComponent = void 0;
var core_1 = require("@angular/core");
var ProdComponent = /** @class */ (function () {
    function ProdComponent(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    ProdComponent.prototype.open = function () {
        var article = document.querySelector('.page');
        console.log(this.product);
        article.innerHTML = "\n    <div class=\"post\">\n      <div class=\"post__back\">\n        <a href=\"/products\">\n          <button class=\"btn-card\" type=\"submit\">\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0432\u044B\u0431\u043E\u0440\u0443</button>\n        </a>\n      </div>\n      <div class=\"post__image\">\n        <img src=\"".concat(this.product.images[0].src, "\" alt=\"").concat(this.product.images[0].alt, "\">\n      </div>\n      <div class=\"post__direction\">\n        <div class=\"desc\">\n          <h2>\n          ").concat(this.product.title, "\n          </h2>\n          \n          <p class=\"desc-text\">\n          ").concat(this.product.desc, "\n\n          </p>\n\n          <p class=\"info\">\n            <span>\u041C\u0430\u0440\u043A\u0430 \u0441\u0442\u0430\u043B\u0438:</span>\n            \n          </p>\n          <p class=\"info\">\n            <span>\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F:</span>\n            fasteners\n          </p>\n          <p class=\"info\">\n            <span>\u0413\u043E\u0434:</span>\n            \n          </p>\n          <p class=\"info\">\n            <span>\u043D\u0430 \u0441\u043A\u043B\u0430\u0434\u0435:</span>\n            \u0432 \u043D\u0430\u043B\u0438\u0447\u0438\u0438\n          </p>\n          <p class=\"info\">\n            <span>\u0413\u041E\u0421\u0422\u044B:</span>\n            ").concat(this.product.gost[0] ? this.product.gost[0].description : '', "\n            </p>\n\n\n        </div>\n      </div></div>\n    ");

    };
    __decorate([
        (0, core_1.Input)()
    ], ProdComponent.prototype, "product");
    __decorate([
        (0, core_1.ViewChild)('app-prod')
    ], ProdComponent.prototype, "link");
    ProdComponent = __decorate([
        (0, core_1.Component)({
            selector: 'app-prod',
            templateUrl: './prod.component.html',
            styleUrls: ['prod.component.scss']
        })
    ], ProdComponent);
    return ProdComponent;
}());
exports.ProdComponent = ProdComponent;

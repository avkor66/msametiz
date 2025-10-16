import { Component, ComponentFactoryResolver, Input, ViewChild } from '@angular/core'
import { IProduct } from 'src/app/models/product'

@Component({
  selector: 'app-prod',
  templateUrl: './prod.component.html',
  styleUrls: ['prod.component.scss']
})

export class ProdComponent {
  @Input() product: IProduct
  @ViewChild('app-prod') link: HTMLDivElement

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
    ) {}

  open() {

    let article = document.querySelector('.page') as HTMLDivElement

    article.innerHTML = `
    <div class="post">
      <div class="post__back">
        <a href="/products">
          <button class="btn-card" type="submit">Вернуться к выбору</button>
        </a>
      </div>
      <div class="post__image">
        <img src="${this.product.images[0].src}" alt="${this.product.images[0].alt}">
      </div>
      <div class="post__direction">
        <div class="desc">
          <h2>
          ${this.product.title}
          </h2>

          <p class="desc-text">
          ${this.product.desc}

          </p>

          <p class="info">
            <span>Марка стали:</span>

          </p>
          <p class="info">
            <span>Категория:</span>
            fasteners
          </p>
          <p class="info">
            <span>Год:</span>

          </p>
          <p class="info">
            <span>на складе:</span>
            в наличии
          </p>
          <p class="info">
            <span>ГОСТы:</span>
            ${this.product.gost[0] ? this.product.gost[0].description : ''}
            </p>


        </div>
      </div></div>
    `

    // let bookItemComponent = this.componentFactoryResolver.resolveComponentFactory(
    //   BookItemComponent
    // )
    // let bookItemComponentRef = this.book.viewContainerRef.createComponent(
    //   bookItemComponent
    // )
    // ;(<BookItemComponent>(
    //   bookItemComponentRef.instance
    // )).value = {
    //   title: 'Great Expectations',
    //   author: 'Charles Dickens',
    // }
  }


}

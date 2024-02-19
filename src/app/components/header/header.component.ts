import { Component } from '@angular/core'
const logo = '../../../assets/data/images/logo.svg'
const tgl = '../../../assets/data/images/icons/btn-toggle.svg'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})

export class HeaderComponent {
  logo = logo
  tgl = tgl
  
  // const btnToggle = document.getElementById('btn-toggle')
  // const menuToggle = document.getElementById('toggle-menu')
  // const navMenuItem = document.querySelectorAll('.nav-menu-item')
  // let flag = false
  // let rand = Math.floor(Math.random() * 8)
  
  // window.onscroll = function(){
  //     return false;
  //   }
  // btnToggle.addEventListener('click', () => {
  //     if (flag) {
  //         menuToggle.classList.add('transition-toggle-menu-leave')
  //         menuToggle.classList.remove('transition-toggle-menu')
  //         btnToggle.classList.remove('rotate')
  //         btnToggle.classList.add('rotate-leave')
  //         flag = false
  //         document.querySelector('.modal__menu').remove()
  //     } else {
  //         menuToggle.classList.add('transition-toggle-menu')
  //         btnToggle.classList.add('rotate')
  //         btnToggle.classList.remove('rotate-leave')
  //         flag = true
  //         const cardPets_ = document.createElement('div')
  //         cardPets_.classList.add('modal__menu')
  //         document.body.insertAdjacentElement('afterbegin', cardPets_)
     
  //         document.querySelector('.modal__menu').addEventListener('click', () => {
  //             menuToggle.classList.add('transition-toggle-menu-leave')
  
  //             menuToggle.classList.remove('transition-toggle-menu')
  //             btnToggle.classList.remove('rotate')
  //             btnToggle.classList.add('rotate-leave')
  //             flag = false
  //             document.querySelector('.modal__menu').remove()    
  //         })
  
  //     }
  // })
  // menuToggle.addEventListener('animationend', () => {
  //     menuToggle.classList.remove('transition-toggle-menu-leave')
  
  // })


}

import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CartService } from 'src/app/service/cart.service';
import { ChoiceService } from 'src/app/service/choice.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ApiService } from '..//../service/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    // Define the animation triggers
    trigger('flyInOut', [
      state('in', style({ transform: 'translateY(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate('0.3s ease-in-out')
      ]),
      transition('* => void', [
        animate('0.3s ease-in-out', style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('marquee', { static: true }) marqueeElement!: ElementRef;
  public notifications: any[] = [];
  private currentIndex = 0;

  isCopyrightVisible = false;
  shouldDisplayCopyrightDiv = false; 
  headerHeight: number = 0;

  @HostListener('window:scroll', ['$event'])
  @HostListener('window:resize', ['$event'])
  onScroll(event: any) {
    this.checkVisibility();
  }

  checkVisibility() {
    const copyrightDiv = document.getElementById('copyright');
    if (copyrightDiv) {
      const contentHeight = document.body.scrollHeight;
      const screenHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const lastScrollPosition = contentHeight - screenHeight;
      this.shouldDisplayCopyrightDiv =
        contentHeight <= screenHeight || (scrollTop >= lastScrollPosition && contentHeight > screenHeight);
    }
  }
  
  public totalCartItem: number = 0;
  public totalChoiceItem: number = 0;
  public searchTerm!: string;
  menuActive = false;
  inactivityTimeout: any;
  loginStatus: boolean = false;

  @ViewChild('menuToggle', { static: true }) menuToggle!: ElementRef;
  @ViewChild('menu_item2', { static: true }) menu_item2!: ElementRef; 
  @ViewChild('academicMenu') academicMenu!: ElementRef;
  item2: any;
  item1: any;


  constructor(
    private cartService: CartService, 
    private choiceService: ChoiceService, 
    private route: ActivatedRoute, 
    private router: Router,
    private apiService: ApiService) { }

  ngOnInit(): void {

    const searchBarElement = document.getElementById('searchBar');
    if (searchBarElement) {
      searchBarElement.style.display = 'block';
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.checkVisibility();
        }, 100);
      }
    });
    this.checkVisibility();
    localStorage.getItem('isLoggedIn');
    localStorage.getItem('authToken');
    localStorage.getItem('formData');
    sessionStorage.getItem('sessionCartItems'); //added later
    localStorage.getItem(`cartState_`); //added later
    sessionStorage.getItem('sessionChoiceItems'); //added later
    localStorage.getItem(`choiceState_`); //added later
    const menu_item0 = document.getElementById('menu_item0');
    const menu_item1 = document.getElementById('menu_item1');
    const menu_item2 = document.getElementById('menu_item2');
    const sign_menu = document.getElementById('sign_menu');
    const profileMenu = document.getElementById('profileMenu');
    const edit = document.getElementById('edit');
    if (menu_item2 && menu_item1 && menu_item0 && sign_menu && profileMenu && edit) {
      this.loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      if (this.loginStatus) {
        profileMenu.style.display = 'block';
        menu_item2.style.display = 'block';
        edit.style.display = 'block';
        sign_menu.style.display = 'none';
        menu_item0.style.display = 'none';
        menu_item1.style.display = 'none';
      }
      else {
        edit.style.display = 'none';
        sign_menu.style.display = 'block';
        menu_item0.style.display = 'block';
        menu_item1.style.display = 'block';
      }
    }

    this.cartService.getCartProducts()
      .subscribe((res: any[]) => {
        this.totalCartItem = res.length;
      });

    this.choiceService.getChoiceProducts()
      .subscribe((res: any[]) => {
        this.totalChoiceItem = res.length;
      });

    this.route.queryParams.subscribe(params => {
      if (this.route.snapshot.url.length > 0 && this.route.snapshot.url[0].path === 'products' && params['itemId']) {
        this.added(params['itemId']);
        this.addedC(params['itemId']);
      }
    });
  }

  added(itemId: any) {
    const sessionCartItems = JSON.parse(sessionStorage.getItem('sessionCartItems') || '[]');

    if (sessionCartItems.includes(itemId)) {
      const itemToAdd = this.getProductById(itemId);
      if (itemToAdd) {
        itemToAdd.add_to_cart = true;
        this.cartService.addtocart(itemToAdd);
      }
    }
  }

  addedC(itemId: any) {
    const sessionChoiceItems = JSON.parse(sessionStorage.getItem('sessionCartItems') || '[]');

    if (sessionChoiceItems.includes(itemId)) {
      const itemToAdd = this.getProductById(itemId);
      if (itemToAdd) {
        itemToAdd.love = true;
        this.choiceService.addtochoice(itemToAdd);
      }
    }
  }

  getProductById(itemId: any): any {
    const foundItem = this.cartService.cartItemList.find(item => item.id === itemId);
    return foundItem || null;
  }

  getChoiceById(itemId: any): any {
    const foundItem = this.choiceService.choiceItemList.find(item => item.id === itemId);
    return foundItem || null;
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
    this.choiceService.search.next(this.searchTerm);
  }
  toggleMenu() {
    this.menuActive = !this.menuActive;
    this.resetInactivityTimeout();
  }

  closeMenu() {
    this.menuActive = false;
  }
  
  closeProfileMenu() {
    this.isDropdownOpen = false;  //added
  }
  
  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.resetInactivityTimeout();
  }
  
  isAcademicDropdownOpen = false;
  isAdmissionDropdownOpen = false;
  toggleAcademicDropdown() {
    this.isAcademicDropdownOpen = !this.isAcademicDropdownOpen;
    this.resetInactivityTimeout();
  }

  openAcademicDropdown() {
    this.isAcademicDropdownOpen = true;
    this.isAdmissionDropdownOpen = false;
  }
  openAdmissionDropdown(){
    this.isAdmissionDropdownOpen = true;
    this.isAcademicDropdownOpen = false;
  }
  closeAcademicDropdown() {
  }

  resetInactivityTimeout() {
    clearTimeout(this.inactivityTimeout);
    this.inactivityTimeout = setTimeout(() => {
      this.closeMenu();
      this.closeProfileMenu();
      this.closeAcademicDropdown();
    }, 3000);
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.menuToggle.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
    if (!this.menu_item2.nativeElement.contains(event.target)) {
      this.closeProfileMenu(); //added
    }
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (!this.academicMenu.nativeElement.contains(event.target)) {
      this.closeAcademicDropdown();
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onWindowMouseMove() {
    this.resetInactivityTimeout();
  }

  @HostListener('window:keydown', ['$event'])
  onWindowKeyDown() {
    this.resetInactivityTimeout();
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('authToken');
    const menu_item0 = document.getElementById('menu_item0');
    const menu_item1 = document.getElementById('menu_item1');
    const menu_item2 = document.getElementById('menu_item2');
    const profileMenu = document.getElementById('profileMenu');
    const sign_menu = document.getElementById('sign_menu');
    const edit = document.getElementById('edit');
    if (menu_item2 && menu_item1 && menu_item0 && profileMenu && sign_menu && edit) {
        sign_menu.style.display = '-webkit-inline-box';
        menu_item0.style.display = 'block';
        menu_item1.style.display = 'block';
        edit.style.display = 'none';
        menu_item2.style.display = 'none';
        profileMenu.style.display = 'none';

      }
    this.router.navigate(['']);
  }

  

  loadNotifications() {
    this.apiService.getNotifications().subscribe(
      data => {
        this.notifications = data;
        this.startMarquee();
      },
      error => {
        console.error('Error fetching notifications!');
      }
    );
  }

  startMarquee() {
    if (this.notifications.length > 0) {
      this.updateMarqueeMessage();
      this.marqueeElement.nativeElement.addEventListener('animationiteration', () => {
        this.updateMarqueeMessage();
      });
    }
  }

  updateMarqueeMessage() {
    const messageElement: HTMLElement = this.marqueeElement.nativeElement.querySelector('.msg');
    
    let notificationsHTML = '';
    for (let i = 0; i < this.notifications.length; i++) {
      const currentIndex = (this.currentIndex + i) % this.notifications.length;
      const currentNotification = this.notifications[currentIndex];
      notificationsHTML += `<a href="${currentNotification.link}" class="msg_link" target="_blank">${currentNotification.text}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
    }
    
    messageElement.innerHTML = notificationsHTML;
    this.addDynamicStyles();
  
    const messageWidth = messageElement.scrollWidth;
    const viewportWidth = window.innerWidth;
  
    let increasingTime: number;
    if (viewportWidth < 576) {
      increasingTime = 7;
    } else if (viewportWidth < 768) {
      increasingTime = 10;
    } else if (viewportWidth < 992) {
      increasingTime = 12;
    } else if (viewportWidth < 1200) {
      increasingTime = 15;
    } else {
      increasingTime = 20;
    }
  
    let animationDuration: number;
    if (messageWidth <= viewportWidth) {
      animationDuration = increasingTime;
    } else {
      const numberOfWidths = Math.ceil(messageWidth / viewportWidth);
      animationDuration = increasingTime + numberOfWidths * increasingTime;
    }
  
    const keyframes = `
      @keyframes scrollLeft {
        0% {
          transform: translateX(100vw);
        }
        100% {
          transform: translateX(-${messageWidth}px);
        }
      }
    `;
    
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      .marquee .msg {
        animation: scrollLeft ${animationDuration}s linear infinite;
      }
      ${keyframes}
    `;
    document.head.appendChild(style);
  
    this.currentIndex = (this.currentIndex + 1) % this.notifications.length;
  }
  
  addDynamicStyles() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = `
      .msg_link {
        text-decoration: none;
        color: teal;
      }
      .msg_link:hover {
        color: yellowgreen;
      }
    `;
    document.head.appendChild(style);
  } 

}

import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CartService } from 'src/app/service/cart.service';
import { ChoiceService } from 'src/app/service/choice.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';


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
        contentHeight <= screenHeight ||
        (scrollTop >= lastScrollPosition && contentHeight > screenHeight);
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


  constructor(private cartService: CartService, private choiceService: ChoiceService, private route: ActivatedRoute, private router: Router) { }

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
    }, 10000);
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

}

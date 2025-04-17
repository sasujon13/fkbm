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
  academicDropdownOpen = true;
  depts: string[] = [];

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
        // contentHeight <= screenHeight || (scrollTop >= lastScrollPosition && contentHeight > screenHeight);
        contentHeight <= (screenHeight + 100) || (scrollTop >= (lastScrollPosition - 100) && contentHeight > (screenHeight - 100));

    }
  }

  public totalCartItem: number = 0;
  public totalChoiceItem: number = 0;
  public searchTerm!: string;
  menuActive = false;
  inactivityTimeout: any;
  loginStatus: boolean = false;

  @ViewChild('menuToggle', { static: true }) menuToggle!: ElementRef;
  item2: any;
  item1: any;


  constructor(
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getDepts().subscribe(data => {
      this.depts = [...new Set(data.map((t: any) => t.Name))];
    });

    const searchBarElement = document.getElementById('searchBar');
    if (searchBarElement) {
      searchBarElement.style.display = 'block';
    }
    this.checkVisibility();
  }

  closeMenu() {
    this.menuActive = false;
    this.isDropdownOpen = false;
    this.academicDropdownOpen = false;
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleAcademicDropdown() {
    this.academicDropdownOpen = !this.academicDropdownOpen;
  }

  showDropdown() {
    this.academicDropdownOpen = true;
  }

  hideDropdown() {
    this.academicDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.menuToggle.nativeElement.contains(event.target)) {
      this.menuActive = true;
      this.isDropdownOpen = true;
      this.academicDropdownOpen = true;
    }
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.academicDropdownOpen = false;
    }
  }

  @HostListener('window:mousemove', ['$event'])
  onWindowMouseMove(event: MouseEvent) {
    const target = event.target as HTMLElement;

    const insideMenu = target.closest('.navbar');

    if (!insideMenu) {
      clearTimeout(this.inactivityTimeout);
      this.inactivityTimeout = setTimeout(() => {
        this.menuActive = false;
        this.isDropdownOpen = false;
        this.academicDropdownOpen = false;
      }, 300);
    }
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const insideMenu = target.closest('.navbar');

    if (!insideMenu) {
      this.menuActive = false;
      this.isDropdownOpen = false;
      this.academicDropdownOpen = false;
    }
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

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.apiService.search.next(this.searchTerm);
  }

  search2(event: any) {
    event.preventDefault();
    this.searchTerm = '';
    this.apiService.search.next(this.searchTerm);
  }

  searchIconClick() {
    this.apiService.search.next(this.searchTerm);
  }


}

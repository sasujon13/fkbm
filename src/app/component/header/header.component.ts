import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ApiService } from '..//../service/api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
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
  baseUrl = 'https://kbmcollege.edu.bd';
  @ViewChild('marquee', { static: true }) marqueeElement!: ElementRef;
  public notifications: any[] = [];
  private currentIndex = 0;
  academicDropdownOpen = false;
  academicDropdownOpen2 = false;
  academicDropdownOpen3 = false;
  academicDropdownOpen4 = false;
  academicDropdownOpen5 = false;
  depts: string[] = [];
  deptNames: any[] = [];
  searchKey: string = "";

  isCopyrightVisible = false;
  shouldDisplayCopyrightDiv = false;
  headerHeight: number = 0;

  public totalCartItem: number = 0;
  public totalChoiceItem: number = 0;
  public searchTerm!: string;
  menuActive = false;
  inactivityTimeout: any;
  inactivityTimeout2: any;
  loginStatus: boolean = false;
  academicTimeout: any;
  academicTimeout2: any;

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
        contentHeight <= (screenHeight + 100) || (scrollTop >= (lastScrollPosition - 100) && contentHeight > (screenHeight - 100));
    }
  }

  @ViewChild('menuToggle', { static: true }) menuToggle!: ElementRef;
  item2: any;
  item1: any;

  constructor(
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    this.apiService.getDepts().subscribe(data => {
      this.depts = [...new Set(data.map((t: any) => t.Name))];
    });
    this.apiService.getLinks().subscribe(data => {
      this.deptNames = data;
    });
    this.loadNotifications();
    const searchBarElement = document.getElementById('searchBar');
    if (searchBarElement) {
      searchBarElement.style.display = 'block';
    }
    this.checkVisibility();
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  toggleAcademicDropdown() {
    this.academicDropdownOpen = !this.academicDropdownOpen;
  }

  toggleAcademicDropdown2() {
    this.academicDropdownOpen2 = !this.academicDropdownOpen2;
  }

  toggleAcademicDropdown3() {
    this.academicDropdownOpen3 = !this.academicDropdownOpen3;
  }

  toggleAcademicDropdown4() {
    this.academicDropdownOpen4 = !this.academicDropdownOpen4;
  }

  toggleAcademicDropdown5() {
    this.academicDropdownOpen5 = !this.academicDropdownOpen5;
  }

  showDropdown() {
    setTimeout(() => {
    this.academicDropdownOpen = true;
  }, 700);
  }

  showDropdown2() {
    setTimeout(() => {
    this.academicDropdownOpen2 = true;
  }, 700);
  }

  showDropdown3() {
    setTimeout(() => {
    this.academicDropdownOpen3 = true;
  }, 700);
  }

  showDropdown4() {
    setTimeout(() => {
    this.academicDropdownOpen4 = true;
  }, 700);
  }

  showDropdown5() {
    setTimeout(() => {
    this.academicDropdownOpen5 = true;
  }, 700);
  }

  hideDropdown() {
    setTimeout(() => {
      this.academicDropdownOpen = false;
    }, 700);
  }

  hideDropdown2() {
    setTimeout(() => {
      this.academicDropdownOpen2 = false;
    }, 700);
  }

  hideDropdown3() {
    setTimeout(() => {
      this.academicDropdownOpen3 = false;
    }, 700);
  }

  hideDropdown4() {
    setTimeout(() => {
      this.academicDropdownOpen4 = false;
    }, 700);
  }

  hideDropdown5() {
    setTimeout(() => {
      this.academicDropdownOpen5 = false;
    }, 700);
  }
  
  @HostListener('window:click', ['$event'])
  onClick(event: Event) {
    this.handleInteraction(event, false);
  }

  @HostListener('window:touchend', ['$event'])
  onTouchEnd(event: Event) {
    setTimeout(() => {
      this.handleInteraction(event, true);
    }, 100);
  }

  handleInteraction(event: Event, isTouch: boolean) {
    const target = event.target as HTMLElement;
    const insideDropdown = target.closest('.dropdown, .dropdown2');
    const insideToggle = target.closest('.fa-bars');
    const insideMenuItem = target.closest('.menu_item');

    if (insideDropdown) {
      this.menuActive = true;
    } else if (insideMenuItem || !insideToggle) {
      this.menuActive = false;
    }
  }

  loadNotifications() {
    this.apiService.getNotifications().subscribe(
      data => {
        this.notifications = data.reverse();
        this.startMarquee();
      },
      error => {
        console.error('Error Fetching Notifications!');
      }
    );
  }

  startMarquee() {
    if (this.notifications.length > 0) {
      this.updateMarqueeMessage();
    }
  }

  updateMarqueeMessage() {
    const messageElement: HTMLElement = this.marqueeElement.nativeElement.querySelector('.msg');
    const lastTen = this.notifications.slice(-12);

    let notificationsHTML = '';
    for (let i = 0; i < lastTen.length; i++) {
      const currentIndex = (this.currentIndex + i) % this.notifications.length;
      const currentNotification = this.notifications[currentIndex];
      if(currentNotification.Link) {
        notificationsHTML += `<i class="fas fa-info-circle" style="
        background-color: seagreen;
        color: white;
        border: 2px dotted white;
        border-radius: 50%;
        padding: 1px;
        font-size: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center; "></i>&nbsp;&nbsp;<a href="${currentNotification.Link}" target="_blank" class="msg_link">${currentNotification.Text}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
      }
      else {
          notificationsHTML += `<i class="fas fa-info-circle" style="
          background-color: seagreen;
          color: white;
          border: 2px dotted white;
          border-radius: 50%;
          padding: 1px;
          font-size: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center; "></i>&nbsp;&nbsp;<a href="https://kbmcollege.edu.bd${currentNotification.Img}" target="_blank" class="msg_link">${currentNotification.Text}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;
      } 
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
      .marquee .msg {
        animation-play-state: running;
      }
      .marquee .msg:hover {
        animation-play-state: paused !important;
        cursor: pointer;
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

import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '..//../service/api.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.css']
})

export class AcademicComponent implements OnInit, AfterViewInit, OnDestroy {
  selectedDept: string | null = null;
  departmentNames: string[] = [];
  departmentDetails: any = {};
  filteredDepartment: any = null;
  observer!: IntersectionObserver;
  isImageModalOpen: boolean = false;
  isProfileModalOpen: boolean = false;
  fullImageSrc: string = '';
  fullProfileText: SafeHtml | undefined;
  zoomLevel: number = 1;
  isDragging: boolean = false;
  startX: number = 0;
  startY: number = 0;
  translateX: number = 0;
  translateY: number = 0;
  lastTranslateX: number = 0;
  lastTranslateY: number = 0;
  admissionEndDate: Date = new Date('2024-03-31T23:59:59'); // Replace with your admission ending date
  timeRemaining: any;
  currentMonthIndex: number = new Date().getMonth() - 1;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  currentYear: number = new Date().getFullYear();
  currentSlideIndex: number = 0;
  currentVideoSlideIndex: number = 0;
  currentIndex: number = 0;
  currentVideoIndex: number = 0;
  thumbnailContainerWidth: number = 0;
  videoThumbnailContainerWidth: number = 0;

  images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg', 'image11.jpg', 'image12.jpg', 'image13.jpg'];
  videos: string[] = ['./assets/videos/sample1.mp4', './assets/videos/sample2.mp4', './assets/videos/sample1.mp4', './assets/videos/sample2.mp4', './assets/videos/sample1.mp4', './assets/videos/sample2.mp4', './assets/videos/sample1.mp4', './assets/videos/sample2.mp4', './assets/videos/sample1.mp4', './assets/videos/sample2.mp4', './assets/videos/sample1.mp4', './assets/videos/sample2.mp4'];

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('imageSlideContainer') imageSlideContainer!: ElementRef;
  @ViewChild('videoSlideContainer') videoSlideContainer!: ElementRef;
  @ViewChild('calendarContainer', { static: false }) calendarContainer!: ElementRef;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private apiService: ApiService) { }

  currentSlide(index: number): void {
    this.showSlide(index);
    this.currentIndex = index;
  }

  currentVideoSlide(index: number): void {
    this.currentVideoIndex = index;
  }

  playNextVideo() {
    this.currentVideoIndex = (this.currentVideoIndex + 1) % this.videos.length;
  }

  playPreVideo() {
    this.currentVideoIndex = (this.currentVideoIndex - 1 + this.videos.length) % this.videos.length;
  }

  isImage(): boolean {
    return this.images.includes(this.images[this.currentIndex]);
  }

  isVideo(): boolean {
    return this.videos.includes(this.videos[this.currentIndex]);
  }

  startAutoScroll(): void {
    interval(7000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.currentSlide(nextIndex);
      });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const deptName = params['dept'];
      console.log("Received deptName from URL:", deptName);

      if (deptName) {
        this.selectedDept = deptName;
        this.loadDepartmentData(deptName);
      }
    });
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
    this.playVideo();
    this.calculateTimeRemaining();
    setTimeout(() => this.generateCalendar(), 0);
    setInterval(() => {
      this.calculateTimeRemaining();
    }, 1000);
    if (this.imageSlideContainer) {
      this.startAutoChange();
      this.showSlide(this.currentSlideIndex);
      this.thumbnailContainerWidth = this.imageSlideContainer.nativeElement.clientWidth;
      this.calculateThumbnailContainerWidthAfterViewInit();
    }
    if (this.videoSlideContainer) {
      this.startAutoChange();
      this.showSlide(this.currentVideoSlideIndex);
      this.videoThumbnailContainerWidth = this.videoSlideContainer.nativeElement.clientWidth;
      this.calculateThumbnailContainerWidthAfterViewInit();
    }
  }

  calculateThumbnailContainerWidthAfterViewInit(): void {
    this.thumbnailContainerWidth = this.imageSlideContainer.nativeElement.clientWidth;
  }

  calculateVideoThumbnailContainerWidthAfterViewInit(): void {
    this.videoThumbnailContainerWidth = this.videoSlideContainer.nativeElement.clientWidth;
  }
  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  startAutoChange() {
    setInterval(() => {
      this.nextImage();
    }, 7000);
  }

  showSlide(index: number): void {
    if (index < 0) {
      this.currentSlideIndex = this.images.length - 1;
    } else if (index >= this.images.length) {
      this.currentSlideIndex = 0;
    } else {
      this.currentSlideIndex = index;
    }
  }

  setupIntersectionObserver() {
    const options = {
      root: null, // relative to the viewport
      threshold: 0.5 // when 50% of the video is visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.playVideo();
        } else {
          this.pauseVideo();
        }
      });
    }, options);

    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.observer.observe(this.videoPlayer.nativeElement);
    }
  }

  playVideo() {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.play();
    }
  }

  pauseVideo() {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      this.videoPlayer.nativeElement.pause();
    }
  }
  playVideoIfVisible() {
    if (this.videoPlayer && this.videoPlayer.nativeElement) {
      const observerEntry = this.observer.takeRecords().find(entry => entry.target === this.videoPlayer.nativeElement);
      if (observerEntry && observerEntry.isIntersecting) {
        this.playVideo();
      }
    }
  }
  calculateTimeRemaining() {
    const currentDate = new Date();
    const timeDifference = this.admissionEndDate.getTime() - currentDate.getTime();

    if (timeDifference > 0) {
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);

      this.timeRemaining = {
        months: months % 12,
        days: days % 30,
        hours: hours % 24,
        minutes: minutes % 60
      };
    } else {
      this.timeRemaining = null; // Admission date has passed
    }
  }

  generateCalendar(): void {
    if (!this.calendarContainer) return;

    let calendarHtml = `<div class="month-wrapper" style="display: inline-flex; transition: transform 0.5s ease-in-out; column-gap: 10px;">`;
    for (let i = 0; i < 3; i++) {
      let totalMonths = this.currentMonthIndex + i;
      let year = this.currentYear + Math.floor(totalMonths / 12);
      let monthIndex = totalMonths % 12;

      let isCurrentMonth = monthIndex === new Date().getMonth() && year === new Date().getFullYear();
      let backgroundColor = isCurrentMonth ? 'rgba(0, 128, 128, 0.3)' : 'white';

      calendarHtml += `
          <div class="month" style="
          text-align: center;
          padding: 10px;
          border: 1px solid teal;
          background: ${backgroundColor};">
            <h3>${this.months[monthIndex]} ${year}</h3>
            ${this.generateMonthTable(monthIndex, year)}
          </div>`;
    }
    calendarHtml += `</div>`;

    this.calendarContainer.nativeElement.innerHTML = calendarHtml;
  }

  prevMonth(): void {
    if (this.currentYear > new Date().getFullYear() - 100 || this.currentMonthIndex > 0) {
      this.currentMonthIndex--;
      if (this.currentMonthIndex < 0) {
        this.currentMonthIndex = 11;
        this.currentYear--;
      }
      this.generateCalendar();
    }
  }

  nextMonth(): void {
    if (this.currentYear < new Date().getFullYear() + 100 || this.currentMonthIndex < 11) {
      this.currentMonthIndex++;
      if (this.currentMonthIndex > 11) {
        this.currentMonthIndex = 0;
        this.currentYear++;
      }
      this.generateCalendar();
    }
  }


  generateMonthTable(month: number, year: number): string {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    let today = new Date();
    let isCurrentMonth = month === today.getMonth() && year === today.getFullYear();
    let todayDate = today.getDate();

    let table = '<table style="height: 192px;"><tr>';
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    for (let day of weekDays) {
      table += `<th style="padding:3px;">${day}</th>`;
    }
    table += '</tr><tr>';

    for (let i = 0; i < firstDay; i++) {
      table += '<td></td>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
      let isToday = isCurrentMonth && day === todayDate;
      if ((firstDay + day - 1) % 7 === 0 && day !== 1) {
        table += '</tr><tr>';
      }
      table += `<td style="${isToday ? 'background: teal; border-radius: 50%; color: white;' : ''}">
          ${day}
      </td>`;
    }

    table += '</tr></table>';
    return table;
  }

  openModal() {
    this.fullImageSrc = "./assets/images/Collegemap.jpg";
    this.isImageModalOpen = true;
    this.zoomLevel = 1;
    this.resetPosition();
  }

  openModal2(event: Event): void {
    const element = event.currentTarget as HTMLElement;
    let profileDiv = element.previousElementSibling?.previousElementSibling;

    if (profileDiv && profileDiv.classList.contains('profile')) {
      const paragraph = profileDiv.querySelector('.profile-text');

      if (paragraph && paragraph.innerHTML) {
        this.fullProfileText = this.sanitizer.bypassSecurityTrustHtml(paragraph.innerHTML);
        this.isProfileModalOpen = true;
      } else {
        console.warn('No paragraph found inside profile-text');
      }
    } else {
      console.warn('Could not find profile container');
    }
  }



  closeModal() {
    this.isImageModalOpen = false;
  }
  closeModal2() {
    this.isProfileModalOpen = false;
  }
  zoomImage(event: WheelEvent) {
    event.preventDefault();
    const zoomSpeed = 0.1;
    const minZoom = 1;
    const maxZoom = 7;

    if (event.deltaY < 0) {
      this.zoomLevel = Math.min(this.zoomLevel + zoomSpeed, maxZoom);
    } else {
      this.zoomLevel = Math.max(this.zoomLevel - zoomSpeed, minZoom);
    }

    if (this.zoomLevel === 1) {
      this.resetPosition(); // Reset position when zoomed out completely
    }
  }

  startDragging(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.isDragging = true;

    if (event instanceof MouseEvent) {
      this.startX = event.clientX - this.lastTranslateX;
      this.startY = event.clientY - this.lastTranslateY;
    } else {
      this.startX = event.touches[0].clientX - this.lastTranslateX;
      this.startY = event.touches[0].clientY - this.lastTranslateY;
    }
  }

  dragImage(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;

    let clientX, clientY;
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }

    this.translateX = clientX - this.startX;
    this.translateY = clientY - this.startY;
  }

  stopDragging() {
    this.isDragging = false;
    this.lastTranslateX = this.translateX;
    this.lastTranslateY = this.translateY;
  }

  resetPosition() {
    this.translateX = 0;
    this.translateY = 0;
    this.lastTranslateX = 0;
    this.lastTranslateY = 0;
  }

  loadDepartmentData(deptName: string) {
    this.apiService.getDepartments(deptName).subscribe(
      data => {
        this.departmentDetails = data;
        console.log("Department Title:", this.departmentDetails);
      },
      error => {
        console.error("Department not found or server error:", error);
      }
    );
  }
}

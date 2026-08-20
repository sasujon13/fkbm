import { Component, OnInit, ElementRef, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '..//../service/api.service';
import { Subject } from 'rxjs';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

interface DepartmentImage {
  id: number;
  Img: string;
  Caption?: string | null;
}

interface PostImage {
  id: number;
  Img: string;
  Caption?: string | null;
}

interface ImageItem {
  Img: string;
  Caption?: string | null;
}

interface Videos {
  Title: string;
  Dept: string;
  Url: string;
  embedUrl?: SafeResourceUrl;
}

interface OtherPerson {
  Img: string;
  Name: string;
  Title: string | null;
  Gender: string;
  Designation: string;
  Deptartment: string;
  FName: string | null;
  MName: string | null;
  Joining: string | null;
  Mobile: string | null;
  Email: string | null;
  PreAddress: string;
  PerAddress: string;
  DOB: string | null;
  Order: number;
  Retirement: string | null;
  Comment: string | null;
  Org: string | null;
  Dept: number;
}

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.css']
})

export class AcademicComponent implements OnInit, OnDestroy {
  baseUrl = 'https://kbmcollege.edu.bd'
  selectedDept: string | null = null;
  departmentNames: string[] = [];
  departmentDetails: any = {};
  otherPeople: OtherPerson[] = [];
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
  currentMonthIndex: number = new Date().getMonth() - 1;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  currentYear: number = new Date().getFullYear();
  currentIndex: number = 0;
  currentVideoIndex: number = 0;
  postIndex: number[] = [];
  deptID: number = 0;
  posts: string[] = [];
  thumbnailContainerWidth: number = 0;
  searchKey: string = "";

  images: ImageItem[] = [];
  postImages: { Img: string; Caption?: string | null }[][] = [];
  videos: Videos[] = [];

  teachers: any[] = [];
  exTeachers: any[] = [];
  staffs: any[] = [];
  exStaffs: any[] = [];
  teacherHonours: any[] = [];
  otherPeoples: any[] = [];
  nonMpoStaffs: any[] = [];
  departments: any[] = [];

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('imageSlideContainer') imageSlideContainer!: ElementRef;
  @ViewChild('videoSlideContainer') videoSlideContainer!: ElementRef;
  @ViewChild('calendarContainer', { static: false }) calendarContainer!: ElementRef;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.startAutoChange();
    this.loadOtherPeople();
    this.loadVideo();
    this.apiService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    this.postIndex = this.postImages.map(() => 0);
    this.route.queryParams.subscribe(params => {
      const deptName = params['dept'];
      if (deptName) {
        this.selectedDept = deptName;
        this.loadDepartmentData(deptName);

        this.apiService.getDepts().subscribe(data => {
          this.departments = data;
        });

        this.apiService.getTeachers().subscribe((res: any[]) => {
          if (this.selectedDept) {
            this.teachers = res.filter(teacher => teacher.dept_name === this.selectedDept);
          } else {
            this.teachers = res;
          }
        },
          error => {
            console.error("teachers not found or server error:", error);
          });
        this.apiService.getExTeachers().subscribe((res: any[]) => {
          if (this.selectedDept) {
            this.exTeachers = res.filter(exTeacher => exTeacher.dept_name === this.selectedDept);
          } else {
            this.exTeachers = res;
          }
        },
          error => {
            console.error("exTeachers not found or server error:", error);
          });
        this.apiService.getStaffs().subscribe((res: any[]) => {
          if (this.selectedDept) {
            this.staffs = res.filter(staff => staff.dept_name === this.selectedDept);
          } else {
            this.staffs = res;
          }
        },
          error => {
            console.error("staffs not found or server error:", error);
          });
        this.apiService.getExStaffs().subscribe((res: any[]) => {
          if (this.selectedDept) {
            this.exStaffs = res.filter(exStaff => exStaff.dept_name === this.selectedDept);
          } else {
            this.exStaffs = res;
          }
        },
          error => {
            console.error("exStaffs not found or server error:", error);
          });
        this.apiService.getTeacherHonours().subscribe((res: any[]) => {
          if (this.selectedDept) {
            this.teacherHonours = res.filter(teacherHonour => teacherHonour.dept_name === this.selectedDept);
          } else {
            this.teacherHonours = res;
          }
        },
          error => {
            console.error("teacherHonours not found or server error:", error);
          });
        this.apiService.getNonMpoStaff().subscribe((res: any[]) => {
          if (this.selectedDept) {
            this.nonMpoStaffs = res.filter(nonMpoStaff => nonMpoStaff.dept_name === this.selectedDept);
          } else {
            this.nonMpoStaffs = res;
          }
        },
          error => {
            console.error("NonMpoStaff not found or server error:", error);
          });
      }
    });
  }

  startAutoChange() {
    setInterval(() => {
      this.nextImage();
      this.departmentDetails?.posts?.postDetails.forEach((_: any, postIndex: number) => {
        this.nextImage2(postIndex);
      });
    }, 7000);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.generateCalendar(), 0);
  }
  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevVideo() {
    if (this.currentVideoIndex > 0) {
      this.currentVideoIndex--;
    } else {
      this.currentVideoIndex = this.videos.length - 1;
    }
  }

  nextVideo() {
    if (this.currentVideoIndex < this.videos.length - 1) {
      this.currentVideoIndex++;
    } else {
      this.currentVideoIndex = 0;
    }
  }

  prevImage2(pi: number) {
    if (this.postIndex[pi] > 0) {
      this.postIndex[pi]--;
    } else {
      this.postIndex[pi] = this.postImages[pi].length - 1;
    }
  }

  nextImage2(pi: number) {
    if (this.postIndex[pi] < this.postImages[pi].length - 1) {
      this.postIndex[pi]++;
    } else {
      this.postIndex[pi] = 0;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.observer) {
      this.observer.disconnect();
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
    this.fullImageSrc = this.departmentDetails.Photo;
    this.isImageModalOpen = true;
    this.zoomLevel = 1;
    this.resetPosition();
  }

  openModalPhoto2() {
    this.fullImageSrc = this.departmentDetails.Photo2;
    this.isImageModalOpen = true;
    this.zoomLevel = 1;
    this.resetPosition();
  }

  openModalPhoto3() {
    this.fullImageSrc = this.departmentDetails.Photo3;
    this.isImageModalOpen = true;
    this.zoomLevel = 1;
    this.resetPosition();
  }

  openModalPhoto4() {
    this.fullImageSrc = this.departmentDetails.Photo4;
    this.isImageModalOpen = true;
    this.zoomLevel = 1;
    this.resetPosition();
  }

  openModalPhoto5() {
    this.fullImageSrc = this.departmentDetails.Photo5;
    this.isImageModalOpen = true;
    this.zoomLevel = 1;
    this.resetPosition();
  }

  openModalPhoto6() {
    this.fullImageSrc = this.departmentDetails.Photo6;
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
        this.cdr.detectChanges();
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
    try {
      this.apiService.getDepartments(deptName).subscribe(
        data => {
          this.departmentDetails = data;
          this.images = this.departmentDetails.images.map((imgObj: DepartmentImage) => ({
            Img: this.baseUrl + imgObj.Img,
            Caption: imgObj.Caption ?? null
          }))
          console.log("imgObj.Img:",this.images);
          this.deptID = this.departmentDetails.id;
          this.apiService.getPost(this.deptID).subscribe(
            postData => {
              this.departmentDetails.posts = postData;
              this.postImages = this.departmentDetails.posts.postDetails.map((post: { images: PostImage[] }) =>
                post.images.map((imgObj2: PostImage) => ({
                  Img: this.baseUrl + imgObj2.Img,
                  Caption: imgObj2.Caption ?? null
                }))
              );
            },
            error => {
              console.error("Post not found or server error:", error);
            }
          );
        },
        error => {
          console.error("Department not found or server error:", error);
        }
      );
    }
    catch { }
  }

  loadOtherPeople() {
    this.apiService.getOtherPeoples().subscribe(
      (data: any[]) => {
        this.otherPeople = data;
      },
      error => {
        console.error("Department not found or server error:", error);
      }
    );
  }

  loadVideo() {
    this.apiService.getVideos().subscribe((res: any[]) => {
      if (this.selectedDept) {
        this.videos = res.filter(video => video.dept_name === this.selectedDept);
      } else {
        this.videos = res;
      }
      this.videos.forEach(video => {
        video.embedUrl = this.getEmbedUrl(video.Url);
      });
    },
      error => {
        console.error("Videos not found or server error:", error);
      });
  }


  oadDepartmentData(deptName: string) {
    this.apiService.getDepartments(deptName).subscribe(
      data => {
        this.departmentDetails = data;
        this.images = this.departmentDetails.images.map((imgObj: DepartmentImage) => ({
          Img: this.baseUrl + imgObj.Img,
          Caption: imgObj.Caption ?? null
        }))
        this.deptID = this.departmentDetails.id;
        this.apiService.getPost(this.deptID).subscribe(
          postData => {
            this.departmentDetails.posts = postData;
            this.postImages = this.departmentDetails.posts.postDetails.map((post: { images: PostImage[] }) =>
              post.images.map((imgObj2: PostImage) => ({
                Img: this.baseUrl + imgObj2.Img,
                Caption: imgObj2.Caption ?? null
              }))
            );
          },
          error => {
            console.error("Post not found or server error:", error);
          }
        );
      },
      error => {
        console.error("Department not found or server error:", error);
      }
    );
  }

  getEmbedUrl(url: string): SafeResourceUrl {
    const videoId = this.getVideoId(url);
    const embed = `https://www.youtube.com/embed/${videoId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(embed);
  }

  getOtherPeople(order: number) {
    return this.otherPeople.filter(op => op.Order === order);
  }

  getVideoId(url: string): string {
    if (!url) return '';
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match && match[1] ? match[1] : '';
  }

  getDept(deptId: number): string {
    const dept = this.departments.find(department => department.id === deptId);
    return dept ? dept.Name : 'NA';
  }

  openedButtonElement?: HTMLElement;

  openModal3(event: Event): void {
    const button = event.currentTarget as HTMLElement;
    const wrapper = button.closest('.table-wrapper');

    if (wrapper) {
      const table = wrapper.querySelector('table');
      const detailsButton = wrapper.querySelector('button.details') as HTMLElement;

      if (table) {
        const hiddenRows = wrapper.querySelectorAll('tr.showHide');
        hiddenRows.forEach(row => {
          row.classList.add('visible');
        });
        const clonedTable = table.cloneNode(true) as HTMLElement;
        const buttonRow = clonedTable.querySelector('tr .viewButton')?.parentElement;
        if (buttonRow) {
          buttonRow.remove();
        }
        this.fullProfileText = this.sanitizer.bypassSecurityTrustHtml(clonedTable.outerHTML);
        this.isProfileModalOpen = true;

        if (detailsButton) {
          detailsButton.style.visibility = 'hidden';
          this.openedButtonElement = detailsButton;
        }
      }
    }
  }

  closeModal3(): void {
    this.isProfileModalOpen = false;
    const visibleRows = document.querySelectorAll('tr.showHide.visible');
    visibleRows.forEach(row => {
      row.classList.remove('visible');
    });

    if (this.openedButtonElement) {
      this.openedButtonElement.style.visibility = 'visible';
      this.openedButtonElement = undefined;
    }
  }
}

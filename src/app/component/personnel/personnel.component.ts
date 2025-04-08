import { Component, OnInit } from '@angular/core';
import { ApiService } from '..//../service/api.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {
  teachers: any[] = [];
  exTeachers: any[] = [];
  staffs: any[] = [];
  exStaffs: any[] = [];
  teacherHonours: any[] = [];
  otherPeoples: any[] = [];
  nonMpoStaffs: any[] = [];
  isProfileModalOpen: boolean = false;
  fullProfileText: SafeHtml | undefined;

  constructor(
    private teacherService: ApiService,
    private exTeacherService: ApiService,
    private staffService: ApiService,
    private exStaffService: ApiService,
    private teacherHonoursService: ApiService,
    private nonMpostaffService: ApiService,
    private otherPeopleService: ApiService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe(data => {
      this.teachers = data;
    });
    this.exTeacherService.getExTeachers().subscribe(data => {
      this.exTeachers = data;
    });
    this.staffService.getStaffs().subscribe(data => {
      this.staffs = data;
    });
    this.exStaffService.getExStaffs().subscribe(data => {
      this.exStaffs = data;
    });
    this.teacherHonoursService.getTeacherHonours().subscribe(data => {
      this.teacherHonours = data;
    });
    this.otherPeopleService.getOtherPeoples().subscribe(data => {
      this.otherPeoples = data;
    });
    this.nonMpostaffService.getNonMpoStaff().subscribe(data => {
      this.nonMpoStaffs = data;
    });
  }

  openedButtonElement?: HTMLElement;

  openModal(event: Event): void {
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

  closeModal(): void {
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

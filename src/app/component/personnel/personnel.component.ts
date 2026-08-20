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
  searchKey: string = "";
  departments: any[] = [];

  constructor(
    private apiService: ApiService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.apiService.getDepts().subscribe(data => {
      this.departments = data;
    });
    this.apiService.getTeachers().subscribe(data => {
      this.teachers = data;
    });
    this.apiService.getExTeachers().subscribe(data => {
      this.exTeachers = data;
    });
    this.apiService.getStaffs().subscribe(data => {
      this.staffs = data;
    });
    this.apiService.getExStaffs().subscribe(data => {
      this.exStaffs = data;
    });
    this.apiService.getTeacherHonours().subscribe(data => {
      this.teacherHonours = data;
    });
    this.apiService.getOtherPeoples().subscribe(data => {
      this.otherPeoples = data;
    });
    this.apiService.getNonMpoStaff().subscribe(data => {
      this.nonMpoStaffs = data;
    });
    this.apiService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
  getDept(deptId: number): string {
    const dept = this.departments.find(department => department.id === deptId);
    return dept ? dept.Name : 'NA';
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

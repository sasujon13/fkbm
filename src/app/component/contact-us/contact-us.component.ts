import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from '..//../service/api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{
  public teachers: any[] = [];
  public oneTeachers: any[] = [];
  public oneTeachers2: any[] = [];
  public oneTeachers3: any[] = [];
  public oneTeachers4: any[] = [];
  public teacherHonours: any[] = [];
  public otherPeoples: any[] = [];
  public staffs: any[] = [];
  public depts: any[] = [];
  searchKey: string = "";
  alertMessage = '';
  showAlert = false;
  selectedDept: string = '';
  uniqueDepts: string[] = [];
  constructor(private apiService: ApiService){}
  ngOnInit(): void {
    this.apiService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    this.getTeachers()
    this.getTeacherHonours()
    this.getStaffs()
    this.getOtherPeoples()
    this.getOneTeachers()
  }

  copyNumber(data: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = data;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    navigator.clipboard.writeText(data).then(() => {
    this.showCopyAlert('Copied to clipboard!');
  });
  }

  getTeachers() {
    this.apiService.getTeachers().subscribe(
      data => {
        this.teachers = data;
        this.teachers.sort((a, b) => a.Order - b.Order);
      },
      error => {
        console.error('Error fetching teachers!');
      }
    );
  }

  getOneTeachers() {
    forkJoin({
      mpo: this.apiService.getTeachers(),
      honours: this.apiService.getTeacherHonours(),
      staffs: this.apiService.getStaffs(),
      nonMpo: this.apiService.getNonMpoStaff()
    }).subscribe(
      ({ mpo, honours, staffs, nonMpo }) => {
        // Merge all teachers/staffs into one array
        this.oneTeachers = [...mpo, ...honours, ...staffs, ...nonMpo];
  
        // Generate unique dept list from merged data
        this.uniqueDepts = [...new Set(this.oneTeachers.map(t => t.dept_name))];
  
        // Set default dept if none selected
        if (!this.selectedDept && this.uniqueDepts.length > 0) {
          this.selectedDept = this.uniqueDepts[0];
        }
      },
      error => {
        console.error('Error fetching data!', error);
      }
    );
  }
  

  getTeacherHonours() {
    this.apiService.getTeacherHonours().subscribe(
      data => {
        this.teacherHonours = data;
        this.teacherHonours.sort((a, b) => a.Order - b.Order);
      },
      error => {
        console.error('Error fetching teacherHonours!');
      }
    );
  }

  getStaffs() {
    this.apiService.getStaffs().subscribe(
      data => {
        this.staffs = data;
        this.staffs.sort((a, b) => a.Order - b.Order);
      },
      error => {
        console.error('Error fetching staffs!');
      }
    );
  }

  getOtherPeoples() {
    this.apiService.getOtherPeoples().subscribe(
      data => {
        this.otherPeoples = data;
        this.otherPeoples.sort((a, b) => a.Order - b.Order);
      },
      error => {
        console.error('Error fetching otherPeoples!');
      }
    );
  }

showCopyAlert(message: string) {
  this.alertMessage = message;
  this.showAlert = true;

  setTimeout(() => {
    this.showAlert = false;
  }, 800); // 1.5 seconds
}
}


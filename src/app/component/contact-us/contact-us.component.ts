import { Component, OnInit } from '@angular/core';
import { ApiService } from '..//../service/api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{
  public teachers: any[] = [];
  public teacherHonours: any[] = [];
  public otherPeoples: any[] = [];
  public staffs: any[] = [];
  public depts: any[] = [];
  alertMessage = '';
  showAlert = false;
  constructor(private apiService: ApiService){}
  ngOnInit(): void {
    this.getTeachers()
    this.getTeacherHonours()
    this.getStaffs()
    this.getOtherPeoples()
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


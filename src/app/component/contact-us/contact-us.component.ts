import { Component, OnInit } from '@angular/core';
import { ApiService } from '..//../service/api.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{
  public teachers: any[] = [];
  alertMessage = '';
showAlert = false;
  constructor(private apiService: ApiService){}
  ngOnInit(): void {
    this.getTeachers()
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
      },
      error => {
        console.error('Error fetching teachers!');
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


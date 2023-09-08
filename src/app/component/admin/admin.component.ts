import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  ngOnInit(): void {
    // window.location.replace("http://127.0.0.1:8000/api/admin");
    window.location.href = "http://127.0.0.1:8000/api/admin";
    
  }
}
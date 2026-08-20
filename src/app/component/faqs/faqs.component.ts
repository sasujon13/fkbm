import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit {
  baseUrl = 'https://kbmcollege.edu.bd';
  results: any[] = [];
  isImageModalOpen: boolean = false;
  fullImageSrc: string = '';
  zoomLevel: number = 1;

  isDragging: boolean = false;
  startX: number = 0;
  startY: number = 0;
  translateX: number = 0;
  translateY: number = 0;
  lastTranslateX: number = 0;
  lastTranslateY: number = 0;

  searchKey: string = "";

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getResult().subscribe(data => {
      this.results = data;
    });
  }

  openModal(imgPath: string): void {
    this.fullImageSrc = this.baseUrl + imgPath;
    this.isImageModalOpen = true;
    this.zoomLevel = 1;
    this.resetPosition();
  }

  closeModal(): void {
    this.isImageModalOpen = false;
  }

  zoomImage(event: WheelEvent): void {
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
      this.resetPosition();
    }
  }

  startDragging(event: MouseEvent | TouchEvent): void {
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

  dragImage(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;

    let clientX: number;
    let clientY: number;

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

  stopDragging(): void {
    this.isDragging = false;
    this.lastTranslateX = this.translateX;
    this.lastTranslateY = this.translateY;
  }

  resetPosition(): void {
    this.translateX = 0;
    this.translateY = 0;
    this.lastTranslateX = 0;
    this.lastTranslateY = 0;
  }
  
  downloadImage(url: string) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.download = url.split('/').pop() || 'image.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } 
}


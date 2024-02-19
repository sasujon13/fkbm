import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, Renderer2 } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition('void => *', [
        style({ transform: 'translateX(100%)' }),
        animate('3s ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition('* => void', [
        animate('3s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('imageSlideContainer') imageSlideContainer!: ElementRef;
  currentSlideIndex: number = 0;
  currentIndex: number = 0;
  thumbnailContainerWidth: number = 0;
  translateX: number = 0;
  images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg']; // Add more image URLs as needed
  video: string = 'sample.mp4';

  private destroy$: Subject<void> = new Subject<void>();
  
  constructor(private renderer: Renderer2) { }

  currentSlide(index: number): void {
    this.showSlide(index);
    this.currentIndex = index;
  }

  ngAfterViewInit(): void {
    this.thumbnailContainerWidth = this.imageSlideContainer.nativeElement.clientWidth;
    this.calculateThumbnailContainerWidthAfterViewInit();
  }

  calculateThumbnailContainerWidthOnInit(): void {
    this.thumbnailContainerWidth = this.imageSlideContainer.nativeElement.clientWidth;
  }

  calculateThumbnailContainerWidthAfterViewInit(): void {
    this.thumbnailContainerWidth = this.imageSlideContainer.nativeElement.clientWidth;
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  ngOnInit(): void {
    this.startAutoChange();
    this.showSlide(this.currentSlideIndex);
    this.calculateThumbnailContainerWidthOnInit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  playNextVideo(): void {
  }

}

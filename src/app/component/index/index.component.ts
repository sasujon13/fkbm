import { Component, ElementRef, ViewChild, OnDestroy, Renderer2, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) {}

  @ViewChild('imageSlideContainer') imageSlideContainer!: ElementRef;
  currentSlideIndex: number = 0;
  currentIndex: number = 0;
  thumbnailContainerWidth: number = 0;
  translateX: number = 0;
  images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg'];
  video: string = 'sample.mp4';

  private destroy$: Subject<void> = new Subject<void>();

  currentSlide(index: number): void {
    this.showSlide(index);
    this.currentIndex = index;
  }

  
  ngOnInit(): void {
    if (this.imageSlideContainer) {
      this.showSlide(this.currentSlideIndex);
      this.thumbnailContainerWidth = this.imageSlideContainer.nativeElement.clientWidth;
      this.calculateThumbnailContainerWidthOnInit();
      this.calculateThumbnailContainerWidthAfterViewInit();
      this.startAutoChange();
    }
  }

  calculateThumbnailContainerWidthOnInit(): void {
    if (this.imageSlideContainer) {
      this.thumbnailContainerWidth = this.renderer.selectRootElement(this.imageSlideContainer.nativeElement).clientWidth;
    }
  }

  calculateThumbnailContainerWidthAfterViewInit(): void {
    this.thumbnailContainerWidth = this.renderer.selectRootElement(this.imageSlideContainer.nativeElement).clientWidth;
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
  }

  startAutoChange() {
    interval(7000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      });
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

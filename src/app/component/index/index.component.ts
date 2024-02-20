import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements AfterViewInit, OnDestroy {
  @ViewChild('imageSlideContainer') imageSlideContainer!: ElementRef;
  currentSlideIndex: number = 0;
  currentIndex: number = 0;
  thumbnailContainerWidth: number = 0;
  images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg'];
  video: string = './assets/admission.mp4';

  private destroy$: Subject<void> = new Subject<void>();

  currentSlide(index: number): void {
    this.showSlide(index);
    this.currentIndex = index;
  }

  startAutoScroll(): void {
    interval(7000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.currentSlide(nextIndex);
      });
  }

  ngAfterViewInit(): void {
    if (this.imageSlideContainer) {
      this.startAutoChange();
      this.showSlide(this.currentSlideIndex);
      this.thumbnailContainerWidth = this.imageSlideContainer.nativeElement.clientWidth;
      this.calculateThumbnailContainerWidthAfterViewInit();
    }
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

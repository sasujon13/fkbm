import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
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
  rotateThumbnails: boolean = false;
  images: string[] = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg', 'image11.jpg', 'image12.jpg']; // Add more image URLs as needed
  video: string = 'sample.mp4';
  currentIndex: number = 0;

  thumbnailContainerWidth: number = 0;

// translateX: number = 0;

// currentSlide(index: number): void {
//   this.showSlide(index);
//   this.currentIndex = index;

//   const totalThumbnails = this.images.length;
//   const thumbnailWidth = 100; 

//   const newOrder = Array.from({ length: totalThumbnails }, (_, i) => {
//     const distance = (i - this.currentIndex + totalThumbnails) % totalThumbnails;
//     return (this.currentIndex + distance) % totalThumbnails;
//   });

//   const currentIndexInNewOrder = newOrder.indexOf(this.currentIndex);

//   const distance = thumbnailWidth * (Math.floor(totalThumbnails / 2) - currentIndexInNewOrder);

//   this.translateX = distance;
// }
translateX: number = 0;

  // Subject to track component destruction
  private destroy$: Subject<void> = new Subject<void>();

  currentSlide(index: number): void {
    this.showSlide(index);
    this.currentIndex = index;

    // Calculate translation distance as before
    const totalThumbnails = this.images.length;
    const thumbnailWidth = 100;
    const newOrder = Array.from({ length: totalThumbnails }, (_, i) => {
      const distance = (i - this.currentIndex + totalThumbnails) % totalThumbnails;
      return (this.currentIndex + distance) % totalThumbnails;
    });
    const rotatedOrder = newOrder.map((_, i) => newOrder[(i + this.currentIndex) % totalThumbnails]);
    const currentIndexInRotatedOrder = rotatedOrder.indexOf(this.currentIndex);
    const distance = thumbnailWidth * (Math.floor(totalThumbnails / 2) - currentIndexInRotatedOrder);

    // Update the translateX value
    this.translateX = distance;
  }

  startAutoScroll(): void {
    // Auto-scroll every 5 seconds (adjust the interval as needed)
    interval(5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        // Move to the next slide
        const nextIndex = (this.currentIndex + 1) % this.images.length;
        this.currentSlide(nextIndex);
      });
  }
  
  ngAfterViewInit(): void {
    // Calculate the width of the image slide container after the view has been initialized
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
    this.rotateThumbnails = !this.rotateThumbnails;
    this.startAutoScroll();
  }
  ngOnDestroy(): void {
    // Unsubscribe from the interval when the component is destroyed
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

  // currentSlide(index: number): void {
  //   this.showSlide(index);
  //   this.currentIndex = index;
  // }

  playNextVideo(): void {
  }

}

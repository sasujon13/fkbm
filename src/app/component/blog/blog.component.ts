import { Component, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) { }
  
  ngOnInit(): void {
    this.applyMargin();
    document.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });
  }
  
  @HostListener('window:resize')
  onWindowResize() {
    this.applyMargin();
  }
  
  private applyMargin() {
    const screenWidth = window.innerWidth;
    let marginLeft: number | string = "auto";
    
    if (screenWidth < 1024 && screenWidth > 649) {
      marginLeft = ((screenWidth - 1024) / 2) + "px";
      
      const noteBgElements = this.el.nativeElement.querySelectorAll('.notebg');
      noteBgElements.forEach((element: HTMLElement) => {
        this.renderer.setStyle(element, 'margin-left', marginLeft);
      });
    }
  }
}

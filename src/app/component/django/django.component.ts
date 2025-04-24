import { Component, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-django',
  templateUrl: './django.component.html',
  styleUrls: ['./django.component.css']
})
export class DjangoComponent {
  iframeSrc: SafeResourceUrl;
  isLoading = true;


  ngOnInit() {
    this.loadIframe();
    const messageElement: HTMLElement | null = document.querySelector('.msg');
    if (messageElement) {
      this.renderer.setStyle(messageElement, 'display', 'none');
    }
  }
  ngOnDestroy() {
    const messageElement: HTMLElement | null = document.querySelector('.msg');
    if (messageElement) {
      this.renderer.removeStyle(messageElement, 'display');
    }
  }

  loadIframe() {
    this.isLoading = true;
  }

  onIframeLoad() {
    this.isLoading = false;
  }
  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('http://127.0.0.1:8000/admin');
  }
}


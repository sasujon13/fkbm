import { Component, Renderer2 } from '@angular/core';
import { ApiService } from '..//../service/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-django',
  templateUrl: './django.component.html',
  styleUrls: ['./django.component.css']
})
export class DjangoComponent {
  iframeSrc: SafeResourceUrl;
  isLoading = true;
  searchKey: string = "";


  ngOnInit() {
    this.apiService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
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
  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2, private apiService: ApiService,) {
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://kbmcollege.edu.bd/api/admin');
  }
}


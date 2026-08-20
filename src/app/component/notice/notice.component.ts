import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '..//../service/api.service';
import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent {
  iframeSrc: SafeResourceUrl;
  isLoading = true;
  searchKey: string = "";

  ngOnInit() {
    this.loadIframe();
    this.apiService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
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
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://kbmcollege.edu.bd/api/open-admin/kbm/notice/');
  }
}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})
export class FaqsComponent implements OnInit{
  iframeSrc: SafeResourceUrl;
  isLoading = true;

  ngOnInit() {
    this.loadIframe();
  }

  loadIframe() {
    this.isLoading = true;
  }

  onIframeLoad() {
    this.isLoading = false;
  }
  constructor(private sanitizer: DomSanitizer) {
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('http://127.0.0.1:8000/open-admin/kbm/notification/');
  }
}

import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '..//../service/api.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent {
  @ViewChild('djangoDiv') djangoDiv!: ElementRef;
  iframeSrc: SafeResourceUrl;
  isLoading = true;
  showDjango = true;
  searchKey: string = "";


  ngOnInit() {
    this.apiService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    this.loadIframe();
  }

  loadIframe() {
    this.isLoading = true;
  }

  onIframeLoad() {
    this.isLoading = false;
  }
  
  iframeClicked() {
    this.showDjango = false;
  }
  
  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2, private apiService: ApiService,) {
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://school.shebashikkha.com/login');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.djangoDiv?.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showDjango = false;
    }
  }
}

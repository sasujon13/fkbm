import { Component } from '@angular/core';
import { ApiService } from '..//../service/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})

export class AdmissionComponent {
  iframeSrc: SafeResourceUrl;
  isLoading = true;
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
  constructor(private sanitizer: DomSanitizer, private apiService: ApiService,) {
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.studentsheba.com/login');
  }
}

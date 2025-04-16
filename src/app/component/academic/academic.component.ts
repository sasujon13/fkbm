import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '..//../service/api.service';

@Component({
  selector: 'app-academic',
  templateUrl: './academic.component.html',
  styleUrls: ['./academic.component.css']
})

export class AcademicComponent implements OnInit {
  selectedDept: string | null = null;
  departmentNames: string[] = [];
  departmentDetails: any[] = [];
  filteredDepartment: any = null;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const deptName = params['dept'];
      console.log("Received deptName from URL:", deptName);
  
      if (deptName) {
        this.selectedDept = deptName;
        this.loadDepartmentData(deptName);
      }
    });
    // Get selected department from route
    // this.selectedDept = this.route.snapshot.paramMap.get('dept');
    // console.log("Selected Department:", this.selectedDept);

    // // Fetch department list
    // this.apiService.getDepartments(this.selectedDept || 'DefaultDept').subscribe(data => {
    //   this.departments = data;

    //   // Extract unique names
    //   this.departmentNames = [...new Set(data.map((t: any) => t.Name))];

    //   // Now filter the department by selectedDept
    //   if (this.selectedDept && this.departmentNames.includes(this.selectedDept)) {
    //     this.filteredDepartment = this.departments.find(
    //       (dept: any) => dept.Name === this.selectedDept
    //     );
    //     console.log("Filtered Department Data:", this.filteredDepartment);
    //   }
    // });
  }
  loadDepartmentData(deptName: string) {
    this.apiService.getDepartments(deptName).subscribe(
      data => {
        this.departmentDetails = data;
      },
      error => {
        console.error("Department not found or server error:", error);
      }
    );
  }
  
}

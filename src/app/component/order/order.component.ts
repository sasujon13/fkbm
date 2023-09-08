import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @ViewChild('consoleOutput') consoleOutput: ElementRef | undefined;
  orderDetails: any[] = [];
  transaction: any[] = [];
  jsonData: any = {
    division: '',
    district: '',
    thana: '',
    paymentMethod: ''
  };
  divisions: string[] = [];
  districts: string[] = [];
  thanas: string[] = [];
  division: string = '';
  district: string = ''; 
  thana: string = '';
  paymentMethod: string = '';
  username: any;
  altMobileNo: any;
  fullName: any;
  gender: any;
  union: any;
  village: any;
  trxid: any;
  paidFrom: any;
  Paid: any;

  public products : any = [];
  public grandTotal !: number;
  public grandDiscount !: number;
  constructor(
    private apiService: ApiService, 
    private cartService : CartService, 
    private router: Router,
    private snackBar: MatSnackBar,
    ) { }
  ngOnInit(): void {
    document.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });
    this.username = localStorage.getItem('username');
    this.jsonData.username = this.username;
    this.fullName = localStorage.getItem('fullName');
    this.jsonData.fullName = this.fullName;
    this.gender = localStorage.getItem('gender');
    this.jsonData.gender = this.gender;
    this.union = localStorage.getItem('union');
    this.jsonData.union = this.union;
    this.village = localStorage.getItem('village');
    this.jsonData.village = this.village;
    this.fetchDivisions();
    this.apiService.getDivisions().subscribe(divisions => {
      this.divisions = divisions;
    });
    this.cartService.getCartProducts()
    .subscribe((res: any)=>{
      this.products = res;
      this.grandTotal = this.cartService.grandTotal();
      this.grandDiscount = this.cartService.grandDiscount();
      this.jsonData.orderDetails = this.products.map((product: any, index: number) => {
        return {
          SN: index + 1,
          Name: `${product.name} - ${product.code} (${product.bangla_name})`,
          Image: product.image,
          Weight: `${product.weight}`,
          Price: `${this.productPrice(product)}`,
          Quantity: product.quantity,
          Discount: this.savedPrice(product),
          Total: this.totalPrice(product),
          GrandTotal: `${this.cartService.grandTotal()}`,
          Paid: `1`,
          Due: `1`,
        };
      });
    });
    
  }
  removeCartItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  increaseQuantity(item: any) {
    this.cartService.changeQuantity(item.id, 1);
    this.grandTotal = this.cartService.grandTotal();
    this.grandDiscount = this.cartService.grandDiscount();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.cartService.changeQuantity(item.id, -1);
      this.grandTotal = this.cartService.grandTotal();
      this.grandDiscount = this.cartService.grandDiscount();
    }
  }
  savedPrice(item: any): number {
    return Math.ceil(item.quantity * (item.weight * item.price * 100 / (100 - item.discount) - (item.weight * item.price)));
  }
  
  totalPrice(item: any): number {
    return Math.ceil(item.weight * item.quantity * item.price);
  }
  productPrice(item: any): number {
    return Math.ceil(item.weight * item.price * 100 / (100 - item.discount));
  }
  productPrice2(item: any): number {
    return Math.ceil(item.price * 100 / (100 - item.discount));
  }
 
  onDivisionChange(): void {
    this.apiService.getDistricts(this.jsonData.division).subscribe(districts => {
      this.districts = districts;
      this.district = ''; 
    });
  }

  onDistrictChange(): void {
    this.apiService.getThanas(this.jsonData.division, this.jsonData.district).subscribe(thanas => {
      this.thanas = thanas;
    });
  }

  fetchDivisions() {
    this.apiService.getDivisions().subscribe(
      (data: string[]) => {
        this.divisions = data; 
      },
      error => {
        console.error('Error fetching divisions:', error);
      }
    );
  }
  fetchDistricts() {
    if (this.division) {
      this.apiService.getDistricts(this.division).subscribe(
        (data: string[]) => {
          this.districts = data;
        },
        error => {
          console.error('Error fetching districts:', error);
        }
      );
    }
  }
  
  fetchThanas() {
    if (this.division && this.district) {
      this.apiService.getThanas(this.division, this.district).subscribe(
        (data: string[]) => {
          this.thanas = data;
        },
        error => {
          console.error('Error fetching thanas:', error);
        }
      );
    }
  }
  saveJsonData() {
    const jsonDataString = JSON.stringify(this.jsonData);
    localStorage.setItem(this.username, jsonDataString);
    this.apiService.saveJsonData(jsonDataString).subscribe(
      (response) => {
        console.log('JSON data saved:', response);
        this.handleResponse(response);
      },
      (error) => {
        console.error('Error saving JSON data:', error);
        this.handleResponse(error);
      }
    );
  }

  handleResponse(response: any) {

    if (this.consoleOutput) {
      const consoleOutputDiv = this.consoleOutput.nativeElement;
      consoleOutputDiv.textContent = '';
    }
    const formattedMessage = this.formatResponseMessage(response);

    // Append the formatted console output message
    if (this.consoleOutput) {
      const consoleOutputDiv = this.consoleOutput.nativeElement;
      consoleOutputDiv.textContent = formattedMessage;
    }
  }

  // Function to format the response message
  formatResponseMessage(response: any): string {
    let formattedMessage = JSON.stringify(response);
    
    // Remove curly braces {}
    formattedMessage = formattedMessage.replace(/[{()}]/g, '');

    // Remove "error:" and "message:"
    formattedMessage = formattedMessage.replace(/"error":/g, '');
    formattedMessage = formattedMessage.replace(/"message":/g, '');

    // Trim leading and trailing whitespace
    formattedMessage = formattedMessage.trim();
    if (formattedMessage.includes("Order Created Successfully")){
      this.snackBar.open('Order Created Successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'],
      });
      this.router.navigate(['/products']);
    }
    return formattedMessage;
  }

}

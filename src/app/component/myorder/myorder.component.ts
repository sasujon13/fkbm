import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-order',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {
  orders: any[] = []; // Replace with your array of orders
  displayedOrders: any[] = [];
  displayOrderCount = 10; // Initial number of orders to display
  showMoreButton = false;
  username: any
  fullName: any
  constructor(private apiService: ApiService,) { }
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.fullName = localStorage.getItem('fullName');
    this.loadData();
    this.updateDisplayedOrders();
    const searchBarElement = document.getElementById('searchBar');
    if (searchBarElement) {
      searchBarElement.style.display = 'none';
    }
    document.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });
  }
  loadData() {
    this.apiService.myorder(this.username).subscribe(
      (response) => {
        this.orders = response;
      },
      (error) => {
      }
    );
    this.updateDisplayedOrders();
  }

  updateDisplayedOrders() {
    // Slice the 'orders' array to get a portion of orders to display
    this.displayedOrders = this.orders.slice(0, this.displayOrderCount);

    // Show the "Show More" button if there are more orders to display
    this.showMoreButton = this.displayOrderCount < this.orders.length;
  }

  showMoreOrders() {
    // Increase the number of displayed orders by 10 or the remaining orders if less than 10
    this.displayOrderCount += 10;
    if (this.displayOrderCount > this.orders.length) {
      this.displayOrderCount = this.orders.length;
    }
    this.updateDisplayedOrders();
  }
  fullName2(){
    const name = this.fullName;
    return name;
  }
  getTotalOrderCount(): number {
    return this.orders.length;
  }
  calculateSubTotal(order: any) {
    let subTotal = 0;
    let price = 0;
    let quantity = 0;
    let total = 0;
    for (const od of order.orderDetails) {
      price = Number(od.Price);
      quantity = Number(od.Quantity);
      total = price * quantity
      subTotal += total
    }
    return subTotal;
  }
  calculateDiscount(order: any) {
    let discount = 0;
    for (const od of order.orderDetails) {
      discount += Number(od.Discount);
    }
    return discount;
  }
  calculateDue(order: any) {
    let TotalProductPrice = 0;
    let shipingCost = 0;
    let grandTotal = 0;
    let due = 0;
    let paid = 0;
    for (const od of order.orderDetails) {
      TotalProductPrice = Number(od.GrandTotal);
      // shipingCost = Number(od.ShipingCost);
      shipingCost = Number('100');
      paid = Number(od.Paid);
    }
    grandTotal = TotalProductPrice + shipingCost
    due = grandTotal - paid
    return due;
  }
  parseAndSum(value1: any, value2: any) {
    // Convert the values to numbers and sum them
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    return num1 + num2;
  }
  downloadAllAsPDF() {
    const element = document.getElementById('your-table-id'); // Replace with the actual ID of your HTML content
    
    if (element) {
      const pdf = new jspdf.jsPDF();
  
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // Width of the PDF in mm (A4 size)
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('table.pdf');
      });
    } else {
      console.error('Element not found'); // Handle the case where the element is not found
    }
  }

downloadAsPDF(i: Number) {
  const element = document.querySelector(`#order-${i}`) as HTMLElement;
  console.log('element:',element);

  if (element) {
    const pdf = new jspdf.jsPDF();

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // Width of the PDF in mm (A4 size)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const filename = `Order${Number(i) + 1}.pdf`;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(filename); // Save the PDF with the dynamically generated filename
    });
  } else {
    console.error('Element not found'); // Handle the case where the element is not found
  }
}
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any[] = [];
  // public productList = new BehaviorSubject<any>([]);
  public cartProductList = new BehaviorSubject<any>([]);  //added
  public choiceProductList = new BehaviorSubject<any>([]); //added
  public search = new BehaviorSubject<string>("");

  constructor() {
    this.loadCartFromStorage();
  }

  getCartProducts() {
    return this.cartProductList.asObservable();
  }

  getChoiceProducts() {
    return this.cartProductList.asObservable();
  }

  setCartProduct(product: any) {
    this.cartItemList.push(...product);
    this.updateCartAndStorage();
  }

  addtocart(product: any) {
    this.cartItemList.push(product);
    this.updateCartAndStorage();
    this.grandTotal();
  }

  grandTotal(): number {
    let grandTotal = 0;
    this.cartItemList.forEach((a: any) => {
      grandTotal += a.total * a.quantity * a.weight;
    });
    return Math.ceil(grandTotal);
  }
  grandDiscount(): number {
    let grandDiscount = 0;
    this.cartItemList.forEach((a: any) => {
      grandDiscount += (a.total / ((100 - a.discount) / 100)) * a.quantity * a.weight;
    });
    return Math.ceil(grandDiscount);
  }

  removeCartItem(product: any) {
    this.cartItemList = this.cartItemList.filter((a: any) => product.id !== a.id);
    this.updateCartAndStorage();
    localStorage.setItem(`cartState_${product.id}`, 'false');
  }

  removeAllCart() {
    this.cartItemList.forEach(item => {
      console.log(item)
      localStorage.setItem(`cartState_${item.id}`, 'false');
    });
    this.cartItemList = [];
    this.updateCartAndStorage();
  }
  

  private updateCartAndStorage() {
    this.cartProductList.next(this.cartItemList);
    sessionStorage.setItem('sessionCartItems', JSON.stringify(this.cartItemList));
  }

  private loadCartFromStorage() {
    const storedCartItems = JSON.parse(sessionStorage.getItem('sessionCartItems') || '[]');
    this.cartItemList = storedCartItems;
    this.cartProductList.next(this.cartItemList);
  }
  changeQuantity(productId: number, change: number) {
    const item = this.cartItemList.find(item => item.id === productId);
    if (item) {
      item.quantity += change;
      this.totalPrice();
    }
  }
  totalPrice() {
    let totalPrice = 0;
    this.cartItemList.forEach(item => {
      totalPrice += item.quantity * item.price;
    });
    return totalPrice;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {

  public choiceItemList: any[] = [];
  public choiceProductList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() {
    this.loadChoiceFromStorage();
  }

  getChoiceProducts() {
    return this.choiceProductList.asObservable();
  }

  setchoiceProduct(product: any) {
    this.choiceItemList.push(...product);
    this.updateChoiceAndStorage();
  }

  addtochoice(product: any) {
    this.choiceItemList.push(product);
    this.updateChoiceAndStorage();
  }

  removeChoiceItem(product: any) {
    this.choiceItemList = this.choiceItemList.filter((a: any) => product.id !== a.id);
    this.updateChoiceAndStorage();
    localStorage.setItem(`choiceState_${product.id}`, 'false');
  }

  removeAllChoice() {
    this.choiceItemList.forEach(item => {
      console.log(item)
      localStorage.setItem(`choiceState_${item.id}`, 'false');
    });
    this.choiceItemList = [];
    this.updateChoiceAndStorage();
  }

  private updateChoiceAndStorage() {
    this.choiceProductList.next(this.choiceItemList);
    sessionStorage.setItem('sessionChoiceItems', JSON.stringify(this.choiceItemList));
  }

  private loadChoiceFromStorage() {
    const storedChoiceItems = JSON.parse(sessionStorage.getItem('sessionChoiceItems') || '[]');
    this.choiceItemList = storedChoiceItems;
    this.choiceProductList.next(this.choiceItemList);
  }
}
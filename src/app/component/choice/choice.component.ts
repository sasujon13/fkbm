import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ChoiceService } from 'src/app/service/choice.service';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent implements OnInit {
  showCard: boolean = true;
  showChoice: boolean = true;
  public productList: any;
  public cartProductList: any;
  public choiceProductList: any;
  public filterCategory: any;
  searchKey: string = "";
  
    SIZE = [
      { label: 'All', value: '' },
      { label: 'XXL', value: 'XXL' },
      { label: 'XL', value: 'XL' },
      { label: 'L', value: 'L' },
      { label: 'M', value: 'M' },
      { label: 'S', value: 'S' },
      { label: 'XS', value: 'XS' }
    ];
    constructor(private cartService: CartService, private choiceService: ChoiceService) { }
    ngOnInit(): void {
    document.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });
      this.choiceService.getChoiceProducts()
        .subscribe(res => {
          this.productList = res;
          this.cartProductList = res;
          this.choiceProductList = res;
          this.filterCategory = res;
          this.productList.forEach((a: any) => {
            const cartState = localStorage.getItem(`cartState_${a.id}`);
            const choiceState = localStorage.getItem(`choiceState_${a.id}`);
            if (choiceState === 'true') {
              a.love = true;
            }
            if (a.size === "XS") {
              a.size = "XS";
            } else if (a.size === "S") {
              a.size = "S";
            } else if (a.size === "M") {
              a.size = "M";
            } else if (a.size === "L") {
              a.size = "L";
            } else if (a.size === "XL") {
              a.size = "XL";
            } else if (a.size === "XXL") {
              a.size = "XXL";
            } 
            a.add_to_cart = cartState === 'true'; 
            a.add_to_choice = choiceState === 'true';                 
            Object.assign(a, { quantity: 1, total: a.price });
          });
  
          this.cartProductList.forEach((a: any) => {
            const cartState = localStorage.getItem(`cartState_${a.id}`);
            if (a.size === "XS") {
              a.size = "XS";
            } else if (a.size === "S") {
              a.size = "S";
            } else if (a.size === "M") {
              a.size = "M";
            } else if (a.size === "L") {
              a.size = "L";
            } else if (a.size === "XL") {
              a.size = "XL";
            }  else if (a.size === "XXL") {
              a.size = "XXL";
            } 
            a.add_to_cart = cartState === 'true';                  
            Object.assign(a, { quantity: 1, total: a.price });
          });
          
          this.choiceProductList.forEach((a: any) => {
            const choiceState = localStorage.getItem(`choiceState_${a.id}`);
            if (a.size === "XS") {
              a.size = "XS";
            } else if (a.size === "S") {
              a.size = "S";
            } else if (a.size === "M") {
              a.size = "M";
            } else if (a.size === "L") {
              a.size = "L";
            } else if (a.size === "XL") {
              a.size = "XL";
            }else if (a.size === "XXL") {
              a.size = "XXL";
            } 
            a.add_to_choice = choiceState === 'true';                  
            Object.assign(a, { quantity: 1, total: a.price });
          });
        });
      this.cartService.search.subscribe((val: any) => {
        this.searchKey = val;
      });
      this.choiceService.search.subscribe((val: any) => {
        this.searchKey = val;
      });
    }
    addtochoice(item: any) {
      const sessionChoiceItems = JSON.parse(sessionStorage.getItem('sessionChoiceItems') || '[]');
  
      if (!sessionChoiceItems.find((storedItem: any) => storedItem.id === item.id)) {
        this.choiceService.addtochoice(item);
        item.love = true;
        sessionChoiceItems.push(item);
        sessionStorage.setItem('sessionChoiceItems', JSON.stringify(sessionChoiceItems));
        localStorage.setItem(`choicetState_${item.id}`, 'true');
      }
      this.removeChoiceItem(item);
    }

    addtocart(item: any) {
      const sessionCartItems = JSON.parse(sessionStorage.getItem('sessionCartItems') || '[]');
  
      if (!sessionCartItems.find((storedItem: any) => storedItem.id === item.id)) {
        this.cartService.addtocart(item);
        item.add_to_cart = true;
        sessionCartItems.push(item);
        sessionStorage.setItem('sessionCartItems', JSON.stringify(sessionCartItems));
        localStorage.setItem(`cartState_${item.id}`, 'true');
      }
    }

    removeChoiceItem(item: any){
      this.choiceService.removeChoiceItem(item);
      item.love = false;
    }
    emptychoice(){
      this.choiceService.removeAllChoice();
    }

    filterItem() {
      this.showCard = true;
    }
    filter(size: string) {
      this.filterCategory = this.choiceProductList.filter((a: any) => (a.size === size || size === '') && a.love);
    }
    
  }
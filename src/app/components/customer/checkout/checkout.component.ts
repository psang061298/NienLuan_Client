import {
  Component,
  OnInit,
  NgZone,
  ElementRef,
  ViewChild
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {} from "googlemaps";
import { MapsAPILoader } from "@agm/core";
import { CustomerService } from "../../../services/customer.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { Cart_Item } from 'src/app/models/cart_item.class';
import { User } from 'src/app/models/user.class';
import { Promotion } from 'src/app/models/promotion.class';
declare var Stripe: any;

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"]
})
export class CheckoutComponent implements OnInit {
  stripe = Stripe("pk_test_wc4Z30OzjsKmaCId0q71FgpW00UeXBH2ns");
  elements = this.stripe.elements();
  card;

  cart_item : Cart_Item[] = [];

  tokenVisa: string;
  totalPrice = 0;
  user : User;
  different_address = false;

  checkout = new Object({
    bill_address : 0,
    shipping_address : 0,
    description: '',
  });

  name_bill = '';
  phone_bill = '';

  name_ship = '';
  phone_ship = '';
  public promotion : Promotion[] = [];


  constructor(
    private form: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private ngZone: NgZone,
    private map: MapsAPILoader
  ) {}

  ngOnInit() {
    this.user = new User();
    this.loadAdress();
    const style = {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    };
    this.card = this.elements.create("card", {
      hidePostalCode: true,
      style
    });
    // Add an instance of the card Element into the `card-element` <div>.
    this.card.mount("#card-element");
    // this.loadCart();
    this.loadPromotion();
  }

  loadPromotion(){
    this.customerService.getPromotion().subscribe(data => {
      this.promotion = data;
      console.log(data);
      this.loadCart();
    })
  }

  loadCart(){
    this.customerService.getCart().subscribe(data => {
      this.cart_item = data;
      console.log(this.cart_item);
      if(this.cart_item.length > 0){
        for (let i = 0; i < this.cart_item.length; i++){
          let img : string;
          img = this.cart_item[i].product.images.toString().replace(/'/g,'"');
          this.cart_item[i].product.images = JSON.parse(img);

          this.promotion.forEach(promo => {

            if(promo.category['id'] == this.cart_item[i].product.category){
              
              this.cart_item[i].product.price = this.cart_item[i].product.price * (100-promo.percent) / 100;
            }
          });

          this.totalPrice += this.cart_item[i].final_price;
        }
        console.log(this.cart_item);
        
      }
    });
    console.log(this.totalPrice);
    
  }

  loadAdress(){
    this.customerService.getProfile().subscribe(data =>{
      this.user = data[0];
      console.log(this.user.addresses);
      
    })
  }

  change_Address_Bill(event){
    console.log(event);
    this.checkout['bill_address'] = event.id;
    this.name_bill = event.fullname;
    this.phone_bill = event.phone;

  }

  change_shipping(event){
    console.log(event);
    this.checkout['shipping_address'] = event.id;
    this.name_ship = event.fullname;
    this.phone_ship = event.phone;
  }

  onSubmit() {
    if(this.checkout['bill_address'] == 0){
      Swal.fire('address is requied');
    }
    else{
      if(!this.different_address || this.checkout['shipping_address'] == 0){
        this.checkout['shipping_address'] = this.checkout['bill_address'];      
      }
      console.log(this.card);
      
      Swal.fire({
        position: 'center',
        title: 'Please Wait..!',
        text: 'Is working..',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        onOpen: () => {
            Swal.showLoading()
        }
    })
      this.stripe.createToken(this.card).then(data => {
        if (data.error) {
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = data.error.message;
          Swal.fire({
            title: 'Pay later ?',
            text: "You will pay after receive product!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.value) {
              this.checkout['token'] = '';
              this.customerService.payment(JSON.stringify(this.checkout)).subscribe(data => {
                Swal.hideLoading();
                Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Successful payment',
                  showConfirmButton: false,
                  timer: 500
                });
                this.router.navigateByUrl('');
                this.reload();
              })
            }
          })
        } else {
          this.checkout['token'] = data.token.id;
          console.log(data.token.id);
          console.log(JSON.stringify(this.checkout));
          
          this.customerService.payment(JSON.stringify(this.checkout)).subscribe(data => {
            Swal.hideLoading();
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Successful payment',
              showConfirmButton: false,
              timer: 500
            });
            // window.location.href = data['receipt_url'];
          })
        }
      });
    }
  }

  async reload() {
    await new Promise(resolve => setTimeout(()=>resolve(), 10)).then(()=>window.location.reload());
  }
}

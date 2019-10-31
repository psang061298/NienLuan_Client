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

  @ViewChild("address", { static: false }) add: ElementRef;
  public place: google.maps.places.PlaceResult;

  private formdemo: FormGroup;
  tokenVisa: string;
  placeresult: string;
  postcode: string;

  checkout = new Object({
    receiver_name: '',
    receiver_phone: '',
    receiver_address: '',
    token: '',
    description: '',
    total_price: 0
  });

  constructor(
    private form: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private ngZone: NgZone,
    private map: MapsAPILoader
  ) {}

  ngOnInit() {
    this.create();
    this.ad1();
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
  }

  loadCart(){
    this.customerService.getCart().subscribe(data => {
      //đưa cái cart vô đây
    })
  }

  create() {
    this.formdemo = this.form.group({
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("[a-zA-Z]+")
        ]
      ],
      email: [
        "",
        [
          Validators.pattern(
            "(?!^[.+&'_-]*@.*$)(^[_\\w\\d+&'-]+(\\.[_\\w\\d+&'-]*)*@[\\w\\d-]+(\\.[\\w\\d-]+)*\\.(([\\d]{1,3})|([\\w]{2,}))$)"
          ),
          Validators.required
        ]
      ],
      phone: [
        "",
        [Validators.required, Validators.pattern("^\\+?[0-9]{3}-?[0-9]{6,12}$")]
      ],
      address: ["", [Validators.required]],
      des: [""],
      postcode: ["", Validators.required]
      // cardNumber : ['', [Validators.required , Validators.pattern("^[0-9]{16}$")]],
      // expiryMonth: ['', Validators.required],
      // expiryYear: ['' , Validators.required],
      // cvc: ['' , [Validators.required , Validators.pattern("^[0-9]{3}$")]],
    });
  }

  ad1() {
    this.map.load().then(() => {
      const autoaddress = new google.maps.places.Autocomplete(
        this.add.nativeElement,
        { types: ["address"] }
      );
      autoaddress.addListener("place_changed", () => {
        this.ngZone.run(() => {
          this.place = autoaddress.getPlace();
          this.placeresult = this.place["formatted_address"];
          console.log(this.place.address_components);
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.place.address_components.length; i++) {
            if (this.place.address_components[i].types[0] === "postal_code") {
              this.postcode = this.place.address_components[i].long_name;
            }
          }
        });
      });
    });
  }
  onSubmit() {
    console.log(this.formdemo);
    this.checkout['receiver_name'] = this.formdemo.controls.name.value;
    this.checkout['receiver_address'] = this.placeresult;
    this.checkout['receiver_phone'] = this.formdemo.controls.phone.value;
    this.checkout['description'] = this.formdemo.controls.des.value;
    
    this.stripe.createToken(this.card).then(data => {
      if (data.error) {
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = data.error.message;
      } else {
        this.checkout['token'] = data.token.id
      }
    });
    console.log(this.checkout);
    
  }
}

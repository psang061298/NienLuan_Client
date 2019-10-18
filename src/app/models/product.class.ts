export class Product{
    name : string;
    brand : number;
    description : string;
    images : string[];
    price : number;
    quantity : number;
    is_active : boolean;
    category : number;
    specifications : {
        key: string;
        value: string;
      };
    
    Product(){
        this.name = '';
        this.brand = -1;
        this.description = '';
        this.images = [''];
        this.price = 0;
        this.quantity = 0;
        this.category = -1;
        this.is_active = false;
        this.specifications = {
            key: '',
            value: ''
          };

    }

}
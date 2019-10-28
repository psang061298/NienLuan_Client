export class Product{
    id? : number;
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
    
    constructor(){
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
    Product(name , brand , des , images , price,quantity,category,is_active,specifications){
      this.name = name;
      this.brand = brand;
      this.description = des;
      this.images = images;
      this.price = price;
      this.quantity = quantity;
      this.category = category;
      this.is_active = is_active;
      this.specifications = specifications;
    }

}
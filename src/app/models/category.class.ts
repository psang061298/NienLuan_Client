export class Category{
    id : number;
    title : string;
    image : string;
    is_active : boolean;

    constructor(){
        this.title = '';
        this.image = '';
        this.is_active = false;
    }
};
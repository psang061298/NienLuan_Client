export class Brand{
    id: number;
    name : string;
    country : string;
    logo : string;
    is_active : boolean;

    constructor(){
        this.name = '';
        this.country = '';
        this.logo = '';
        this.is_active = false;
    }
}
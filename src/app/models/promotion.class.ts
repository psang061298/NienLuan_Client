export class Promotion{
    category : number;
    percent : number;
    start_date : string;
    end_date : string;
    image : string;

    constructor(){
        this.category = 0;
        this.percent = 0;
        this.start_date = '';
        this.end_date = '';
        this.image = '';
    }
}
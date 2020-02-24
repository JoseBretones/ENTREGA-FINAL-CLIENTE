export class Product {

    _id: String;
    name: String;
    brand: String;
    description: String;
    cash: Number;

    constructor(_id='', name='', brand='', description='', cash=0){
        this._id=_id;
        this.name=name;
        this.brand=brand;
        this.description=description;
        this.cash=cash;
    }
}

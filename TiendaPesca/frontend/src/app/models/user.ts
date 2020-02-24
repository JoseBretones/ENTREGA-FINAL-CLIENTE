export class User {
  _id: String;
  name: String;
  subname: String;
  DNI: String;
  direction: String;
  email: String;
  password: String;
  CP: Number;
  role: String;
  telephone: Number;
  gethash?: boolean;

  constructor(_id='' , name='' , subname='' , DNI='' , direction='' , email='' , password='' , CP=0 , role='' , telephone=0){
    this._id=_id;
    this.name=name;
    this.subname=subname;
    this.DNI=DNI;
    this.direction=direction;
    this.email=email;
    this.password=password;
    this.CP=CP;
    this.role=role;
    this.telephone=telephone;
  }

}

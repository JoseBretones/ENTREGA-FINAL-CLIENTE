import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  selectedUser = new User;
  userCollection : User[] = [];

  constructor(private userService : UserService , private toast: ToastrService ) {
    this.selectedUser = new User();
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(res =>{
        this.userCollection = res as User[];
      });
  }

  addUser(form: NgForm){

    if(form.value._id){
      this.userService.editUser(form.value)
        .subscribe(res=>{
          if(res){
            this.resetForm(form);
            this.toast.success('User updated succesfully', 'Success');
            this.getUsers();
          }else{
            this.toast.error('User could not be updated');
          }
        });
    }else{
      this.userService.addUser(form.value)
        .subscribe(res=>{
          this.resetForm(form);
          this.toast.success('USer saved succesfully' , 'Success');
          this.getUsers();
        });
    }
  }


  editUser(user: User){
    this.selectedUser = user;
  }

  deleteUser(_id: String){
    if(confirm('Are you sure you want delete it?')){
      this.userService.deleteUser(_id)
        .subscribe(res=>{
          this.getUsers();
          this.toast.success('User deleted succeessfully' , 'Success');
        });
    }
  }


  resetForm(form:NgForm){
    if(form){
      form.reset();
      this.selectedUser = new User();
    }
  }


}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './models/user';
import { UserService } from './services/user.service';
import { ToastrService } from 'ngx-toastr';
export interface UserForLogin {
  email: string;
  password: string;
  gethash: boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  title = 'Tienda Pesca APP';
  public user: User;
  public user_register: User;
  public identity;
  public token;

  constructor(private userService: UserService, private toast: ToastrService, private router: Router) {
    this.user = new User('', '', '', '', '', '', '', 0, '', 0);
    this.user_register = new User('', '', '', '', '', '', '', 0, '', 0);
  }

  ngOnInit() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }

  onSubmitLogin(form: NgForm) {
    const params: UserForLogin = {
      email: form.value.email,
      password: form.value.password,
      gethash: true
    }
    //Get datas user
    this.userService.signup(form.value)
      .subscribe(
        response => {
          const identity = response['user'];
          this.identity = identity;
          if (this.token != null) {
            //toast success Login Correct
            this.toast.success('Login success', 'Success');
          } else {
            //Create element token
            localStorage.setItem('identity', JSON.stringify(identity));
            //Get token
            this.userService.signup(params)
              .subscribe(
                res => {
                  const token = res['token'];
                  this.token = token;
                  if (this.token.length <= 0) {
                    //Mensaje Error Login
                    this.toast.error('Error Login', 'Error');
                  } else {
                    localStorage.setItem('token', token);
                    this.user = new User('', '', '', '', '', '', '', 0, 'ROLE_USER', 0);
                  }
                }, err => {
                  //Mensaje not Login
                  this.toast.warning('Not Login', 'Warning');
                }
              );
          }
          //Mensaje Login Successfully
          this.toast.success('Login Success', 'Success');
        },
        error => {
          //Mensaje Not Login
          this.toast.warning('Not Login', 'Warning');
        }
      );
  }
  logout() {
    console.log("Entré");
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.router.navigate(['/']);
    //Toast Sesion cerrada correctamente, gracias por su visita
    this.toast.success('properly closed session', 'Success');
  }
  onSubmitRegister(form: NgForm) {
    const user: User = {
      _id: '',
      name: form.value.name,
      subname: form.value.subname,
      DNI: form.value.DNI,
      direction: form.value.direction,
      email: form.value.email,
      password: form.value.password,
      CP: form.value.CP,
      role: 'ROLE_USER',
      telephone: form.value.telephone,
      gethash: true
    };
    this.userService.register(user).subscribe(res => {
      if (res) {
        this.onSubmitLogin(form)
        // form.reset();
        this.toast.success('User registered successfully', 'Success');
      }
    });
  }
}

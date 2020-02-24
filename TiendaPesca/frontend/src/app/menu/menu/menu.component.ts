import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public identity;
  public token;

  constructor(private userService: UserService,private toast: ToastrService,private router: Router) { }

  ngOnInit() {
    this.identity = this.userService.getIdentity();
    this.token = this.userService.getToken();
  }
}

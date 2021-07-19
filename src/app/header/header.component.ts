import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:UserServiceService,private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
  }
  userLists!:User
  getUsers(){
   this.auth.getUser().subscribe(res=>{
     this.userLists = res
   })
  }

  isLoggedIn() {
    const user:any = localStorage.getItem('user')
    return (user===this.userLists) ? true : false;
  }
  isAdmin() {
      return this.userLists && this.userLists.role === 'admin' ? true : false;
  }
  isUser() {
     return  this.userLists && this.userLists.role === 'user' ? true : false;
  }
  logout() {
    localStorage.clear()
    this.router.navigateByUrl(`/login`)
  }

}

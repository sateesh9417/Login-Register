import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  getUser(){
   return this.http.get<User>(environment.userUrl)
  }

  postUser(user:User){
    return this.http.post<User>(environment.userUrl,user)
  }

}

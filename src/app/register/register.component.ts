import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private auth:UserServiceService,private router:Router) { }

registerForm:any = FormGroup;

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      firstname:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern('^[A-Z a-z]+$')]),
      lastname:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern('^[A-Z a-z]+$')]),
      username:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(30),Validators.pattern('^[A-Z a-z]+$')]),
      email:new FormControl('',[Validators.required,Validators.minLength(3),Validators.pattern('^[A-Za-z0-9]{3,25}@[a-z]{3,7}.[a-z]{3,5}$')]),
      password:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(1025),Validators.pattern('^[A-Z]{1}[a-z]{1}[0-9]{4,10}[@#$%&]{2,5}$')]),
      role:new FormControl('',Validators.required)
    })
  }
myBool!:false
onSubmit(rform:any){
  console.log(rform.value);
  this.auth.postUser(rform.value).subscribe(res=>{
  console.log(res);
  alert('registration success')
  this.router.navigateByUrl('/login')
})
}

    get firstname(){
        return this.registerForm.get("firstname")
    }
    get lastname(){
      return this.registerForm.get("lastname")
    }
    get username(){
      return this.registerForm.get("username")
    }
    get email(){
      return this.registerForm.get("email")
    }
    get password(){
      return this.registerForm.get("password")
    }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../user-service.service';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';
// import { GoogleLoginProvider,FacebookLoginProvider,LinkedinLoginProvider, SocialUser, AuthService, SocialLoginModule } from 'ng4-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(private auth:UserServiceService,
    private AuthService:SocialAuthService,
    private router:Router
    ) { }

    storedUserDetails:any
    email:any
    password:any
    user!: SocialUser;
    loggedIn!: boolean;

  ngOnInit(): void {
    this.userData();

    this.AuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

 

facebookLogin(){
  this.AuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  .then((userDate)=>{
    this.user = userDate
  })
}
googleLogin(){
  this.AuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
  .then((userData)=>{
    this.user = userData
    localStorage.setItem('google_auth', JSON.stringify(userData))
    this.router.navigateByUrl('/home').then()
  })
}

refreshToken(): void {
  this.AuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
}

// linkedinLogin(){
//   this.AuthService.signIn(LinkedinLoginProvider.PROVIDER_ID).then((userData)=>{
//     this.user = userData
//   })
// }

signOut(): void {
  this.AuthService.signOut();
}

  userData(){
    this.auth.getUser().subscribe(res=>{
      this.storedUserDetails = res
      console.log(this.storedUserDetails);
    })
  
  }
message !:string
onSubmit(lform:NgForm){
    console.log(lform.value);
    localStorage.setItem('user',lform.value)
    for(let user of this.storedUserDetails){
      console.log(user.email);
      if(user.email !== lform.value.email || user.password !== lform.value.password){
        this.message = 'Login is failled !!! please register first.'
      }else{
        confirm('login success.')
        this.router.navigateByUrl(`/MyProducts`)
      }
    }
}


}

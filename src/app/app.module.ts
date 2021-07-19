import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
// import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider,FacebookLoginProvider,LinkedinLoginProvider } from 'ng4-social-login';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ShowproductComponent } from './showproduct/showproduct.component';
import { MyProductsComponent } from './my-products/my-products.component';

// const config = new AuthServiceConfig([
//         {
//           id:GoogleLoginProvider.PROVIDER_ID,
//           provider:new GoogleLoginProvider('587279546475-5ocljn07t366rpf942j5ul28o3os2q38.apps.googleusercontent.com')
//         },
//         {
//           id:FacebookLoginProvider.PROVIDER_ID,
//           provider:new FacebookLoginProvider('530484064966791')
//         },
        // {
        //   id:LinkedinLoginProvider.PROVIDER_ID,
        //   provider:new LinkedinLoginProvider('86x7mjpnj8h0da')
        // }
// ],false)

// export function provideConfig(){
//   return config
// }

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    ShowproductComponent,
    MyProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  // providers: [
  //   {
  //     provide:AuthServiceConfig,
  //     useFactory:provideConfig
  //   }
  // ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '587279546475-5ocljn07t366rpf942j5ul28o3os2q38.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('530484064966791')
          }
        ],
        onError:(err)=>{
          console.log(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


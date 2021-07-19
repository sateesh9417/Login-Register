import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { RegisterComponent } from './register/register.component';
import { ShowproductComponent } from './showproduct/showproduct.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {component:HomeComponent,path:'home'},
  {component:MyProductsComponent,path:'MyProducts',data:{ roles : ["admin","user"] },
  canActivate:[AuthGuard]},
  {component:LoginComponent,path:'login'},
  {component:RegisterComponent,path:'Register'},
  {component:ShowproductComponent,path:'product',data:{ roles : ["admin"] },
  canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

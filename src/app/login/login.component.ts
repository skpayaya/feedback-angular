// import { Component, OnInit } from '@angular/core';
// import { JwtClientService } from '../services/jwt-client.service';
// import { AuthRequest } from '../model/auth-request';
// import { UserToken } from '../models/user-token';
// import { Router } from '@angular/router';
// import { DataService } from '../services/data-service.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   username:string;
//   password:string;
//   userToken:UserToken;
//   authRequest:AuthRequest;
//   role:string;
//   response: any;

//   constructor(private service: JwtClientService,private router: Router,private data:DataService) { }
//   ngOnInit() {
//   }

//   public getAccessToken(username:string,password:string) {
//     this.authRequest=new AuthRequest(username,password);
//     console.log(username+" "+password);
//     let resp = this.service.generateToken(this.authRequest);
//     resp.subscribe(data => {
//       this.userToken=data;
//       console.log(this.userToken.accessToken);
//       console.log(this.userToken.roles[0]);
//       console.log(this.userToken.username);
//       this.role=this.userToken.roles[0].substring(5).toLowerCase();
//       this.goToPage(this.role);
//     });
//   }

//   goToPage(url:string) {
//     this.data.changeMessage(this.userToken.id);
//     var myurl = `${url}`;
//     this.router.navigateByUrl(myurl).then(e => {
//       if (e) {
//         console.log("Navigation is successful!");
//       } else {
//         console.log("Navigation has failed!");
//       }
//     });
//   }

// }
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
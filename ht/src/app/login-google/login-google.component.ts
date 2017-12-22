import { Component, OnInit } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-google',
  templateUrl: './login-google.component.html',
  styleUrls: ['./login-google.component.css']
})
export class LoginGoogleComponent implements OnInit {

  public user;
  sub: any;

  constructor(public _auth: AuthService, private userService: UserService) { }

  ngOnInit() {
  }

  // Sign in with social
  signIn(provider){
    this.sub = this._auth.login(provider).subscribe(
      (data: any) => {
        console.log(data);
        this.user=data;
        this.userService.loginWithSocial(provider, data.idToken);
      }
    )
  }

  logout(){
    this._auth.logout().subscribe(
      (data)=>{
        if(data){
          console.log("Successfully logged out.");
        }
      } 
    )
  }
}

import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { DataService } from './services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showCoordinatorBoard = false;
  username: string;
  showStudentBoard=false;

  constructor(private tokenStorageService: TokenStorageService,private data:DataService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      console.log(user);
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showCoordinatorBoard = this.roles.includes('ROLE_COORDINATOR');
      this.showStudentBoard = this.roles.includes('ROLE_STUDENT');
      this.data.changeMessage(user.id);
      this.username = user.username;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}

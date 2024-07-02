import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    "FirstName": "",
    "Dni": ""
  };

  constructor(private router: Router, private serviceService: ServiceService) {}
  
  onLogin() {
    console.log("Login request data:", this.loginObj);
    this.serviceService.validateUser(this.loginObj).subscribe((res: any) => {
      if (res.message) {
        alert("Login Success");
        this.router.navigateByUrl("dashboard");
      } else {
        alert("Error, Check your username and password");
      }
    });
  }
}

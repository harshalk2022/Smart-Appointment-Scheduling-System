import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        // this.authService.saveToken(res.token);  // Assuming you get a token back
        // localStorage.setItem('role', res.role);
        this.authService.savelocalStorageItem(res);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => console.error(err)
    });
  }
}

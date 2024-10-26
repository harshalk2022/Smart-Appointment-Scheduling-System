import { AuthService } from './../../auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      role: ['']
    });
  }

  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.router.navigate(['/login']);
      },
      error: (err) => console.error(err)
    });
  }
}

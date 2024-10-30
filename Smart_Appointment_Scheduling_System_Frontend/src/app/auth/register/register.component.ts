import { AuthService } from "./../../auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showWarning: string = "";
  showPassword: boolean = false; // Initialize to false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      dob: ["2000-01-01", Validators.required],
      gender: ["MALE"],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      role: ["PATIENT"],
      speciality: [""],
      location: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.registerForm.get("role")?.valueChanges.subscribe(role => {
      if (role !== "DOCTOR") {
        this.registerForm.get("speciality")?.reset();
      }
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.showWarning = "Please fill out all required fields correctly.";
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: res => {
        this.authService.saveLocalStorageItem(res);
        this.router.navigate(["/login"]);
      },
      error: err => {
        console.error(err);
        this.showWarning = "Registration failed. Please try again.";
      },
    });
  }

  // Method to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

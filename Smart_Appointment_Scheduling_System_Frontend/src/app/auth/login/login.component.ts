import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"],
})
export class LoginComponent {
    loginForm!: FormGroup;
    showWarning: string = ""; // Initialize as empty string
    showPassword: boolean = false; // Initialize to false
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: [localStorage.getItem("email"), Validators.required],
            password: [localStorage.getItem("password"), Validators.required],
        });
    }

    // onSubmit() {
    //     if (this.loginForm.invalid) {
    //         this.showWarning = "Please fill out all required fields."; // Show alert with a custom message
    //         return;
    //     }

    //     this.authService.login(this.loginForm.value).subscribe({
    //         next: res => {
    //             this.authService.saveLocalStorageItem(res);
    //             this.router.navigate(["/dashboard"]);
    //         },
    //         error: err => {
    //             this.showWarning =
    //                 "Login failed. Please check your credentials."; // Another example message
    //             console.error(err);
    //         },
    //     });
    // }

    onSubmit() {
      if (this.loginForm.invalid) {
        this.showWarning = "Please fill out all required fields.";
        return;
      }

      this.authService.login(this.loginForm.value).subscribe({
        next: res => {
          this.authService.saveLocalStorageItem(res);

          // Save providerId to localStorage during login
          if (res.providerId) {
            localStorage.setItem("providerId", res.providerId.toString());
          }

          this.router.navigate(["/dashboard"]);
        },
        error: err => {
          this.showWarning = "Login failed. Please check your credentials.";
          console.error(err);
        },
      });
    }


    // Method to toggle password visibility
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
}

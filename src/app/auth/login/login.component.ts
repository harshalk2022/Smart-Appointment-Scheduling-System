import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showWarning: string = ""; // Initialize as empty string

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.showWarning = "Please fill out all required fields."; // Show alert with a custom message
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: res => {
        this.authService.savelocalStorageItem(res);
        this.router.navigate(["/dashboard"]);
      },
      error: err => {
        this.showWarning = "Login failed. Please check your credentials."; // Another example message
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this.loginForm.get("email")?.setValue(this.route.snapshot.params["email"]);
    this.loginForm
      .get("password")
      ?.setValue(this.route.snapshot.params["password"]);
  }
}

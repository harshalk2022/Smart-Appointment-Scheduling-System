import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  isClient: boolean = false;
  isProvider: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Assuming token has role information, you can decode it
    const userRole = localStorage.getItem("role");
    this.isClient = userRole === "CLIENT";
    this.isProvider = userRole === "SERVICE_PROVIDER";

    console.log(userRole);
  }
}

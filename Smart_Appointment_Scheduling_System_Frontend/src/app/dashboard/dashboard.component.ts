import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { AvailabilityService } from "../availability.service"; // Import the service
import { Availability } from "../availability"; // Import the availability model

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  isPatient: boolean = false;
  isProvider: boolean = false;
  providerAvailability: Availability[] = [];  // Holds availability data

  constructor(
    private authService: AuthService,
    private availabilityService: AvailabilityService
  ) { }

  ngOnInit() {
    const userRole = localStorage.getItem("role");
    this.isPatient = userRole === "PATIENT";
    this.isProvider = userRole === "DOCTOR";

    // Fetch availability if user is a provider
    if (this.isProvider) {
      const providerId = Number(localStorage.getItem("id"));
      this.availabilityService.getProviderAvailability(providerId).subscribe(
        (availabilities) => {
          this.providerAvailability = availabilities;
          console.log("Provider Availability:", this.providerAvailability);
        },
        (error) => console.error("Failed to load availability:", error)
      );
    }
  }
}

import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AvailabilityService } from "src/app/availability.service";
import { Availability } from "src/app/availability";

@Component({
  selector: "app-availability",
  templateUrl: "./availability.component.html",
  styleUrls: ["./availability.component.css"],
})
export class AvailabilityComponent {
  availableFrom: string = "";
  availableTo: string = "";
  successMessage: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private availabilityService: AvailabilityService,

  ) { }

  setAvailability() {
    const providerId = localStorage.getItem("id");
    const availabilityData: Availability = {
      id: 0,
      availableFrom: this.formatDate(this.availableFrom),
      availableTo: this.formatDate(this.availableTo),
      providerId: parseInt(String(providerId)), // Default providerId to prevent undefined error
    };

    this.availabilityService.setAvailability(availabilityData).subscribe({
      next: () => {
        console.log("Availability successfully set!");
        this.showSuccessMessage("Availability set successfully!"); // Call function to show success message
      },
      error: err => {
        console.error(
          "Failed to set availability. Please try again.",
          err
        );
      },
    });
    setTimeout(() => this.router.navigate(["/dashboard"]), 1500);
  }

  // Function to display success message
  showSuccessMessage(message: string) {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = "";
    }, 3000);
  }

  // Utility function to keep date format consistent
  formatDate(dateStr: string): string {

    // return new Date(dateStr).toISOString().slice(0, 19); // Returns 'YYYY-MM-DDTHH:mm:ss' format
    const date = new Date(dateStr);

    // Extract the components of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format the date as 'YYYY-MM-DDTHH:mm:ss'
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }
}

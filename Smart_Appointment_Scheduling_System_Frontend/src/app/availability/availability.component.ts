import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-availability",
  templateUrl: "./availability.component.html",
  styleUrls: ["./availability.component.css"],
})
export class AvailabilityComponent {
  availableFrom: string = "";
  availableTo: string = "";
  successMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  setAvailability() {
    const providerId = localStorage.getItem("id");
    const availabilityData = {
      providerId,
      availableFrom: this.formatDate(this.availableFrom),
      availableTo: this.formatDate(this.availableTo),
    };

    this.http.post("http://localhost:8080/availability/set", availabilityData).subscribe({
      next: () => {
        console.log("Availability successfully set!");
        this.showSuccessMessage("Availability set successfully!"); // Call function to show success message
      },
      error: err => {
        console.error("Failed to set availability. Please try again.", err);
      }
    });
}

// Function to display success message
showSuccessMessage(message: string) {
    // You can use a simple variable to show the message or implement a more complex solution with alerts.
    this.successMessage = message; // Assuming you have a successMessage variable in your component
    setTimeout(() => {
      this.successMessage = ''; // Clear message after a few seconds
    }, 3000); // Adjust the duration as needed
}

  // Utility function to keep date format consistent
  formatDate(dateStr: string): string {
    return new Date(dateStr).toISOString().slice(0, 19); // Returns 'YYYY-MM-DDTHH:mm:ss' format
  }


}

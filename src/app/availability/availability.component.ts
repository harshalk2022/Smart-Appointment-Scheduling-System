import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "app-availability",
  templateUrl: "./availability.component.html",
  styleUrls: ["./availability.component.css"],
})
export class AvailabilityComponent {
  availableFrom: string = "";
  availableTo: string = "";

  constructor(private http: HttpClient) {}

  setAvailability() {
    const providerId = 2; // Assuming logged in provider's ID
    this.http
      .post("http://localhost:8080/availability/set", {
        providerId,
        availableFrom: this.availableFrom,
        availableTo: this.availableTo,
      })
      .subscribe({
        next: () => alert("Availability set!"),
        error: err => console.error(err),
      });
  }
}

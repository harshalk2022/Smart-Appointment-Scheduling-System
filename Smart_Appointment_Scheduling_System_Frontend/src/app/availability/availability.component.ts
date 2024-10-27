import { DatePipe } from "@angular/common";
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

  constructor(private http: HttpClient) { }



  setAvailability() {
    const providerId = 2; // Mock provider ID, should eventually get from login
    const availabilityData = {
      providerId,
      availableFrom: new Date(this.availableFrom).toISOString(),
      availableTo: new Date(this.availableTo).toISOString(),
    };

    this.http.post("http://localhost:8080/availability/set", availabilityData).subscribe({
      next: () => alert("Availability set!"),
      error: err => console.error("Error setting availability:", err)
    });
  }


}



import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AvailabilityService } from "src/app/availability.service";
import { Availability } from "src/app/availability";

@Component({
  selector: "app-update-availability",
  templateUrl: "./update-availability.component.html",
  styleUrls: ["./update-availability.component.css"],
})
export class UpdateAvailabilityComponent implements OnInit {
  updateForm: FormGroup;
  availability: Availability = {
    id: 0,
    availableFrom: "",
    availableTo: "",
    providerId: 0, // Default providerId to prevent undefined error
  }; // Marked updated
  successMessage = "";
  errorMessage = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private availabilityService: AvailabilityService,
    private fb: FormBuilder
  ) {
    // Initialize the form with validation
    this.updateForm = this.fb.group({
      availableFrom: ["", Validators.required],
      availableTo: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    // Assume providerId is stored in localStorage for the logged-in user
    const providerId = Number(localStorage.getItem("id"));

    // Fetch availability details for this providerId
    this.availabilityService.getProviderAvailability(providerId).subscribe(
      (availabilities: Availability[]) => {
        if (availabilities.length > 0) {
          // Assuming the first availability record for the provider
          this.availability = availabilities[0];
          this.updateForm.patchValue({
            availableFrom: this.availability.availableFrom,
            availableTo: this.availability.availableTo,
          });
        } else {
          console.error("No availability records found for provider");
          this.errorMessage = "No availability records found.";
        }
      },
      error => console.error("Failed to fetch availability details", error)
    );
  }




  onSubmit(): void {
    if (this.updateForm.valid) {
      this.availability.availableFrom = this.updateForm.value.availableFrom;
      this.availability.availableTo = this.updateForm.value.availableTo;

      this.availabilityService
        .updateAvailability(this.availability)
        .subscribe({
          next: () => {
            this.successMessage = "Availability updated successfully!";
            this.errorMessage = "";
            setTimeout(() => this.router.navigate(["/dashboard"]), 1500);
          },
          error: err => {
            this.errorMessage = "Error updating availability. Please try again.";
            this.successMessage = "";
          },
        });
    }
  }

}

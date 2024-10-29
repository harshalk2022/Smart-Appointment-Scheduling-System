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
    availabilityId!: number;
    availability!: Availability;
    successMessage = "";
    errorMessage = "";
    showDeletePopup = false;

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
        // Retrieve the availabilityId from the route parameters
        this.availabilityId = Number(this.route.snapshot.paramMap.get("id"));
        // Fetch the availability details to pre-fill the form
        this.availabilityService
            .getAvailabilityById(this.availabilityId)
            .subscribe(
                (availability: Availability) => {
                    this.updateForm.patchValue({
                        availableFrom: availability.availableFrom,
                        availableTo: availability.availableTo,
                    });
                },
                error =>
                    console.error("Failed to fetch availability details", error)
            );
    }

    // Handle form submission for updating availability
    onSubmit(): void {
        if (this.updateForm.valid) {
            const updatedAvailability: Availability = {
                id: this.availabilityId,
                availableFrom: this.updateForm.value.availableFrom,
                availableTo: this.updateForm.value.availableTo,
                providerId: this.availability.providerId,
            };

            this.availabilityService
                .updateAvailability(this.availabilityId, updatedAvailability)
                .subscribe({
                    next: () => {
                        this.successMessage =
                            "Availability updated successfully!";
                        this.errorMessage = "";
                        setTimeout(
                            () => this.router.navigate(["/dashboard"]),
                            1500
                        );
                    },
                    error: err => {
                        this.errorMessage =
                            "Error updating availability. Please try again.";
                        this.successMessage = "";
                    },
                });
        }
    }

    // Handle delete confirmation
    confirmDelete(): void {
        this.showDeletePopup = true;
    }

    deleteAvailability(): void {
        this.availabilityService
            .deleteAvailability(this.availabilityId)
            .subscribe({
                next: () => {
                    this.router.navigate(["/dashboard"]);
                },
                error: err =>
                    console.error("Failed to delete availability", err),
            });
    }
}

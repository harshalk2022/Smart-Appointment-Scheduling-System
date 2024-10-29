import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { AvailabilityService } from "../availability.service";
import { Router } from "@angular/router";
import { Availability } from "../availability";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
    isPatient: boolean = false;
    isProvider: boolean = false;
    providerAvailability: Availability[] = [];
    showDeleteConfirmation: boolean = false;
    availabilityToDeleteId: number | null = null;

    constructor(
        private authService: AuthService,
        private availabilityService: AvailabilityService,
        private router: Router
    ) {}

    ngOnInit() {
        const userRole = localStorage.getItem("role");
        this.isPatient = userRole === "PATIENT";
        this.isProvider = userRole === "DOCTOR";

        if (this.isProvider) {
            const providerId = Number(localStorage.getItem("id"));
            this.availabilityService
                .getProviderAvailability(providerId)
                .subscribe(
                    availabilities => {
                        this.providerAvailability = availabilities;
                    },
                    error =>
                        console.error("Failed to load availability:", error)
                );
        }
    }

    // Navigate to the update page with availability data
    navigateToUpdate(availability: Availability) {
        this.router.navigate(["/availability/update"], {
            state: { data: availability },
        });
    }

    // Show delete confirmation
    confirmDelete(availabilityId: number) {
        this.showDeleteConfirmation = true;
        this.availabilityToDeleteId = availabilityId;
    }

    // Cancel delete action
    cancelDelete() {
        this.showDeleteConfirmation = false;
        this.availabilityToDeleteId = null;
    }

    // Perform delete action
    deleteAvailability() {
        if (this.availabilityToDeleteId !== null) {
            this.availabilityService
                .deleteAvailability(this.availabilityToDeleteId)
                .subscribe(
                    () => {
                        this.providerAvailability =
                            this.providerAvailability.filter(
                                a => a.id !== this.availabilityToDeleteId
                            );
                        this.showDeleteConfirmation = false;
                        this.availabilityToDeleteId = null;
                        console.log("Availability deleted successfully.");
                    },
                    error =>
                        console.error("Failed to delete availability:", error)
                );
        }
    }
}

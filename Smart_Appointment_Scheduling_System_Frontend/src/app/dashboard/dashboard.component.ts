import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { User } from "../user";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
    isPatient: boolean = false;
    isProvider: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        // Assuming token has role information, you can decode it
        const userRole = localStorage.getItem("role");
        this.isPatient = userRole === "PATIENT";
        this.isProvider = userRole === "DOCTOR";

        console.log(userRole);
    }
}

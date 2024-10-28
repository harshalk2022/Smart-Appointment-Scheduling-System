import { Component, OnInit } from "@angular/core";
import { User } from "../user";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../user.service";

@Component({
    selector: "app-user-details",
    templateUrl: "./user-details.component.html",
    styleUrls: ["./user-details.component.css"],
})
export class UserDetailsComponent implements OnInit {
    id!: number;
    user: User = new User(); // Initialize with an empty User object

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        const routeId = this.route.snapshot.params["id"];
        this.id = routeId ? +routeId : Number(localStorage.getItem("id"));

        if (this.id) {
            this.userService.getUserById(this.id).subscribe({
                next: data => {
                    this.user = data;
                },
                error: error => {
                    console.error("Error fetching user data:", error);
                },
            });
        } else {
            console.error("User ID is not available.");
        }
    }
}

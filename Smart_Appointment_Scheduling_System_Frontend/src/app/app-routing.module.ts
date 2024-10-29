import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppointmentsComponent } from "./appointments/appointments.component";
import { AvailabilityComponent } from "./availability/availability.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { UpdateAvailabilityComponent } from "./availability/update-availability/update-availability.component";

const routes: Routes = [
    { path: "", redirectTo: "/welcome", pathMatch: "full" },
    { path: "welcome", component: WelcomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "login", component: LoginComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "appointments", component: AppointmentsComponent },
    { path: "availability", component: AvailabilityComponent },
    { path: "user-details", component: UserDetailsComponent },
    { path: "update-user/:id", component: UpdateUserComponent },
    { path: "availability/update/:id", component: UpdateAvailabilityComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

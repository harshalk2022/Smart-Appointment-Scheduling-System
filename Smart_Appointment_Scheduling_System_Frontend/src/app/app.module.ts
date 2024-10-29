import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AppointmentsComponent } from "./appointments/appointments.component";
import { AvailabilityComponent } from "./availability/availability.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WelcomeComponent } from "./welcome/welcome.component";
import { UserDetailsComponent } from "./user-details/user-details.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { UpdateAvailabilityComponent } from "./availability/update-availability/update-availability.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        AppointmentsComponent,
        AvailabilityComponent,
        NavbarComponent,
        WelcomeComponent,
        UserDetailsComponent,
        UpdateUserComponent,
        UpdateAvailabilityComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

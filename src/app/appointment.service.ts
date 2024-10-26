import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) {}

  bookAppointment(appointmentData: any) {
    return this.http.post(`${this.baseUrl}/appointments/book`, appointmentData);
  }

  getClientAppointments(clientId: number) {
    return this.http.get(`${this.baseUrl}/appointments/client/${clientId}`);
  }

  getProviderAppointments(providerId: number) {
    return this.http.get(`${this.baseUrl}/appointments/provider/${providerId}`);
  }

  setAvailability(providerId: number, availabilityData: any) {
    return this.http.post(`${this.baseUrl}/availability/set`, availabilityData);
  }
}

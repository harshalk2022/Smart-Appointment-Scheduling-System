// availability.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Availability } from "./availability"; // Adjust path as needed

@Injectable({
  providedIn: "root",
})
export class AvailabilityService {
  private baseUrl = "http://localhost:8080/availability/provider";

  constructor(private http: HttpClient) {}

  getProviderAvailability(providerId: number): Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.baseUrl}/${providerId}`);
  }
}

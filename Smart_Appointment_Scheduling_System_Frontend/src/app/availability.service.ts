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

    constructor(private httpClient: HttpClient) {}

    getProviderAvailability(providerId: number): Observable<Availability[]> {
        return this.httpClient.get<Availability[]>(
            `${this.baseUrl}/${providerId}`
        );
    }

    deleteAvailability(selectedAvailabilityId: number): Observable<Object> {
        return this.httpClient.delete(
            `${this.baseUrl}/${selectedAvailabilityId}`,
            {
                responseType: "text",
            }
        );
    }

    updateAvailability(
        selectedAvailabilityId: number,
        availability: Availability
    ): Observable<Object> {
        return this.httpClient.put(
            `${this.baseUrl}/${selectedAvailabilityId}`,
            availability
        );
    }

    getAvailabilityById(id: number): Observable<Availability> {
        return this.httpClient.get<Availability>(`${this.baseUrl}/${id}`);
    }
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { User } from "./user";

@Injectable({
    providedIn: "root",
})
export class UserService {
    private baseURl = "http://localhost:8080/users";

    constructor(private httpClient: HttpClient) {}

    // getUsersList(): Observable<User[]> {
    //   return this.httpClient.get<User[]>(`${this.baseURl}`).pipe(
    //     map((users) =>
    //       users.map((user) => ({
    //         ...user,
    //         // createdAt: new Date(user.createdAt), // Convert string to Date object
    //       })),
    //     ),
    //   );
    // }

    // is not required
    // createUser(user: User): Observable<object> {
    //   return this.httpClient.post(`${this.baseURl}`, user);
    // }

    getUserById(id: number): Observable<User> {
        return this.httpClient.get<User>(`${this.baseURl}/${id}`);
    }

    // getUserById(id: number): Observable<User> {
    //   return this.httpClient.get<User>(`${this.baseURl}/${id}`).pipe(
    //     catchError((error) => {
    //       console.error("Failed to retrieve user:", error);
    //       return throwError(error); // or any custom error handling
    //     })
    //   );
    // }

    updateUser(id: number, user: User): Observable<Object> {
        return this.httpClient.put(`${this.baseURl}/${id}`, user);
    }

    deleteUser(id: number): Observable<Object> {
        return this.httpClient.delete(`${this.baseURl}/${id}`, {
            responseType: "text",
        });
    }
}

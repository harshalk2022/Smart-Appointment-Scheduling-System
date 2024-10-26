import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  appointments: any[] = [];
  providers: any[] = []; // Declare providers property
  isClient: boolean = false;

  constructor(private http: HttpClient) { }

  // ngOnInit() {
  //   const userRole = localStorage.getItem('role');
  //   this.isClient = userRole === 'CLIENT';

  //   if (this.isClient) {
  //     this.http.get('http://localhost:8080/appointments/client/1').subscribe((data: any) => {
  //       this.appointments = data;
  //     });
  //   } else {
  //     this.http.get('http://localhost:8080/appointments/provider/2').subscribe((data: any) => {
  //       this.appointments = data;
  //     });
  //   }
  // }

  // bookAppointment(providerId: number, time: string) {
  //   const clientId = 1; // Get from logged in user
  //   this.http.post('http://localhost:8080/appointments/book', {
  //     clientId,
  //     providerId,
  //     time
  //   }).subscribe({
  //     next: () => alert('Appointment booked!'),
  //     error: err => console.error(err)
  //   });
  // }


  ngOnInit() {
    const userRole = localStorage.getItem('role');
    this.isClient = userRole === 'CLIENT';

    if (this.isClient) {
      this.loadProviders();
    } else {
      this.loadAppointmentsForProvider();
    }
  }

  loadProviders() {
    this.http.get<any[]>('http://localhost:8080/providers').subscribe((data: any[]) => {
      this.providers = data;
    });
  }

  loadAppointmentsForProvider() {
    const providerId = 2; // Replace with actual provider ID logic
    this.http.get<any[]>(`http://localhost:8080/appointments/provider/${providerId}`).subscribe((data: any[]) => {
      this.appointments = data;
    });
  }

  bookAppointment(providerId: number, time: string) {
    const clientId = 1; // Replace with actual client ID logic
    this.http.post('http://localhost:8080/appointments/book', {
      clientId,
      providerId,
      time
    }).subscribe({
      next: () => alert('Appointment booked!'),
      error: err => console.error(err)
    });
  }

  updateStatus(appointmentId: number, status: string) {
    this.http.put(`http://localhost:8080/appointments/${appointmentId}/status`, { status }).subscribe({
      next: () => alert('Appointment status updated!'),
      error: err => console.error(err)
    });
  }

  cancelAppointment(appointmentId: number) {
    this.http.delete(`http://localhost:8080/appointments/${appointmentId}`).subscribe({
      next: () => {
        this.appointments = this.appointments.filter(app => app.id !== appointmentId);
        alert('Appointment canceled');
      },
      error: err => console.error(err)
    });
  }

}

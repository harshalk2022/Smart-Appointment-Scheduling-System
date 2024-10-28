import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})

export class UpdateUserComponent implements OnInit {
  id!: number;
  user: User = new User();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe((data) => {
      this.user = data;
    });
  }

  onSubmit(): void {
    this.userService.updateUser(this.id, this.user).subscribe({
      next: () => {
        alert('User updated successfully!');
        this.router.navigate(['/user-details', this.id]);
      },
      error: (err) => console.error('Error updating user:', err)
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete this account?')) {
      this.userService.deleteUser(this.id).subscribe({
        next: () => {
          alert('Account deleted successfully.');
          this.router.navigate(['/']); // Redirect to home or another route after deletion
        },
        error: (err) => console.error('Error deleting account:', err)
      });
    }
  }
}

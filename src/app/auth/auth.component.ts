import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/User';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'td-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  sub!: Subscription;
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  login(formValues: any): void {
    let user: User = <User>formValues;

    this.sub = this.authService.login(user).subscribe({
      next: (data) => this.storageService.saveUser(data),
      error: (err) => console.error(err),
    });
  }
}

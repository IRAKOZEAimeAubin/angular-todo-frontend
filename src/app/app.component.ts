import { Component, OnInit } from '@angular/core';
import { StorageService } from './shared/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'td-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private storageService: StorageService,private router: Router) {}

  isLoggedIn: boolean = this.storageService.isLoggedIn();

  ngOnInit (): void {
    if ( !this.isLoggedIn ) this.router.navigate( [ '/login' ] )
  }

  logout() {
    this.storageService.removeUser()
    this.router.navigate(['/login']);
  }
}

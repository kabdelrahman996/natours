import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentUser: any = null;
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {
    authService.currentUser$.subscribe((user: any) => {
      this.currentUser = user;
    });
  }

  logout() {
    this.currentUser = null;
    this.closeNavbar(); // Close navbar when logging out
    this.router.navigate(['/logout']);
  }

  closeNavbar() {
    // Close the navbar collapse
    const navbarCollapse = this.navbarCollapse?.nativeElement;
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  }

  onNavLinkClick() {
    // This method will be called when any nav link is clicked
    this.closeNavbar();
  }
}

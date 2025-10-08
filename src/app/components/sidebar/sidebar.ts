import {Component, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatListItem, MatNavList} from '@angular/material/list';
import {Router, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatToolbar,
    MatNavList,
    MatSidenavContent,
    RouterOutlet,
    MatListItem,
    RouterLinkActive,
    MatIcon,
    MatIconButton,
    NgIf
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  opened = true;

  constructor(private router: Router,
              private readonly _authService: AuthService) {}

  toggleSidebar() {
    this.opened = !this.opened;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    this._authService.logout();
    this.router.navigate(['/login']);
  }
}

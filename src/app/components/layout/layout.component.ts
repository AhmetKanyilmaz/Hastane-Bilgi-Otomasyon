import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from './navbar.component';
import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    NavbarComponent,
    SidebarComponent
  ],
  template: `
    <div class="layout-container" *ngIf="currentUser">
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #drawer class="sidenav" fixedInViewport mode="side" opened>
          <app-sidebar></app-sidebar>
        </mat-sidenav>
        
        <mat-sidenav-content>
          <app-navbar 
            [currentUser]="currentUser" 
            (menuToggle)="drawer.toggle()">
          </app-navbar>
          
          <main class="main-content">
            <router-outlet></router-outlet>
          </main>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .layout-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .sidenav-container {
      flex: 1;
    }

    .sidenav {
      width: 280px;
      background-color: #f5f5f5;
      border-right: 1px solid #e0e0e0;
    }

    .main-content {
      padding: 20px;
      overflow-y: auto;
      background-color: #fafafa;
      min-height: calc(100vh - 64px);
    }

    @media (max-width: 768px) {
      .sidenav {
        width: 240px;
      }
      
      .main-content {
        padding: 16px;
      }
    }
  `]
})
export class LayoutComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }
}

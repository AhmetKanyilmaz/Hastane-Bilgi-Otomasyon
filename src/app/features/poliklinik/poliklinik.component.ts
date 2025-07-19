import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-poliklinik',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatGridListModule,
    RouterModule
  ],
  template: `
    <div class="poliklinik-container">
      <mat-card class="header-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>local_hospital</mat-icon>
            Poliklinik Yönetim Sistemi
          </mat-card-title>
          <mat-card-subtitle>Hasta randevuları ve poliklinik işlemleri</mat-card-subtitle>
        </mat-card-header>
      </mat-card>

      <div class="module-grid">
        <mat-card class="module-card" routerLink="/randevular">
          <mat-card-header>
            <mat-card-title>
              <mat-icon color="primary">event</mat-icon>
              Randevu Takip
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Hasta randevularını görüntüle, yönet ve takip et</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary">
              <mat-icon>arrow_forward</mat-icon>
              Randevu Takibe Git
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="module-card" routerLink="/doktor-randevu">
          <mat-card-header>
            <mat-card-title>
              <mat-icon color="accent">person</mat-icon>
              Doktor Randevu
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Doktor randevu yönetimi ve hasta kabul işlemleri</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="accent">
              <mat-icon>arrow_forward</mat-icon>
              Doktor Randevuya Git
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="module-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon color="warn">medical_services</mat-icon>
              Muayene Odaları
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Muayene odası durumları ve hasta akışı</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="warn" disabled>
              <mat-icon>build</mat-icon>
              Geliştiriliyor
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="module-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>schedule</mat-icon>
              Vardiya Yönetimi
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Doktor ve hemşire vardiya planlaması</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button disabled>
              <mat-icon>build</mat-icon>
              Geliştiriliyor
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .poliklinik-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header-card {
      margin-bottom: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .header-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
    }

    .header-card mat-card-subtitle {
      color: rgba(255, 255, 255, 0.8);
    }

    .module-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .module-card {
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 12px;
    }

    .module-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .module-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .module-card mat-card-content {
      margin: 16px 0;
    }

    .module-card mat-card-actions {
      padding: 16px;
    }

    .module-card button {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  `]
})
export class PoliklinikComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    console.log('Poliklinik modülü yüklendi');
  }
}

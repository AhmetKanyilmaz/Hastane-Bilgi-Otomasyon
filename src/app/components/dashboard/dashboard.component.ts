import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatChipsModule
  ],
  template: `
    <div class="dashboard-container">
      <div class="welcome-section">
        <h1 class="welcome-title">
          <mat-icon class="welcome-icon">waving_hand</mat-icon>
          Hoş geldiniz, {{ currentUser?.name }}!
        </h1>
        <p class="welcome-subtitle">
          {{ getRoleWelcomeMessage() }}
        </p>
      </div>

      <div class="stats-grid">
        <mat-grid-list cols="4" rowHeight="120px" gutterSize="16px">
          <mat-grid-tile *ngFor="let stat of getDashboardStats()">
            <mat-card class="stat-card">
              <mat-card-content>
                <div class="stat-icon">
                  <mat-icon [ngClass]="stat.iconClass">{{ stat.icon }}</mat-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-number">{{ stat.value }}</div>
                  <div class="stat-label">{{ stat.label }}</div>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>
        </mat-grid-list>
      </div>

      <div class="content-section">
        <mat-grid-list cols="2" rowHeight="400px" gutterSize="16px">
          <mat-grid-tile>
            <mat-card class="content-card">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>today</mat-icon>
                  Bugünün Özeti
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="summary-item" *ngFor="let item of getTodaySummary()">
                  <mat-icon class="summary-icon">{{ item.icon }}</mat-icon>
                  <span class="summary-text">{{ item.text }}</span>
                  <mat-chip class="summary-count">{{ item.count }}</mat-chip>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-card class="content-card">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>assignment</mat-icon>
                  Hızlı İşlemler
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="quick-actions">
                  <button 
                    *ngFor="let action of getQuickActions()" 
                    mat-raised-button 
                    [color]="action.color"
                    [routerLink]="action.route"
                    class="quick-action-btn">
                    <mat-icon>{{ action.icon }}</mat-icon>
                    {{ action.label }}
                  </button>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>
        </mat-grid-list>
      </div>

      <div class="recent-activities">
        <mat-card>
          <mat-card-header>
            <mat-card-title>
              <mat-icon>history</mat-icon>
              Son Aktiviteler
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="activity-item" *ngFor="let activity of getRecentActivities()">
              <mat-icon [ngClass]="activity.iconClass">{{ activity.icon }}</mat-icon>
              <div class="activity-content">
                <div class="activity-title">{{ activity.title }}</div>
                <div class="activity-time">{{ activity.time }}</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .welcome-section {
      margin-bottom: 30px;
      text-align: center;
    }

    .welcome-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      font-size: 28px;
      font-weight: 500;
      color: #333;
      margin: 0 0 8px 0;
    }

    .welcome-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #ff9800;
    }

    .welcome-subtitle {
      color: #666;
      font-size: 16px;
      margin: 0;
    }

    .stats-grid {
      margin-bottom: 30px;
    }

    .stat-card {
      width: 100%;
      height: 100%;
      padding: 0;
    }

    .stat-card mat-card-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      height: 100%;
    }

    .stat-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .stat-icon .primary { color: #1976d2; }
    .stat-icon .success { color: #4caf50; }
    .stat-icon .warning { color: #ff9800; }
    .stat-icon .accent { color: #e91e63; }

    .stat-info {
      flex: 1;
    }

    .stat-number {
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }

    .stat-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .content-section {
      margin-bottom: 30px;
    }

    .content-card {
      width: 100%;
      height: 100%;
    }

    .content-card mat-card-header {
      margin-bottom: 16px;
    }

    .content-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
    }

    .summary-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .summary-item:last-child {
      border-bottom: none;
    }

    .summary-icon {
      color: #666;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .summary-text {
      flex: 1;
      font-size: 14px;
    }

    .summary-count {
      font-size: 12px;
    }

    .quick-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .quick-action-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      justify-content: flex-start;
      padding: 12px 16px;
      height: 48px;
    }

    .recent-activities mat-card {
      margin-top: 0;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-item mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .activity-item .success { color: #4caf50; }
    .activity-item .primary { color: #1976d2; }
    .activity-item .warning { color: #ff9800; }

    .activity-content {
      flex: 1;
    }

    .activity-title {
      font-size: 14px;
      color: #333;
      margin-bottom: 4px;
    }

    .activity-time {
      font-size: 12px;
      color: #666;
    }

    @media (max-width: 768px) {
      .stats-grid mat-grid-list {
        cols: 2;
      }

      .content-section mat-grid-list {
        cols: 1;
      }

      .quick-actions {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  getRoleWelcomeMessage(): string {
    const role = this.currentUser?.role;
    const messages = {
      'doktor': 'Hastalarınızın muayene ve tedavi süreçlerini buradan yönetebilirsiniz.',
      'laborant': 'Laboratuvar test sonuçlarını inceleyip onaylayabilirsiniz.',
      'mali_personel': 'Mali işlemleri ve faturalandırma süreçlerini takip edebilirsiniz.',
      'admin': 'Sistem yönetimi ve genel raporlara buradan erişebilirsiniz.'
    };
    return role ? messages[role as keyof typeof messages] || 'HBYS\'ye hoş geldiniz.' : 'HBYS\'ye hoş geldiniz.';
  }

  getDashboardStats() {
    const role = this.currentUser?.role;
    
    const statsByRole = {
      'doktor': [
        { icon: 'people', value: '24', label: 'Bugünkü Hastalar', iconClass: 'primary' },
        { icon: 'schedule', value: '8', label: 'Bekleyen Randevular', iconClass: 'warning' },
        { icon: 'assignment', value: '12', label: 'Test Sonuçları', iconClass: 'success' },
        { icon: 'notification_important', value: '3', label: 'Acil Durumlar', iconClass: 'accent' }
      ],
      'laborant': [
        { icon: 'science', value: '45', label: 'Bekleyen Testler', iconClass: 'primary' },
        { icon: 'check_circle', value: '28', label: 'Tamamlanan', iconClass: 'success' },
        { icon: 'schedule', value: '17', label: 'İşlemde', iconClass: 'warning' },
        { icon: 'priority_high', value: '5', label: 'Acil Testler', iconClass: 'accent' }
      ],
      'mali_personel': [
        { icon: 'receipt', value: '156', label: 'Bekleyen Faturalar', iconClass: 'primary' },
        { icon: 'payment', value: '89', label: 'Tahsilatlar', iconClass: 'success' },
        { icon: 'account_balance', value: '34', label: 'SGK İşlemleri', iconClass: 'warning' },
        { icon: 'trending_up', value: '₺45.2K', label: 'Günlük Gelir', iconClass: 'accent' }
      ],
      'admin': [
        { icon: 'people', value: '1,247', label: 'Toplam Hastalar', iconClass: 'primary' },
        { icon: 'local_hospital', value: '156', label: 'Aktif Personel', iconClass: 'success' },
        { icon: 'inventory', value: '89%', label: 'Stok Durumu', iconClass: 'warning' },
        { icon: 'trending_up', value: '94%', label: 'Sistem Performansı', iconClass: 'accent' }
      ]
    };

    return role ? statsByRole[role as keyof typeof statsByRole] || [] : [];
  }

  getTodaySummary() {
    const role = this.currentUser?.role;
    
    const summaryByRole = {
      'doktor': [
        { icon: 'person_add', text: 'Yeni hasta kaydı', count: '8' },
        { icon: 'medical_services', text: 'Tamamlanan muayene', count: '15' },
        { icon: 'prescription', text: 'Yazılan reçete', count: '22' },
        { icon: 'assignment', text: 'Test istemi', count: '18' }
      ],
      'laborant': [
        { icon: 'biotech', text: 'İşlenen test', count: '67' },
        { icon: 'check_circle', text: 'Onaylanan sonuç', count: '54' },
        { icon: 'schedule', text: 'Bekleyen örnek', count: '23' },
        { icon: 'priority_high', text: 'Acil test', count: '8' }
      ],
      'mali_personel': [
        { icon: 'receipt', text: 'Oluşturulan fatura', count: '89' },
        { icon: 'payment', text: 'Alınan ödeme', count: '67' },
        { icon: 'account_balance', text: 'SGK bildirimi', count: '34' },
        { icon: 'trending_down', text: 'Bekleyen ödeme', count: '12' }
      ],
      'admin': [
        { icon: 'people', text: 'Günlük hasta sayısı', count: '234' },
        { icon: 'local_hospital', text: 'Aktif personel', count: '156' },
        { icon: 'inventory', text: 'Kritik stok', count: '7' },
        { icon: 'warning', text: 'Sistem uyarısı', count: '2' }
      ]
    };

    return role ? summaryByRole[role as keyof typeof summaryByRole] || [] : [];
  }

  getQuickActions() {
    const role = this.currentUser?.role;
    
    const actionsByRole = {
      'doktor': [
        { icon: 'person_add', label: 'Yeni Hasta', route: '/hasta-kayit', color: 'primary' },
        { icon: 'search', label: 'Hasta Ara', route: '/hasta-arama', color: '' },
        { icon: 'medical_services', label: 'Muayene Başlat', route: '/poliklinik', color: 'accent' },
        { icon: 'assignment', label: 'Test Sonuçları', route: '/test-sonuclari', color: 'warn' }
      ],
      'laborant': [
        { icon: 'science', label: 'Test İşlemleri', route: '/laboratuvar', color: 'primary' },
        { icon: 'track_changes', label: 'Örnek Takip', route: '/ornek-takip', color: '' },
        { icon: 'assignment', label: 'Sonuç Gir', route: '/laboratuvar', color: 'accent' },
        { icon: 'check_circle', label: 'Sonuç Onayla', route: '/laboratuvar', color: 'warn' }
      ],
      'mali_personel': [
        { icon: 'receipt', label: 'Fatura Oluştur', route: '/faturalama', color: 'primary' },
        { icon: 'payment', label: 'Ödeme Al', route: '/faturalama', color: '' },
        { icon: 'account_balance', label: 'SGK Bildirimi', route: '/faturalama', color: 'accent' },
        { icon: 'analytics', label: 'Mali Rapor', route: '/faturalama', color: 'warn' }
      ],
      'admin': [
        { icon: 'people', label: 'Personel Yönetimi', route: '/personel', color: 'primary' },
        { icon: 'inventory', label: 'Stok Kontrol', route: '/ilac-stok', color: '' },
        { icon: 'analytics', label: 'Raporlar', route: '/performans', color: 'accent' },
        { icon: 'settings', label: 'Sistem Ayarları', route: '/settings', color: 'warn' }
      ]
    };

    return role ? actionsByRole[role as keyof typeof actionsByRole] || [] : [];
  }

  getRecentActivities() {
    const role = this.currentUser?.role;
    
    const activitiesByRole = {
      'doktor': [
        { icon: 'medical_services', title: 'Ahmet Yılmaz hastasının muayenesi tamamlandı', time: '10 dakika önce', iconClass: 'success' },
        { icon: 'assignment', title: 'Yeni test sonucu alındı - Fatma Demir', time: '25 dakika önce', iconClass: 'primary' },
        { icon: 'schedule', title: 'Randevu eklendi - Mehmet Kaya (14:30)', time: '1 saat önce', iconClass: 'warning' },
        { icon: 'notification_important', title: 'Acil hasta başvurusu', time: '2 saat önce', iconClass: 'accent' }
      ],
      'laborant': [
        { icon: 'check_circle', title: 'Kan testi sonuçları onaylandı', time: '5 dakika önce', iconClass: 'success' },
        { icon: 'science', title: 'Yeni örnek işleme alındı', time: '15 dakika önce', iconClass: 'primary' },
        { icon: 'schedule', title: 'Mikroskopi testi tamamlandı', time: '45 dakika önce', iconClass: 'warning' },
        { icon: 'priority_high', title: 'Acil biyokimya testi başlatıldı', time: '1 saat önce', iconClass: 'accent' }
      ],
      'mali_personel': [
        { icon: 'payment', title: 'Ödeme alındı - ₺1,250', time: '8 dakika önce', iconClass: 'success' },
        { icon: 'receipt', title: 'Yeni fatura oluşturuldu', time: '20 dakika önce', iconClass: 'primary' },
        { icon: 'account_balance', title: 'SGK bildirimi gönderildi', time: '1 saat önce', iconClass: 'warning' },
        { icon: 'trending_up', title: 'Günlük gelir raporu hazırlandı', time: '2 saat önce', iconClass: 'accent' }
      ],
      'admin': [
        { icon: 'people', title: 'Yeni personel kaydı eklendi', time: '30 dakika önce', iconClass: 'success' },
        { icon: 'inventory', title: 'Stok seviyesi kritik - İlaç A', time: '1 saat önce', iconClass: 'warning' },
        { icon: 'backup', title: 'Sistem yedeği tamamlandı', time: '2 saat önce', iconClass: 'primary' },
        { icon: 'update', title: 'Sistem güncellemesi uygulandı', time: '3 saat önce', iconClass: 'accent' }
      ]
    };

    return role ? activitiesByRole[role as keyof typeof activitiesByRole] || [] : [];
  }
}

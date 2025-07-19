import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { User } from '../../models/user.model';

interface MenuItem {
  name: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  roles: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule
  ],
  template: `
    <nav class="sidebar">
      <!-- Üst Kullanıcı Paneli -->
      <div class="user-panel">
        <div class="user-icon">
          <mat-icon>account_circle</mat-icon>
        </div>
        <div class="user-info">
          <span class="user-name">{{ currentUser.name }}</span>
          <span class="user-role">{{ getRoleDisplayName(currentUser.role) }}</span>
        </div>
      </div>

      <!-- Menü Listesi -->
      <ul class="menu-list">
        <li class="menu-header">Ana Menü</li>
        <li>
          <a routerLink="/dashboard" routerLinkActive="active">
            <mat-icon>dashboard</mat-icon>
            <span>Dashboard</span>
          </a>
        </li>

        <li class="menu-header">Klinik Modüller</li>
        <li *ngFor="let item of menuItems.klinik" class="menu-item has-submenu" [class.active]="isExpanded(item.key)">
          <div (click)="toggleMenu(item.key)" style="cursor: pointer; display: flex; align-items: center; padding: 15px 20px; color: #333; transition: background-color 0.3s, color 0.3s;">
            <mat-icon style="font-size: 18px; width: 25px; margin-right: 15px; color: #555;">{{ item.icon }}</mat-icon>
            <span style="flex-grow: 1;">{{ item.name }}</span>
            <mat-icon class="arrow" style="margin-left: auto; font-size: 16px; transition: transform 0.3s ease;">{{ getExpandIcon(item.key) }}</mat-icon>
          </div>
          <ul class="submenu">
            <li *ngFor="let child of item.children">
              <a [routerLink]="child.route" routerLinkActive="active">{{ child.name }}</a>
            </li>
          </ul>
        </li>

        <li class="menu-header">İdari ve Mali Modüller</li>
        <li *ngFor="let item of menuItems.idari" class="menu-item has-submenu" [class.active]="isExpanded(item.key)">
          <div (click)="toggleMenu(item.key)" style="cursor: pointer; display: flex; align-items: center; padding: 15px 20px; color: #333; transition: background-color 0.3s, color 0.3s;">
            <mat-icon style="font-size: 18px; width: 25px; margin-right: 15px; color: #555;">{{ item.icon }}</mat-icon>
            <span style="flex-grow: 1;">{{ item.name }}</span>
            <mat-icon class="arrow" style="margin-left: auto; font-size: 16px; transition: transform 0.3s ease;">{{ getExpandIcon(item.key) }}</mat-icon>
          </div>
          <ul class="submenu">
            <li *ngFor="let child of item.children">
              <a [routerLink]="child.route" routerLinkActive="active">{{ child.name }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    /* --- Genel Sayfa Stilleri --- */
    :host {
      display: block;
      height: 100%;
    }

    /* --- Sidebar Ana Konteyner --- */
    .sidebar {
      position: relative;
      height: 100vh;
      width: 280px;
      background-color: #ffffff;
      border-right: 1px solid #e0e0e0;
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 15px rgba(0,0,0,0.05);
      font-family: 'Roboto', sans-serif;
    }

    /* --- Üst Kullanıcı Paneli --- */
    .user-panel {
      display: flex;
      align-items: center;
      padding: 20px;
      background-color: #007bff;
      color: white;
      flex-shrink: 0;
    }

    .user-panel .user-icon mat-icon {
      font-size: 40px;
      margin-right: 15px;
      width: 40px;
      height: 40px;
    }

    .user-panel .user-info .user-name {
      font-weight: 700;
      display: block;
    }

    .user-panel .user-info .user-role {
      font-size: 0.8em;
      opacity: 0.8;
    }

    /* --- Menü Listesi --- */
    .menu-list {
      list-style: none;
      padding: 0;
      margin: 0;
      overflow-y: auto;
      flex-grow: 1;
    }

    .menu-list .menu-header {
      padding: 15px 20px 10px;
      font-size: 0.75em;
      font-weight: 700;
      color: #888;
      background-color: #f8f9fa;
      border-top: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
      text-transform: uppercase;
    }
    
    .menu-list li:first-child.menu-header {
      border-top: none;
    }

    .menu-list li a {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      color: #333;
      text-decoration: none;
      transition: background-color 0.3s, color 0.3s;
      cursor: pointer;
    }

    .menu-list li a:hover {
      background-color: #e9ecef;
    }

    .menu-list li div {
      transition: background-color 0.3s, color 0.3s;
    }

    .menu-list li div:hover {
      background-color: #e9ecef;
    }

    .menu-list li a mat-icon {
      font-size: 18px;
      width: 25px;
      margin-right: 15px;
      color: #555;
    }

    /* --- Açılır Menü (Dropdown) Stilleri --- */
    .menu-item .arrow {
      margin-left: auto;
      font-size: 16px;
      transition: transform 0.3s ease;
    }

    /* Menü aktif (açık) olduğunda oku 180 derece döndür */
    .menu-item.active .arrow {
      transform: rotate(180deg);
    }

    .submenu {
      list-style: none;
      padding-left: 0;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s ease-in-out;
      background-color: #f8f9fa;
      margin: 0;
    }

    /* Menü aktif (açık) olduğunda alt menüyü göster */
    .menu-item.active .submenu {
      max-height: none;
      display: block;
    }

    .submenu li {
      padding: 10px 20px;
      border-bottom: 1px solid #e0e0e0;
    }

    .submenu li a {
      padding-left: 60px;
      font-size: 0.9em;
      color: #444;
      text-decoration: none;
      display: block;
    }

    .submenu li a:hover {
      color: #007bff;
    }

    .submenu li a.active {
      color: #007bff;
      background-color: #e3f2fd;
      font-weight: 500;
    }

    /* Dashboard ve diğer tek seviye menüler için */
    .menu-list li a.active {
      color: #007bff;
      background-color: #e3f2fd;
      font-weight: 500;
    }
  `]
})
export class SidebarComponent {
  // @Input() currentUser: User | null = null;
  currentUser = {
    name: 'Admin User',
    role: 'admin'
  };
  
  expandedItems: { [key: string]: boolean } = {};

  menuItems = {
    klinik: [
      {
        name: 'Hasta İşlemleri',
        icon: 'people',
        faIcon: 'fa-users',
        key: 'hasta-islemleri',
        children: [
          { name: 'Hasta Arama', icon: 'search', route: '/hasta-arama' },
          { name: 'Hasta Kayıt', icon: 'person_add', route: '/hasta-kayit' },
          { name: 'Hasta Listeleme', icon: 'list', route: '/hasta-listeleme' },
          { name: 'Hasta Kabul', icon: 'how_to_reg', route: '/hasta-kabul' },
          { name: 'Taburcu İşlemleri', icon: 'exit_to_app', route: '/taburcu' }
        ]
      },
      {
        name: 'Poliklinik',
        icon: 'medical_services',
        faIcon: 'fa-stethoscope',
        key: 'poliklinik',
        children: [
          { name: 'Randevu Sistemi', icon: 'calendar_today', route: '/poliklinik' },
          { name: 'Doktor Programı', icon: 'schedule', route: '/doktor-programi' },
          { name: 'Muayene Ekranı', icon: 'healing', route: '/muayene' },
          { name: 'Reçete Yazma', icon: 'receipt_long', route: '/recete' }
        ]
      },
      {
        name: 'Laboratuvar',
        icon: 'science',
        faIcon: 'fa-flask-vial',
        key: 'laboratuvar',
        children: [
          { name: 'Laborant Ekranı', icon: 'biotech', route: '/laborant-ekrani' },
          { name: 'Test Sonuçları', icon: 'assignment', route: '/test-sonuclari' },
          { name: 'Test Talep', icon: 'add_task', route: '/test-talep' },
          { name: 'Numune Takip', icon: 'track_changes', route: '/numune-takip' }
        ]
      },
      {
        name: 'Radyoloji',
        icon: 'camera_alt',
        faIcon: 'fa-x-ray',
        key: 'radyoloji',
        children: [
          { name: 'Çekim İsteği', icon: 'add_a_photo', route: '/radyoloji-istek' },
          { name: 'Görüntü Sonuçları', icon: 'image', route: '/radyoloji-sonuc' },
          { name: 'PACS Sistemi', icon: 'computer', route: '/pacs' },
          { name: 'Rapor Yazma', icon: 'description', route: '/rapor-yazma' }
        ]
      }
    ],
    idari: [
      {
        name: 'Mali İşler',
        icon: 'account_balance',
        faIcon: 'fa-building-columns',
        key: 'mali-isler',
        children: [
          { name: 'Mali Raporlar', icon: 'receipt', route: '/muhasebe' },
          { name: 'Fatura Kesim', icon: 'receipt_long', route: '/fatura-kesim' },
          { name: 'Tahsilat', icon: 'payment', route: '/tahsilat' },
          { name: 'Gider Takip', icon: 'money_off', route: '/gider-takip' },
          { name: 'Bütçe Planlama', icon: 'account_balance_wallet', route: '/butce' }
        ]
      },
      {
        name: 'İnsan Kaynakları',
        icon: 'people',
        faIcon: 'fa-user-tie',
        key: 'insan-kaynaklari',
        children: [
          { name: 'Personel Yönetimi', icon: 'person_add', route: '/insan-kaynaklari' },
          { name: 'Personel Dosyası', icon: 'folder_shared', route: '/personel-dosya' },
          { name: 'İzin Takip', icon: 'event_available', route: '/izin-takip' },
          { name: 'Vardiya Planlama', icon: 'schedule', route: '/vardiya-planlama' },
          { name: 'Performans Değerlendirme', icon: 'trending_up', route: '/performans' }
        ]
      },
      {
        name: 'Stok Yönetimi',
        icon: 'inventory',
        faIcon: 'fa-boxes-stacked',
        key: 'stok-yonetimi',
        children: [
          { name: 'Envanter', icon: 'storage', route: '/stok-yonetimi' },
          { name: 'Malzeme Girişi', icon: 'add_box', route: '/malzeme-girisi' },
          { name: 'Malzeme Çıkışı', icon: 'remove_shopping_cart', route: '/malzeme-cikisi' },
          { name: 'Tedarikçi Yönetimi', icon: 'business', route: '/tedarikci' },
          { name: 'Sipariş Takip', icon: 'local_shipping', route: '/siparis-takip' }
        ]
      },
      {
        name: 'Raporlama',
        icon: 'assessment',
        faIcon: 'fa-chart-pie',
        key: 'raporlama',
        children: [
          { name: 'Mali Raporlar', icon: 'trending_up', route: '/mali-raporlar' },
          { name: 'Hasta İstatistikleri', icon: 'bar_chart', route: '/hasta-istatistik' },
          { name: 'Performans Analizi', icon: 'insights', route: '/performans-analizi' }
        ]
      }
    ]
  };

  toggleMenu(key: string) {
    console.log('CLICKED! Key:', key);
    this.expandedItems[key] = !this.expandedItems[key];
    console.log('Toggle menu:', key, 'New state:', this.expandedItems[key]);
    console.log('All expanded items:', this.expandedItems);
  }

  isExpanded(key: string): boolean {
    return !!this.expandedItems[key];
  }

  getExpandIcon(key: string): string {
    return this.isExpanded(key) ? 'expand_less' : 'expand_more';
  }

  getRoleDisplayName(role: string | undefined): string {
    const roleMap: { [key: string]: string } = {
      'doktor': 'Doktor',
      'laborant': 'Laborant', 
      'mali_personel': 'Mali Personel',
      'admin': 'Sistem Yöneticisi'
    };
    return role ? roleMap[role] || role : '';
  }
}

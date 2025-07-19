import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressBarModule,
    MatTableModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Tarih bilgisi
  tarih = new Date();

  // Dashboard istatistikleri
  istatistikler = {
    gunlukHasta: 145,
    bekleyenRandevu: 28,
    aktifTetkik: 15,
    tamamlananIslem: 89,
    gelirToplami: 45780
  };

  // Son aktiviteler
  sonAktiviteler = [
    {
      id: 1,
      tip: 'Radyoloji',
      aciklama: 'Yeni BT tarama isteği oluşturuldu',
      hasta: 'Ali Yılmaz',
      zaman: '2 dakika önce',
      icon: 'medical_services'
    },
    {
      id: 2,
      tip: 'Randevu',
      aciklama: 'Kardiyoloji randevusu onaylandı',
      hasta: 'Fatma Demir',
      zaman: '5 dakika önce',
      icon: 'event'
    },
    {
      id: 3,
      tip: 'Hasta',
      aciklama: 'Yeni hasta kaydı tamamlandı',
      hasta: 'Mehmet Özkan',
      zaman: '10 dakika önce',
      icon: 'person_add'
    },
    {
      id: 4,
      tip: 'Rapor',
      aciklama: 'MR raporu onaylandı',
      hasta: 'Ayşe Kaya',
      zaman: '15 dakika önce',
      icon: 'description'
    }
  ];

  // Bölüm performansı
  bolumPerformansi = [
    { bolum: 'Radyoloji', gunlukHedef: 50, gerceklesen: 42, yuzde: 84 },
    { bolum: 'Kardiyoloji', gunlukHedef: 30, gerceklesen: 28, yuzde: 93 },
    { bolum: 'Nöroloji', gunlukHedef: 25, gerceklesen: 20, yuzde: 80 },
    { bolum: 'Ortopedi', gunlukHedef: 35, gerceklesen: 31, yuzde: 89 }
  ];

  constructor() { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Gerçek uygulamada burada API çağrıları yapılacak
    console.log('Dashboard verileri yüklendi');
  }

  getPerformanceColor(yuzde: number): string {
    if (yuzde >= 90) return 'primary';
    if (yuzde >= 80) return 'accent';
    return 'warn';
  }

  getActivityIcon(tip: string): string {
    const iconMap: { [key: string]: string } = {
      'Radyoloji': 'medical_services',
      'Randevu': 'event',
      'Hasta': 'people',
      'Rapor': 'description'
    };
    return iconMap[tip] || 'info';
  }
}

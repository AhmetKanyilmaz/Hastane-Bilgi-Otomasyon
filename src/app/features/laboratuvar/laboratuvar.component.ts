import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { LabService } from './lab.service';
import { LabIslem } from '../../models/laboratuvar.model';

@Component({
  selector: 'app-laboratuvar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatCardModule, 
    MatIconModule, 
    MatButtonModule, 
    MatGridListModule,
    MatChipsModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatBadgeModule
  ],
  template: `
    <div class="laboratuvar-container">
      <mat-card class="header-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>biotech</mat-icon>
            Laboratuvar Yönetim Sistemi
          </mat-card-title>
          <mat-card-subtitle>Laboratuvar testleri, sonuçları ve raporlama</mat-card-subtitle>
        </mat-card-header>
      </mat-card>

      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon color="primary">assignment</mat-icon>
              <div class="stat-info">
                <div class="stat-number">{{istatistikler.bekleyenTest}}</div>
                <div class="stat-label">Bekleyen Test</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon color="accent">schedule</mat-icon>
              <div class="stat-info">
                <div class="stat-number">{{istatistikler.islemeAlindi}}</div>
                <div class="stat-label">İşleme Alındı</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon color="warn">check_circle</mat-icon>
              <div class="stat-info">
                <div class="stat-number">{{istatistikler.tamamlandi}}</div>
                <div class="stat-label">Tamamlandı</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-tab-group class="main-tabs">
        <!-- İş Listesi Tab -->
        <mat-tab label="İş Listesi ({{bekleyenIslemler.length}})">
          <div class="tab-content">
            <div class="filter-section">
              <mat-form-field appearance="outline">
                <mat-label>Durum Filtresi</mat-label>
                <mat-select [(value)]="selectedDurum" (selectionChange)="filterIslemler()">
                  <mat-option value="">Tümü</mat-option>
                  <mat-option value="Bekliyor">Bekliyor</mat-option>
                  <mat-option value="Örnek Alındı">Örnek Alındı</mat-option>
                  <mat-option value="İşlemde">İşlemde</mat-option>
                  <mat-option value="Tamamlandı">Tamamlandı</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Kategori</mat-label>
                <mat-select [(value)]="selectedKategori" (selectionChange)="filterIslemler()">
                  <mat-option value="">Tümü</mat-option>
                  <mat-option value="Hematoloji">Hematoloji</mat-option>
                  <mat-option value="Biyokimya">Biyokimya</mat-option>
                  <mat-option value="Mikrobiyoloji">Mikrobiyoloji</mat-option>
                </mat-select>
              </mat-form-field>
            </div>

            <mat-table [dataSource]="filteredIslemler" class="lab-table">
              <ng-container matColumnDef="barkod">
                <mat-header-cell *matHeaderCellDef>Barkod</mat-header-cell>
                <mat-cell *matCellDef="let islem">{{islem.barkod}}</mat-cell>
              </ng-container>

              <ng-container matColumnDef="hasta">
                <mat-header-cell *matHeaderCellDef>Hasta</mat-header-cell>
                <mat-cell *matCellDef="let islem">
                  <div class="hasta-info">
                    <div>{{islem.hasta.ad}} {{islem.hasta.soyad}}</div>
                    <div class="tc-no">{{islem.hasta.tcKimlik}}</div>
                  </div>
                </mat-cell>
              </ng-container>

              <ng-container matColumnDef="test">
                <mat-header-cell *matHeaderCellDef>Test</mat-header-cell>
                <mat-cell *matCellDef="let islem">
                  <div class="test-info">
                    <div class="test-name">{{islem.testAdi}}</div>
                    <mat-chip class="kategori-chip">{{islem.kategori}}</mat-chip>
                  </div>
                </mat-cell>
              </ng-container>

              <ng-container matColumnDef="doktor">
                <mat-header-cell *matHeaderCellDef>Doktor</mat-header-cell>
                <mat-cell *matCellDef="let islem">
                  <div>{{islem.doktor}}</div>
                  <div class="departman">{{islem.departman}}</div>
                </mat-cell>
              </ng-container>

              <ng-container matColumnDef="durum">
                <mat-header-cell *matHeaderCellDef>Durum</mat-header-cell>
                <mat-cell *matCellDef="let islem">
                  <mat-chip [ngClass]="getDurumClass(islem.durum)" 
                           [matBadge]="islem.oncelik === 'Acil' ? '!' : ''"
                           matBadgeColor="warn"
                           [matBadgeHidden]="islem.oncelik === 'Normal'">
                    {{islem.durum}}
                  </mat-chip>
                </mat-cell>
              </ng-container>

              <ng-container matColumnDef="actions">
                <mat-header-cell *matHeaderCellDef>İşlemler</mat-header-cell>
                <mat-cell *matCellDef="let islem">
                  <button mat-icon-button color="primary" (click)="processIslem(islem)" 
                          [disabled]="islem.durum === 'Tamamlandı'">
                    <mat-icon>play_arrow</mat-icon>
                  </button>
                  <button mat-icon-button color="accent" (click)="viewDetails(islem)">
                    <mat-icon>visibility</mat-icon>
                  </button>
                </mat-cell>
              </ng-container>

              <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
              <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
            </mat-table>
          </div>
        </mat-tab>

        <!-- Laborant Ekranı Tab -->
        <mat-tab label="Laborant Ekranı">
          <div class="tab-content">
            <div class="laborant-portal">
              <mat-card class="portal-card">
                <mat-card-header>
                  <mat-card-title>
                    <mat-icon>science</mat-icon>
                    Laborant Çalışma Alanı
                  </mat-card-title>
                  <mat-card-subtitle>Test sonuçlarını girin ve onaylayın</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <p>Tam fonksiyonel laborant ekranında test işlemlerinizi yönetin.</p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-raised-button color="primary" routerLink="/laborant-ekrani">
                    <mat-icon>launch</mat-icon>
                    Laborant Ekranını Aç
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- Raporlar Tab -->
        <mat-tab label="Raporlar">
          <div class="tab-content">
            <div class="reports-grid">
              <mat-card class="report-card">
                <mat-card-header>
                  <mat-card-title>
                    <mat-icon>bar_chart</mat-icon>
                    Günlük Rapor
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>Bugünün test istatistikleri ve performans raporu</p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-raised-button color="primary">
                    <mat-icon>download</mat-icon>
                    Rapor Al
                  </button>
                </mat-card-actions>
              </mat-card>

              <mat-card class="report-card">
                <mat-card-header>
                  <mat-card-title>
                    <mat-icon>timeline</mat-icon>
                    Haftalık Analiz
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>Son 7 günün test hacmi ve trend analizi</p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-raised-button color="accent">
                    <mat-icon>analytics</mat-icon>
                    Analiz Görüntüle
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .laboratuvar-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header-card {
      margin-bottom: 30px;
      background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%);
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

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }

    .stat-card {
      transition: transform 0.2s ease;
    }

    .stat-card:hover {
      transform: translateY(-3px);
    }

    .stat-content {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .stat-info {
      flex: 1;
    }

    .stat-number {
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }

    .stat-label {
      font-size: 14px;
      color: #666;
    }

    .main-tabs {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .tab-content {
      padding: 20px;
      min-height: 400px;
    }

    .filter-section {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .filter-section mat-form-field {
      min-width: 150px;
    }

    .lab-table {
      width: 100%;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .hasta-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .tc-no {
      font-size: 12px;
      color: #666;
    }

    .test-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .test-name {
      font-weight: 500;
    }

    .kategori-chip {
      font-size: 11px;
      height: 20px;
      line-height: 20px;
    }

    .departman {
      font-size: 12px;
      color: #666;
    }

    .durum-bekliyor { background-color: #fff3cd; color: #856404; }
    .durum-ornek-alindi { background-color: #cce5ff; color: #004085; }
    .durum-islemde { background-color: #d4edda; color: #155724; }
    .durum-tamamlandi { background-color: #d1ecf1; color: #0c5460; }

    .laborant-portal {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
    }

    .portal-card {
      max-width: 400px;
      text-align: center;
    }

    .portal-card mat-card-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .report-card {
      transition: transform 0.2s ease;
    }

    .report-card:hover {
      transform: translateY(-3px);
    }

    .report-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    @media (max-width: 768px) {
      .filter-section {
        flex-direction: column;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LaboratuvarComponent implements OnInit {

  istatistikler = {
    bekleyenTest: 24,
    islemeAlindi: 18,
    tamamlandi: 45
  };

  labIslemleri: LabIslem[] = [];
  bekleyenIslemler: LabIslem[] = [];
  filteredIslemler: LabIslem[] = [];
  
  selectedDurum: string = '';
  selectedKategori: string = '';

  displayedColumns: string[] = ['barkod', 'hasta', 'test', 'doktor', 'durum', 'actions'];

  constructor(private labService: LabService) { }

  ngOnInit(): void {
    console.log('Laboratuvar modülü yüklendi');
    this.loadLabIslemleri();
  }

  loadLabIslemleri(): void {
    this.labService.getLabIslemleri().subscribe(islemler => {
      this.labIslemleri = islemler;
      this.bekleyenIslemler = islemler.filter(i => i.durum !== 'Tamamlandı');
      this.filteredIslemler = islemler;
      this.updateIstatistikler();
    });
  }

  filterIslemler(): void {
    this.filteredIslemler = this.labIslemleri.filter(islem => {
      const durumMatch = !this.selectedDurum || islem.durum === this.selectedDurum;
      const kategoriMatch = !this.selectedKategori || islem.kategori === this.selectedKategori;
      return durumMatch && kategoriMatch;
    });
  }

  getDurumClass(durum: string): string {
    return `durum-${durum.toLowerCase().replace(/\s+/g, '-')}`;
  }

  processIslem(islem: LabIslem): void {
    console.log('İşlem başlatılıyor:', islem);
    // Burada işlem durumu güncellenecek
    if (islem.durum === 'Bekliyor') {
      islem.durum = 'Örnek Alındı';
    } else if (islem.durum === 'Örnek Alındı') {
      islem.durum = 'İşlemde';
    } else if (islem.durum === 'İşlemde') {
      islem.durum = 'Tamamlandı';
    }
    this.updateIstatistikler();
  }

  viewDetails(islem: LabIslem): void {
    console.log('Detaylar görüntüleniyor:', islem);
    // Burada detay modalı açılacak
  }

  private updateIstatistikler(): void {
    this.istatistikler = {
      bekleyenTest: this.labIslemleri.filter(i => i.durum === 'Bekliyor').length,
      islemeAlindi: this.labIslemleri.filter(i => i.durum === 'İşlemde' || i.durum === 'Örnek Alındı').length,
      tamamlandi: this.labIslemleri.filter(i => i.durum === 'Tamamlandı').length
    };
  }
}

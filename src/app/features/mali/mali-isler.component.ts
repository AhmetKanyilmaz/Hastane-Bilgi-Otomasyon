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
import { FaturalandirmaService } from '../faturalama/faturalama.service';
import { Fatura } from '../../models/fatura.model';

@Component({
  selector: 'app-mali-isler',
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
    <div class="mali-container">
      <mat-card class="header-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon>account_balance</mat-icon>
            Mali İşler Yönetim Sistemi
          </mat-card-title>
          <mat-card-subtitle>Faturalandırma, tahsilat ve mali raporlar</mat-card-subtitle>
        </mat-card-header>
      </mat-card>

      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon color="primary">attach_money</mat-icon>
              <div class="stat-info">
                <div class="stat-number">{{istatistikler.gunlukGelir | currency:'TRY':'symbol':'1.0-0'}}</div>
                <div class="stat-label">Günlük Gelir</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon color="accent">receipt</mat-icon>
              <div class="stat-info">
                <div class="stat-number">{{bekleyenFaturalar.length}}</div>
                <div class="stat-label">Bekleyen Fatura</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon color="warn">payment</mat-icon>
              <div class="stat-info">
                <div class="stat-number">{{istatistikler.bekleyenTahsilat | currency:'TRY':'symbol':'1.0-0'}}</div>
                <div class="stat-label">Bekleyen Tahsilat</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon>trending_up</mat-icon>
              <div class="stat-info">
                <div class="stat-number">{{istatistikler.aylikGelir | currency:'TRY':'symbol':'1.0-0'}}</div>
                <div class="stat-label">Aylık Gelir</div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-tab-group class="main-tabs">
        <!-- Fatura Yönetimi Tab -->
        <mat-tab label="Fatura Yönetimi ({{bekleyenFaturalar.length}})">
          <div class="tab-content">
            <div class="filter-section">
              <mat-form-field appearance="outline">
                <mat-label>Durum Filtresi</mat-label>
                <mat-select [(value)]="selectedDurum" (selectionChange)="filterFaturalar()">
                  <mat-option value="">Tümü</mat-option>
                  <mat-option value="Bekliyor">Bekliyor</mat-option>
                  <mat-option value="Ödendi">Ödendi</mat-option>
                  <mat-option value="Kısmen Ödendi">Kısmen Ödendi</mat-option>
                  <mat-option value="İptal">İptal</mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Sigorta Tipi</mat-label>
                <mat-select [(value)]="selectedSigorta" (selectionChange)="filterFaturalar()">
                  <mat-option value="">Tümü</mat-option>
                  <mat-option value="SGK">SGK</mat-option>
                  <mat-option value="Özel">Özel Sigorta</mat-option>
                  <mat-option value="Yok">Sigortasız</mat-option>
                </mat-select>
              </mat-form-field>

              <button mat-raised-button color="primary" (click)="yeniFaturaOlustur()">
                <mat-icon>add</mat-icon>
                Yeni Fatura
              </button>
            </div>

            <mat-table [dataSource]="filteredFaturalar" class="fatura-table">
              <ng-container matColumnDef="faturaNo">
                <mat-header-cell *matHeaderCellDef>Fatura No</mat-header-cell>
                <mat-cell *matCellDef="let fatura">{{fatura.faturaNo}}</mat-cell>
              </ng-container>

              <ng-container matColumnDef="hasta">
                <mat-header-cell *matHeaderCellDef>Hasta</mat-header-cell>
                <mat-cell *matCellDef="let fatura">
                  <div class="hasta-info">
                    <div>{{fatura.hasta.ad}} {{fatura.hasta.soyad}}</div>
                    <div class="tc-no">{{fatura.hasta.tcKimlik}}</div>
                  </div>
                </mat-cell>
              </ng-container>

              <ng-container matColumnDef="tarih">
                <mat-header-cell *matHeaderCellDef>Tarih</mat-header-cell>
                <mat-cell *matCellDef="let fatura">{{fatura.tarih | date:'dd.MM.yyyy'}}</mat-cell>
              </ng-container>

              <ng-container matColumnDef="tutar">
                <mat-header-cell *matHeaderCellDef>Tutar</mat-header-cell>
                <mat-cell *matCellDef="let fatura">
                  <div class="tutar-info">
                    <div class="toplam-tutar">{{fatura.toplamTutar | currency:'TRY':'symbol':'1.2-2'}}</div>
                    <div class="kalan-tutar" *ngIf="fatura.kalanTutar > 0">
                      Kalan: {{fatura.kalanTutar | currency:'TRY':'symbol':'1.2-2'}}
                    </div>
                  </div>
                </mat-cell>
              </ng-container>

              <ng-container matColumnDef="sigorta">
                <mat-header-cell *matHeaderCellDef>Sigorta</mat-header-cell>
                <mat-cell *matCellDef="let fatura">
                  <mat-chip [ngClass]="getSigortaClass(fatura.sigorta.tip)">
                    {{fatura.sigorta.tip}}
                  </mat-chip>
                </mat-cell>
              </ng-container>

              <ng-container matColumnDef="durum">
                <mat-header-cell *matHeaderCellDef>Durum</mat-header-cell>
                <mat-cell *matCellDef="let fatura">
                  <mat-chip [ngClass]="getDurumClass(fatura.durum)">
                    {{fatura.durum}}
                  </mat-chip>
                </mat-cell>
              </ng-container>

              <ng-container matColumnDef="actions">
                <mat-header-cell *matHeaderCellDef>İşlemler</mat-header-cell>
                <mat-cell *matCellDef="let fatura">
                  <button mat-icon-button color="primary" (click)="odemeAl(fatura)" 
                          [disabled]="fatura.durum === 'Ödendi'">
                    <mat-icon>payment</mat-icon>
                  </button>
                  <button mat-icon-button color="accent" (click)="faturaDetay(fatura)">
                    <mat-icon>visibility</mat-icon>
                  </button>
                  <button mat-icon-button (click)="faturaYazdir(fatura)">
                    <mat-icon>print</mat-icon>
                  </button>
                </mat-cell>
              </ng-container>

              <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
              <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
            </mat-table>
          </div>
        </mat-tab>

        <!-- Muhasebe Ekranı Tab -->
        <mat-tab label="Muhasebe Ekranı">
          <div class="tab-content">
            <div class="muhasebe-portal">
              <mat-card class="portal-card">
                <mat-card-header>
                  <mat-card-title>
                    <mat-icon>account_balance</mat-icon>
                    Muhasebe Çalışma Alanı
                  </mat-card-title>
                  <mat-card-subtitle>Tam fonksiyonel muhasebe işlemlerinizi yönetin</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <p>Faturalandırma, tahsilat, SGK bildirimleri ve mali raporlama</p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-raised-button color="primary" routerLink="/muhasebe-ekrani">
                    <mat-icon>launch</mat-icon>
                    Muhasebe Ekranını Aç
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- SGK İşlemleri Tab -->
        <mat-tab label="SGK İşlemleri">
          <div class="tab-content">
            <div class="sgk-grid">
              <mat-card class="sgk-card">
                <mat-card-header>
                  <mat-card-title>
                    <mat-icon>send</mat-icon>
                    Bekleyen Bildirimler
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="sgk-stat">
                    <span class="sgk-number">{{sgkBekleyenSayisi}}</span>
                    <span class="sgk-label">Bildirim</span>
                  </div>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-raised-button color="primary">
                    <mat-icon>upload</mat-icon>
                    Gönder
                  </button>
                </mat-card-actions>
              </mat-card>

              <mat-card class="sgk-card">
                <mat-card-header>
                  <mat-card-title>
                    <mat-icon>check_circle</mat-icon>
                    Onaylanan Bildirimler
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="sgk-stat">
                    <span class="sgk-number">{{sgkOnanlanSayisi}}</span>
                    <span class="sgk-label">Onaylandı</span>
                  </div>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-raised-button color="accent">
                    <mat-icon>list</mat-icon>
                    Listele
                  </button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- Raporlar Tab -->
        <mat-tab label="Mali Raporlar">
          <div class="tab-content">
            <div class="reports-grid">
              <mat-card class="report-card">
                <mat-card-header>
                  <mat-card-title>
                    <mat-icon>bar_chart</mat-icon>
                    Günlük Gelir Raporu
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>Bugünün gelir dağılımı ve tahsilat özeti</p>
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
                    Aylık Analiz
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>Son 30 günün gelir trendi ve tahsilat performansı</p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-raised-button color="accent">
                    <mat-icon>analytics</mat-icon>
                    Analiz Görüntüle
                  </button>
                </mat-card-actions>
              </mat-card>

              <mat-card class="report-card">
                <mat-card-header>
                  <mat-card-title>
                    <mat-icon>account_balance_wallet</mat-icon>
                    Kasa Raporu
                  </mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>Nakit, kredi kartı ve sigorta tahsilatları</p>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-raised-button color="warn">
                    <mat-icon>account_balance</mat-icon>
                    Kasa Özeti
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
    .mali-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header-card {
      margin-bottom: 30px;
      background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
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
      align-items: center;
    }

    .filter-section mat-form-field {
      min-width: 150px;
    }

    .fatura-table {
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

    .tutar-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .toplam-tutar {
      font-weight: 500;
    }

    .kalan-tutar {
      font-size: 12px;
      color: #f44336;
    }

    .durum-bekliyor { background-color: #fff3cd; color: #856404; }
    .durum-odendi { background-color: #d4edda; color: #155724; }
    .durum-kismen-odendi { background-color: #d1ecf1; color: #0c5460; }
    .durum-iptal { background-color: #f8d7da; color: #721c24; }

    .sigorta-sgk { background-color: #cce5ff; color: #004085; }
    .sigorta-ozel { background-color: #e2e3ff; color: #383d41; }
    .sigorta-yok { background-color: #e2e2e2; color: #495057; }

    .muhasebe-portal {
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

    .sgk-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .sgk-card {
      transition: transform 0.2s ease;
    }

    .sgk-card:hover {
      transform: translateY(-3px);
    }

    .sgk-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .sgk-stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 20px 0;
    }

    .sgk-number {
      font-size: 32px;
      font-weight: 600;
      color: #333;
    }

    .sgk-label {
      font-size: 14px;
      color: #666;
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
        align-items: stretch;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }

      .sgk-grid, .reports-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class MaliIslerComponent implements OnInit {

  istatistikler = {
    gunlukGelir: 45780,
    bekleyenTahsilat: 23450,
    aylikGelir: 1245000
  };

  faturalar: Fatura[] = [];
  bekleyenFaturalar: Fatura[] = [];
  filteredFaturalar: Fatura[] = [];
  
  selectedDurum: string = '';
  selectedSigorta: string = '';

  displayedColumns: string[] = ['faturaNo', 'hasta', 'tarih', 'tutar', 'sigorta', 'durum', 'actions'];

  sgkBekleyenSayisi = 8;
  sgkOnanlanSayisi = 156;

  constructor(private faturalandirmaService: FaturalandirmaService) { }

  ngOnInit(): void {
    console.log('Mali İşler modülü yüklendi');
    this.loadFaturalar();
  }

  loadFaturalar(): void {
    this.faturalandirmaService.getFaturalar().subscribe(faturalar => {
      this.faturalar = faturalar;
      this.bekleyenFaturalar = faturalar.filter(f => f.durum !== 'Ödendi' && f.durum !== 'İptal');
      this.filteredFaturalar = faturalar;
    });
  }

  filterFaturalar(): void {
    this.filteredFaturalar = this.faturalar.filter(fatura => {
      const durumMatch = !this.selectedDurum || fatura.durum === this.selectedDurum;
      const sigortaMatch = !this.selectedSigorta || fatura.sigorta.tip === this.selectedSigorta;
      return durumMatch && sigortaMatch;
    });
  }

  getDurumClass(durum: string): string {
    return `durum-${durum.toLowerCase().replace(/\s+/g, '-')}`;
  }

  getSigortaClass(sigorta: string): string {
    return `sigorta-${sigorta.toLowerCase()}`;
  }

  yeniFaturaOlustur(): void {
    console.log('Yeni fatura oluşturuluyor');
    // Burada yeni fatura modalı açılacak
  }

  odemeAl(fatura: Fatura): void {
    console.log('Ödeme alınıyor:', fatura);
    // Burada ödeme modalı açılacak
  }

  faturaDetay(fatura: Fatura): void {
    console.log('Fatura detayı:', fatura);
    // Burada fatura detay modalı açılacak
  }

  faturaYazdir(fatura: Fatura): void {
    console.log('Fatura yazdırılıyor:', fatura);
    // Burada fatura yazdırma işlemi
  }
}

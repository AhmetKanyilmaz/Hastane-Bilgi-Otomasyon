import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { FaturalandirmaService } from './faturalama.service';
import { Fatura, FaturaItem, MaliRapor } from '../../models/fatura.model';

@Component({
  selector: 'app-muhasebe-ekrani',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatBadgeModule,
    MatDividerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatGridListModule
  ],
  template: `
    <div class="muhasebe-ekrani-container">
      <div class="header-section">
        <h1 class="page-title">
          <mat-icon>account_balance</mat-icon>
          Mali İşler - Muhasebe Ekranı
        </h1>
        <p class="page-subtitle">Faturalandırma, tahsilat ve SGK işlemlerini buradan yönetebilirsiniz</p>
      </div>

      <!-- Mali Özet Kartları -->
      <div class="mali-ozet-section">
        <mat-grid-list cols="4" rowHeight="120px" gutterSize="16px">
          <mat-grid-tile>
            <mat-card class="ozet-card">
              <mat-card-content>
                <div class="ozet-icon">
                  <mat-icon class="icon-primary">trending_up</mat-icon>
                </div>
                <div class="ozet-info">
                  <div class="ozet-number">₺{{ maliRapor?.gunlukGelir | number:'1.2-2' }}</div>
                  <div class="ozet-label">Günlük Gelir</div>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-card class="ozet-card">
              <mat-card-content>
                <div class="ozet-icon">
                  <mat-icon class="icon-success">receipt</mat-icon>
                </div>
                <div class="ozet-info">
                  <div class="ozet-number">{{ maliRapor?.toplamFatura }}</div>
                  <div class="ozet-label">Toplam Fatura</div>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-card class="ozet-card">
              <mat-card-content>
                <div class="ozet-icon">
                  <mat-icon class="icon-warning">schedule</mat-icon>
                </div>
                <div class="ozet-info">
                  <div class="ozet-number">{{ maliRapor?.bekleyenFatura }}</div>
                  <div class="ozet-label">Bekleyen Fatura</div>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>

          <mat-grid-tile>
            <mat-card class="ozet-card">
              <mat-card-content>
                <div class="ozet-icon">
                  <mat-icon class="icon-accent">policy</mat-icon>
                </div>
                <div class="ozet-info">
                  <div class="ozet-number">₺{{ maliRapor?.sgkGelir | number:'1.2-2' }}</div>
                  <div class="ozet-label">SGK Gelir</div>
                </div>
              </mat-card-content>
            </mat-card>
          </mat-grid-tile>
        </mat-grid-list>
      </div>

      <div class="main-content">
        <mat-tab-group class="main-tabs">
          
          <!-- Fatura Yönetimi Tab -->
          <mat-tab label="Fatura Yönetimi">
            <div class="tab-content">
              <div class="fatura-controls">
                <mat-form-field appearance="outline">
                  <mat-label>Durum Filtresi</mat-label>
                  <mat-select [(value)]="selectedFaturaDurum" (selectionChange)="filterFaturalar()">
                    <mat-option value="">Tümü</mat-option>
                    <mat-option value="Bekliyor">Bekliyor</mat-option>
                    <mat-option value="Ödendi">Ödendi</mat-option>
                    <mat-option value="Kısmen Ödendi">Kısmen Ödendi</mat-option>
                  </mat-select>
                </mat-form-field>

                <button mat-raised-button color="primary" (click)="yeniFatura()">
                  <mat-icon>add</mat-icon>
                  Yeni Fatura
                </button>
              </div>

              <div class="fatura-list">
                <mat-card *ngFor="let fatura of filteredFaturalar" class="fatura-item">
                  <mat-card-header>
                    <div class="fatura-header">
                      <div class="fatura-info">
                        <h3>{{ fatura.faturaNo }}</h3>
                        <p>{{ fatura.hasta.ad }} {{ fatura.hasta.soyad }}</p>
                        <p class="fatura-tarih">{{ fatura.tarih | date:'dd.MM.yyyy HH:mm' }}</p>
                      </div>
                      
                      <div class="fatura-tutar">
                        <div class="toplam-tutar">₺{{ fatura.toplamTutar | number:'1.2-2' }}</div>
                        <div class="kalan-tutar" *ngIf="fatura.kalanTutar > 0">
                          Kalan: ₺{{ fatura.kalanTutar | number:'1.2-2' }}
                        </div>
                      </div>
                      
                      <div class="fatura-durum">
                        <mat-chip [ngClass]="getFaturaDurumClass(fatura.durum)">
                          {{ fatura.durum }}
                        </mat-chip>
                      </div>
                    </div>
                  </mat-card-header>

                  <mat-card-content>
                    <div class="fatura-detay">
                      <div class="hizmet-listesi">
                        <div *ngFor="let item of fatura.items" class="hizmet-item">
                          <span class="hizmet-ad">{{ item.ad }}</span>
                          <span class="hizmet-tutar">₺{{ item.toplam | number:'1.2-2' }}</span>
                        </div>
                      </div>

                      <div class="sigorta-bilgi">
                        <mat-chip class="sigorta-chip">
                          {{ fatura.sigorta.tip }} ({{ fatura.sigorta.orani }}%)
                        </mat-chip>
                        <span class="sigorta-tutar">₺{{ fatura.sigorta.tutari | number:'1.2-2' }}</span>
                      </div>
                    </div>
                  </mat-card-content>

                  <mat-card-actions>
                    <button mat-button (click)="faturaDetay(fatura)">
                      <mat-icon>visibility</mat-icon>
                      Detay
                    </button>
                    
                    <button mat-button color="primary" (click)="odemeAl(fatura)" 
                            [disabled]="fatura.durum === 'Ödendi'">
                      <mat-icon>payment</mat-icon>
                      Ödeme Al
                    </button>
                    
                    <button mat-button color="accent" (click)="sgkBildir(fatura)"
                            [disabled]="fatura.sigorta.tip !== 'SGK'">
                      <mat-icon>send</mat-icon>
                      SGK Bildir
                    </button>
                  </mat-card-actions>
                </mat-card>
              </div>
            </div>
          </mat-tab>

          <!-- Tahsilat Tab -->
          <mat-tab label="Tahsilat">
            <div class="tab-content">
              <div class="tahsilat-section">
                <mat-card class="odeme-form-card">
                  <mat-card-header>
                    <mat-card-title>Ödeme Al</mat-card-title>
                  </mat-card-header>
                  
                  <mat-card-content>
                    <form #odemeForm="ngForm" (ngSubmit)="processOdeme()">
                      <div class="form-row">
                        <mat-form-field appearance="outline" class="full-width">
                          <mat-label>Fatura Seç</mat-label>
                          <mat-select [(ngModel)]="selectedOdemeFatura" name="fatura" required>
                            <mat-option *ngFor="let fatura of bekleyenFaturalar" [value]="fatura">
                              {{ fatura.faturaNo }} - {{ fatura.hasta.ad }} {{ fatura.hasta.soyad }} 
                              (₺{{ fatura.kalanTutar | number:'1.2-2' }})
                            </mat-option>
                          </mat-select>
                        </mat-form-field>
                      </div>

                      <div class="form-row" *ngIf="selectedOdemeFatura">
                        <div class="fatura-ozet">
                          <p><strong>Toplam Tutar:</strong> ₺{{ selectedOdemeFatura.toplamTutar | number:'1.2-2' }}</p>
                          <p><strong>Ödenen:</strong> ₺{{ selectedOdemeFatura.odenentTutar | number:'1.2-2' }}</p>
                          <p><strong>Kalan:</strong> ₺{{ selectedOdemeFatura.kalanTutar | number:'1.2-2' }}</p>
                        </div>
                      </div>

                      <div class="form-row">
                        <mat-form-field appearance="outline">
                          <mat-label>Ödeme Tutarı</mat-label>
                          <input matInput type="number" [(ngModel)]="odemeTutari" name="tutar" 
                                 [max]="selectedOdemeFatura?.kalanTutar || 0" min="0" required>
                          <span matTextSuffix>₺</span>
                        </mat-form-field>

                        <mat-form-field appearance="outline">
                          <mat-label>Ödeme Tipi</mat-label>
                          <mat-select [(ngModel)]="odemeTipi" name="tip" required>
                            <mat-option value="Nakit">Nakit</mat-option>
                            <mat-option value="Kredi Kartı">Kredi Kartı</mat-option>
                            <mat-option value="Banka Transferi">Banka Transferi</mat-option>
                            <mat-option value="Sigorta">Sigorta</mat-option>
                          </mat-select>
                        </mat-form-field>
                      </div>

                      <div class="form-actions">
                        <button mat-raised-button color="primary" type="submit" 
                                [disabled]="!selectedOdemeFatura || !odemeTutari || !odemeTipi">
                          <mat-icon>payment</mat-icon>
                          Ödemeyi Kaydet
                        </button>
                      </div>
                    </form>
                  </mat-card-content>
                </mat-card>

                <mat-card class="gunluk-tahsilat">
                  <mat-card-header>
                    <mat-card-title>Günlük Tahsilat Özeti</mat-card-title>
                  </mat-card-header>
                  
                  <mat-card-content>
                    <div class="tahsilat-ozet">
                      <div class="ozet-item">
                        <span class="ozet-label">Toplam Tahsilat:</span>
                        <span class="ozet-deger">₺{{ maliRapor?.gunlukGelir | number:'1.2-2' }}</span>
                      </div>
                      <div class="ozet-item">
                        <span class="ozet-label">Nakit Ödeme:</span>
                        <span class="ozet-deger">₺{{ maliRapor?.nakitGelir | number:'1.2-2' }}</span>
                      </div>
                      <div class="ozet-item">
                        <span class="ozet-label">SGK Ödemeler:</span>
                        <span class="ozet-deger">₺{{ maliRapor?.sgkGelir | number:'1.2-2' }}</span>
                      </div>
                      <div class="ozet-item">
                        <span class="ozet-label">Özel Sigorta:</span>
                        <span class="ozet-deger">₺{{ maliRapor?.ozelSigortaGelir | number:'1.2-2' }}</span>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>
              </div>
            </div>
          </mat-tab>

          <!-- SGK İşlemleri Tab -->
          <mat-tab label="SGK İşlemleri">
            <div class="tab-content">
              <div class="sgk-section">
                <mat-card class="sgk-bildirim-card">
                  <mat-card-header>
                    <mat-card-title>SGK Bildirimleri</mat-card-title>
                  </mat-card-header>
                  
                  <mat-card-content>
                    <div class="sgk-list">
                      <div *ngFor="let bildirim of sgkBildirimleri" class="sgk-item">
                        <div class="bildirim-info">
                          <div class="bildirim-id">{{ bildirim.id }}</div>
                          <div class="bildirim-tarih">{{ bildirim.bildirimTarihi | date:'dd.MM.yyyy HH:mm' }}</div>
                          <div class="bildirim-aciklama">{{ bildirim.aciklama }}</div>
                        </div>
                        
                        <div class="bildirim-tutar">
                          ₺{{ bildirim.tutari | number:'1.2-2' }}
                        </div>
                        
                        <div class="bildirim-durum">
                          <mat-chip [ngClass]="getSGKDurumClass(bildirim.durum)">
                            {{ bildirim.durum }}
                          </mat-chip>
                        </div>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>

                <mat-card class="sgk-ozet">
                  <mat-card-header>
                    <mat-card-title>SGK Özeti</mat-card-title>
                  </mat-card-header>
                  
                  <mat-card-content>
                    <div class="sgk-istatistik">
                      <div class="istatistik-item">
                        <mat-icon>schedule</mat-icon>
                        <div class="item-info">
                          <div class="item-sayi">{{ getBekleyenSGKSayisi() }}</div>
                          <div class="item-label">Bekleyen Bildirim</div>
                        </div>
                      </div>
                      
                      <div class="istatistik-item">
                        <mat-icon>check_circle</mat-icon>
                        <div class="item-info">
                          <div class="item-sayi">{{ getOnaymananSGKSayisi() }}</div>
                          <div class="item-label">Onaylanan</div>
                        </div>
                      </div>
                      
                      <div class="istatistik-item">
                        <mat-icon>monetization_on</mat-icon>
                        <div class="item-info">
                          <div class="item-sayi">₺{{ getToplSGKTutar() | number:'1.2-2' }}</div>
                          <div class="item-label">Toplam SGK Tutar</div>
                        </div>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>
              </div>
            </div>
          </mat-tab>

          <!-- Raporlar Tab -->
          <mat-tab label="Mali Raporlar">
            <div class="tab-content">
              <div class="rapor-section">
                <mat-card class="rapor-card">
                  <mat-card-header>
                    <mat-card-title>Günlük Mali Rapor</mat-card-title>
                    <mat-card-subtitle>{{ maliRapor?.tarih | date:'dd.MM.yyyy' }}</mat-card-subtitle>
                  </mat-card-header>
                  
                  <mat-card-content>
                    <div class="rapor-detay">
                      <div class="rapor-grid">
                        <div class="rapor-item">
                          <div class="rapor-baslik">Gelir Analizi</div>
                          <div class="rapor-veri">
                            <div class="veri-satir">
                              <span>Toplam Günlük Gelir:</span>
                              <span class="veri-deger">₺{{ maliRapor?.gunlukGelir | number:'1.2-2' }}</span>
                            </div>
                            <div class="veri-satir">
                              <span>SGK Gelir:</span>
                              <span class="veri-deger">₺{{ maliRapor?.sgkGelir | number:'1.2-2' }}</span>
                            </div>
                            <div class="veri-satir">
                              <span>Özel Sigorta Gelir:</span>
                              <span class="veri-deger">₺{{ maliRapor?.ozelSigortaGelir | number:'1.2-2' }}</span>
                            </div>
                            <div class="veri-satir">
                              <span>Nakit Gelir:</span>
                              <span class="veri-deger">₺{{ maliRapor?.nakitGelir | number:'1.2-2' }}</span>
                            </div>
                          </div>
                        </div>

                        <div class="rapor-item">
                          <div class="rapor-baslik">Fatura İstatistikleri</div>
                          <div class="rapor-veri">
                            <div class="veri-satir">
                              <span>Toplam Fatura:</span>
                              <span class="veri-deger">{{ maliRapor?.toplamFatura }}</span>
                            </div>
                            <div class="veri-satir">
                              <span>Ödenen Fatura:</span>
                              <span class="veri-deger">{{ maliRapor?.odenenFatura }}</span>
                            </div>
                            <div class="veri-satir">
                              <span>Bekleyen Fatura:</span>
                              <span class="veri-deger">{{ maliRapor?.bekleyenFatura }}</span>
                            </div>
                            <div class="veri-satir">
                              <span>Ödeme Oranı:</span>
                              <span class="veri-deger">{{ getOdemeOrani() }}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </mat-card-content>

                  <mat-card-actions>
                    <button mat-button color="primary">
                      <mat-icon>print</mat-icon>
                      Raporu Yazdır
                    </button>
                    
                    <button mat-button color="accent">
                      <mat-icon>file_download</mat-icon>
                      Excel İndir
                    </button>
                  </mat-card-actions>
                </mat-card>
              </div>
            </div>
          </mat-tab>

        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    .muhasebe-ekrani-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header-section {
      margin-bottom: 30px;
      text-align: center;
    }

    .page-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      font-size: 28px;
      font-weight: 500;
      color: #333;
      margin: 0 0 8px 0;
    }

    .page-title mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #ff9800;
    }

    .page-subtitle {
      color: #666;
      margin: 0;
    }

    .mali-ozet-section {
      margin-bottom: 30px;
    }

    .ozet-card {
      width: 100%;
      height: 100%;
      padding: 0;
    }

    .ozet-card mat-card-content {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      height: 100%;
    }

    .ozet-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .icon-primary { color: #1976d2; }
    .icon-success { color: #4caf50; }
    .icon-warning { color: #ff9800; }
    .icon-accent { color: #e91e63; }

    .ozet-info {
      flex: 1;
    }

    .ozet-number {
      font-size: 24px;
      font-weight: 600;
      color: #333;
    }

    .ozet-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .main-content {
      margin-top: 30px;
    }

    .main-tabs {
      background-color: white;
      border-radius: 8px;
    }

    .tab-content {
      padding: 20px;
      min-height: 600px;
    }

    .fatura-controls {
      display: flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 20px;
    }

    .fatura-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .fatura-item {
      margin: 0;
    }

    .fatura-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }

    .fatura-info h3 {
      margin: 0 0 4px 0;
      color: #333;
      font-size: 18px;
    }

    .fatura-info p {
      margin: 2px 0;
      color: #666;
      font-size: 14px;
    }

    .fatura-tarih {
      font-size: 12px !important;
      color: #999 !important;
    }

    .fatura-tutar {
      text-align: right;
      min-width: 120px;
    }

    .toplam-tutar {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .kalan-tutar {
      font-size: 12px;
      color: #f44336;
    }

    .fatura-durum {
      min-width: 100px;
      text-align: center;
    }

    .fatura-detay {
      margin-top: 16px;
    }

    .hizmet-listesi {
      margin-bottom: 12px;
    }

    .hizmet-item {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .hizmet-item:last-child {
      border-bottom: none;
    }

    .hizmet-ad {
      font-size: 14px;
      color: #333;
    }

    .hizmet-tutar {
      font-weight: 500;
      color: #666;
    }

    .sigorta-bilgi {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f8f9fa;
      padding: 8px 12px;
      border-radius: 4px;
    }

    .sigorta-tutar {
      font-weight: 500;
      color: #333;
    }

    .tahsilat-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .odeme-form-card, .gunluk-tahsilat {
      height: fit-content;
    }

    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .full-width {
      width: 100%;
    }

    .fatura-ozet {
      background-color: #f8f9fa;
      padding: 12px;
      border-radius: 4px;
      margin: 12px 0;
    }

    .fatura-ozet p {
      margin: 4px 0;
      font-size: 14px;
    }

    .form-actions {
      margin-top: 20px;
    }

    .tahsilat-ozet {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .ozet-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .ozet-item:last-child {
      border-bottom: none;
    }

    .ozet-label {
      font-size: 14px;
      color: #666;
    }

    .ozet-deger {
      font-weight: 500;
      color: #333;
    }

    .sgk-section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
    }

    .sgk-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .sgk-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      background-color: #f8f9fa;
      border-radius: 4px;
      border-left: 4px solid #1976d2;
    }

    .bildirim-info {
      flex: 1;
    }

    .bildirim-id {
      font-weight: 500;
      color: #333;
      margin-bottom: 4px;
    }

    .bildirim-tarih {
      font-size: 12px;
      color: #666;
      margin-bottom: 2px;
    }

    .bildirim-aciklama {
      font-size: 13px;
      color: #333;
    }

    .bildirim-tutar {
      font-weight: 500;
      color: #333;
      margin: 0 16px;
    }

    .sgk-istatistik {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .istatistik-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }

    .istatistik-item mat-icon {
      color: #1976d2;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .item-info {
      flex: 1;
    }

    .item-sayi {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .item-label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .rapor-section {
      max-width: 1000px;
      margin: 0 auto;
    }

    .rapor-detay {
      margin: 20px 0;
    }

    .rapor-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .rapor-item {
      background-color: #f8f9fa;
      padding: 16px;
      border-radius: 4px;
    }

    .rapor-baslik {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      margin-bottom: 12px;
      border-bottom: 2px solid #1976d2;
      padding-bottom: 4px;
    }

    .rapor-veri {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .veri-satir {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 0;
    }

    .veri-deger {
      font-weight: 500;
      color: #333;
    }

    /* Durum chip styles */
    .fatura-bekliyor { background-color: #fff3cd; color: #856404; }
    .fatura-odendi { background-color: #d4edda; color: #155724; }
    .fatura-kismen-odendi { background-color: #d1ecf1; color: #0c5460; }

    .sgk-bekliyor { background-color: #fff3cd; color: #856404; }
    .sgk-gonderildi { background-color: #d1ecf1; color: #0c5460; }
    .sgk-onaylandi { background-color: #d4edda; color: #155724; }
    .sgk-reddedildi { background-color: #f8d7da; color: #721c24; }

    @media (max-width: 1200px) {
      .mali-ozet-section mat-grid-list {
        cols: 2;
      }

      .tahsilat-section,
      .sgk-section,
      .rapor-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .fatura-header {
        flex-direction: column;
        gap: 12px;
      }

      .fatura-tutar,
      .fatura-durum {
        min-width: auto;
        text-align: left;
      }
    }

    @media (max-width: 768px) {
      .mali-ozet-section mat-grid-list {
        cols: 1;
      }

      .form-row {
        flex-direction: column;
        gap: 12px;
      }
    }
  `]
})
export class MuhasebeEkraniComponent implements OnInit {
  faturalar: Fatura[] = [];
  filteredFaturalar: Fatura[] = [];
  bekleyenFaturalar: Fatura[] = [];
  selectedFaturaDurum: string = '';
  
  sgkBildirimleri: any[] = [];
  maliRapor: MaliRapor | null = null;

  // Ödeme formu
  selectedOdemeFatura: Fatura | null = null;
  odemeTutari: number = 0;
  odemeTipi: string = '';

  constructor(
    private faturalandirmaService: FaturalandirmaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadFaturalar();
    this.loadSGKBildirimleri();
    this.loadMaliRapor();
  }

  loadFaturalar(): void {
    this.faturalandirmaService.getFaturalar().subscribe(faturalar => {
      this.faturalar = faturalar;
      this.filteredFaturalar = faturalar;
    });

    this.faturalandirmaService.getBekleyenFaturalar().subscribe(bekleyen => {
      this.bekleyenFaturalar = bekleyen;
    });
  }

  loadSGKBildirimleri(): void {
    this.faturalandirmaService.getSGKBildirimleri().subscribe(bildirimler => {
      this.sgkBildirimleri = bildirimler;
    });
  }

  loadMaliRapor(): void {
    this.faturalandirmaService.getMaliRapor().subscribe(rapor => {
      this.maliRapor = rapor;
    });
  }

  filterFaturalar(): void {
    if (this.selectedFaturaDurum) {
      this.filteredFaturalar = this.faturalar.filter(f => f.durum === this.selectedFaturaDurum);
    } else {
      this.filteredFaturalar = this.faturalar;
    }
  }

  yeniFatura(): void {
    // Bu normalde bir dialog açacak
    this.snackBar.open('Yeni fatura oluşturma özelliği eklenecek', 'Tamam', {
      duration: 3000
    });
  }

  faturaDetay(fatura: Fatura): void {
    console.log('Fatura detay:', fatura);
    this.snackBar.open(`${fatura.faturaNo} detayları görüntüleniyor`, 'Tamam', {
      duration: 2000
    });
  }

  odemeAl(fatura: Fatura): void {
    this.selectedOdemeFatura = fatura;
    this.odemeTutari = fatura.kalanTutar;
  }

  processOdeme(): void {
    if (!this.selectedOdemeFatura || !this.odemeTutari || !this.odemeTipi) return;

    this.faturalandirmaService.odemeAl(
      this.selectedOdemeFatura.id, 
      this.odemeTutari, 
      this.odemeTipi
    ).subscribe(success => {
      if (success) {
        this.snackBar.open('Ödeme başarıyla kaydedildi', 'Tamam', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });

        // Formu temizle
        this.selectedOdemeFatura = null;
        this.odemeTutari = 0;
        this.odemeTipi = '';

        // Verileri yenile
        this.loadData();
      }
    });
  }

  sgkBildir(fatura: Fatura): void {
    this.faturalandirmaService.sgkBildirimi(fatura.id).subscribe(bildirim => {
      this.snackBar.open('SGK bildirimi oluşturuldu', 'Tamam', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      this.loadSGKBildirimleri();
    });
  }

  getFaturaDurumClass(durum: string): string {
    return `fatura-${durum.toLowerCase().replace(' ', '-')}`;
  }

  getSGKDurumClass(durum: string): string {
    return `sgk-${durum.toLowerCase()}`;
  }

  getBekleyenSGKSayisi(): number {
    return this.sgkBildirimleri.filter(b => b.durum === 'Bekliyor').length;
  }

  getOnaymananSGKSayisi(): number {
    return this.sgkBildirimleri.filter(b => b.durum === 'Onaylandı').length;
  }

  getToplSGKTutar(): number {
    return this.sgkBildirimleri.reduce((total, b) => total + b.tutari, 0);
  }

  getOdemeOrani(): number {
    if (!this.maliRapor || this.maliRapor.toplamFatura === 0) return 0;
    return Math.round((this.maliRapor.odenenFatura / this.maliRapor.toplamFatura) * 100);
  }
}

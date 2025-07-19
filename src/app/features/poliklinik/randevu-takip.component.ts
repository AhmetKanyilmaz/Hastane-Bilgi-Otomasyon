import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableDataSource } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';

import { Randevu, Muayene, Poliklinik } from '../../models/randevu.model';
import { RandevuService } from './randevu.service';

@Component({
  selector: 'app-randevu-takip',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    MatChipsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatStepperModule
  ],
  template: `
    <div class="randevu-container">
      <!-- Header -->
      <mat-toolbar color="primary" class="toolbar">
        <mat-icon>event</mat-icon>
        <span class="toolbar-title">Randevu Takip & Muayene Geçmişi</span>
        <span class="spacer"></span>
        <mat-chip-set>
          <mat-chip class="stat-chip">
            <mat-icon matChipAvatar>today</mat-icon>
            Bugün: {{istatistikler.bugunkuRandevu}}
          </mat-chip>
          <mat-chip class="stat-chip">
            <mat-icon matChipAvatar>schedule</mat-icon>
            Bekleyen: {{istatistikler.bekleyenRandevu}}
          </mat-chip>
          <mat-chip class="stat-chip">
            <mat-icon matChipAvatar>done</mat-icon>
            Tamamlanan: {{istatistikler.tamamlananRandevu}}
          </mat-chip>
        </mat-chip-set>
      </mat-toolbar>

      <!-- Tabs -->
      <mat-tab-group class="tab-group" [(selectedIndex)]="selectedTab">
        
        <!-- Randevu Arama Tab -->
        <mat-tab label="Randevu Arama">
          <div class="tab-content">
            <mat-card class="search-card">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>search</mat-icon>
                  Randevu Arama
                </mat-card-title>
                <mat-card-subtitle>Hasta bilgileri, doktor veya tarih ile randevu arayabilirsiniz</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <form [formGroup]="aramaForm" class="search-form">
                  <div class="form-grid">
                    <mat-form-field appearance="outline">
                      <mat-label>TC Kimlik No</mat-label>
                      <input matInput formControlName="hastaTcKimlik" placeholder="TC Kimlik No">
                      <mat-icon matSuffix>badge</mat-icon>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Hasta Adı</mat-label>
                      <input matInput formControlName="hastaAdi" placeholder="Hasta adı veya soyadı">
                      <mat-icon matSuffix>person</mat-icon>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Doktor</mat-label>
                      <input matInput formControlName="doktorAdi" placeholder="Doktor adı">
                      <mat-icon matSuffix>local_hospital</mat-icon>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Poliklinik</mat-label>
                      <mat-select formControlName="poliklinikId">
                        <mat-option value="">Tümü</mat-option>
                        <mat-option *ngFor="let pol of poliklinikler" [value]="pol.id">
                          {{pol.adi}}
                        </mat-option>
                      </mat-select>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Durum</mat-label>
                      <mat-select formControlName="durum">
                        <mat-option value="">Tümü</mat-option>
                        <mat-option value="Bekliyor">Bekliyor</mat-option>
                        <mat-option value="Devam Ediyor">Devam Ediyor</mat-option>
                        <mat-option value="Tamamlandı">Tamamlandı</mat-option>
                        <mat-option value="İptal">İptal</mat-option>
                      </mat-select>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Başlangıç Tarihi</mat-label>
                      <input matInput [matDatepicker]="baslangicPicker" formControlName="baslangicTarihi">
                      <mat-datepicker-toggle matSuffix [for]="baslangicPicker"></mat-datepicker-toggle>
                      <mat-datepicker #baslangicPicker></mat-datepicker>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Bitiş Tarihi</mat-label>
                      <input matInput [matDatepicker]="bitisPicker" formControlName="bitisTarihi">
                      <mat-datepicker-toggle matSuffix [for]="bitisPicker"></mat-datepicker-toggle>
                      <mat-datepicker #bitisPicker></mat-datepicker>
                    </mat-form-field>
                  </div>

                  <div class="form-actions">
                    <button mat-raised-button color="primary" type="button" (click)="randevuAra()">
                      <mat-icon>search</mat-icon>
                      Ara
                    </button>
                    <button mat-stroked-button type="button" (click)="aramaFormTemizle()">
                      <mat-icon>clear</mat-icon>
                      Temizle
                    </button>
                  </div>
                </form>

                <!-- Arama Sonuçları -->
                <div *ngIf="aramaSonuclari.length > 0" class="search-results">
                  <h3>Arama Sonuçları ({{aramaSonuclari.length}} kayıt)</h3>
                  <mat-table [dataSource]="aramaDataSource" class="randevu-table">
                    <ng-container matColumnDef="tarih">
                      <mat-header-cell *matHeaderCellDef>Tarih</mat-header-cell>
                      <mat-cell *matCellDef="let randevu">
                        {{randevu.randevuTarihi | date:'dd/MM/yyyy'}}
                        <br>
                        <small>{{randevu.randevuSaati}}</small>
                      </mat-cell>
                    </ng-container>

                    <ng-container matColumnDef="hasta">
                      <mat-header-cell *matHeaderCellDef>Hasta</mat-header-cell>
                      <mat-cell *matCellDef="let randevu">
                        {{randevu.hastaAdi}} {{randevu.hastaSoyadi}}
                        <br>
                        <small>{{randevu.hastaTcKimlik}}</small>
                      </mat-cell>
                    </ng-container>

                    <ng-container matColumnDef="doktor">
                      <mat-header-cell *matHeaderCellDef>Doktor</mat-header-cell>
                      <mat-cell *matCellDef="let randevu">
                        {{randevu.doktorAdi}}
                        <br>
                        <small>{{randevu.poliklinikAdi}}</small>
                      </mat-cell>
                    </ng-container>

                    <ng-container matColumnDef="sikayet">
                      <mat-header-cell *matHeaderCellDef>Şikayet</mat-header-cell>
                      <mat-cell *matCellDef="let randevu">
                        {{randevu.sikayet || 'Belirtilmemiş'}}
                      </mat-cell>
                    </ng-container>

                    <ng-container matColumnDef="durum">
                      <mat-header-cell *matHeaderCellDef>Durum</mat-header-cell>
                      <mat-cell *matCellDef="let randevu">
                        <mat-chip [class]="'status-' + randevu.durum.toLowerCase().replace(' ', '-')">
                          {{randevu.durum}}
                        </mat-chip>
                      </mat-cell>
                    </ng-container>

                    <ng-container matColumnDef="actions">
                      <mat-header-cell *matHeaderCellDef>İşlemler</mat-header-cell>
                      <mat-cell *matCellDef="let randevu">
                        <button mat-icon-button matTooltip="Detay" (click)="randevuDetayGoster(randevu)">
                          <mat-icon>visibility</mat-icon>
                        </button>
                        <button mat-icon-button matTooltip="Düzenle" 
                                *ngIf="randevu.durum === 'Bekliyor'" 
                                (click)="randevuDuzenle(randevu)">
                          <mat-icon>edit</mat-icon>
                        </button>
                        <button mat-icon-button matTooltip="İptal" color="warn"
                                *ngIf="randevu.durum === 'Bekliyor'" 
                                (click)="randevuIptal(randevu)">
                          <mat-icon>cancel</mat-icon>
                        </button>
                      </mat-cell>
                    </ng-container>

                    <mat-header-row *matHeaderRowDef="randevuColumns"></mat-header-row>
                    <mat-row *matRowDef="let row; columns: randevuColumns;"></mat-row>
                  </mat-table>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Muayene Geçmişi Tab -->
        <mat-tab label="Muayene Geçmişi">
          <div class="tab-content">
            <mat-card class="history-card">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>history</mat-icon>
                  Muayene Geçmişi
                </mat-card-title>
                <mat-card-subtitle>Tamamlanmış muayene kayıtları</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="history-filters">
                  <mat-form-field appearance="outline">
                    <mat-label>Hasta TC Kimlik</mat-label>
                    <input matInput [(ngModel)]="muayeneFiltre.hastaTc" (input)="muayeneAra()" placeholder="TC Kimlik No ile filtrele">
                    <mat-icon matSuffix>badge</mat-icon>
                  </mat-form-field>
                  
                  <mat-form-field appearance="outline">
                    <mat-label>Hasta Adı</mat-label>
                    <input matInput [(ngModel)]="muayeneFiltre.hastaAdi" (input)="muayeneAra()" placeholder="Hasta adı ile filtrele">
                    <mat-icon matSuffix>person</mat-icon>
                  </mat-form-field>

                  <button mat-raised-button color="primary" (click)="tumMuayeneleriYukle()">
                    <mat-icon>refresh</mat-icon>
                    Tümünü Yükle
                  </button>
                </div>

                <!-- Muayene Listesi -->
                <div class="muayene-list">
                  <mat-expansion-panel *ngFor="let muayene of filtrelenenMuayeneler" class="muayene-panel">
                    <mat-expansion-panel-header>
                      <mat-panel-title>
                        <div class="muayene-header">
                          <div class="hasta-info">
                            <strong>{{muayene.hastaAdi}} {{muayene.hastaSoyadi}}</strong>
                            <span class="tc-no">{{muayene.hastaTcKimlik}}</span>
                          </div>
                          <div class="muayene-info">
                            <span class="tarih">{{muayene.muayeneTarihi | date:'dd/MM/yyyy HH:mm'}}</span>
                            <span class="poliklinik">{{muayene.poliklinikAdi}}</span>
                          </div>
                        </div>
                      </mat-panel-title>
                    </mat-expansion-panel-header>

                    <div class="muayene-detay">
                      <div class="detay-grid">
                        <div class="detay-section">
                          <h4><mat-icon>local_hospital</mat-icon> Muayene Bilgileri</h4>
                          <div class="bilgi-satir">
                            <label>Doktor:</label>
                            <span>{{muayene.doktorAdi}}</span>
                          </div>
                          <div class="bilgi-satir">
                            <label>Şikayet:</label>
                            <span>{{muayene.sikayet}}</span>
                          </div>
                          <div class="bilgi-satir" *ngIf="muayene.anamnez">
                            <label>Anamnez:</label>
                            <span>{{muayene.anamnez}}</span>
                          </div>
                          <div class="bilgi-satir" *ngIf="muayene.fizikMuayene">
                            <label>Fizik Muayene:</label>
                            <span>{{muayene.fizikMuayene}}</span>
                          </div>
                        </div>

                        <div class="detay-section" *ngIf="muayene.tani || muayene.tedavi">
                          <h4><mat-icon>medical_services</mat-icon> Tanı ve Tedavi</h4>
                          <div class="bilgi-satir" *ngIf="muayene.tani">
                            <label>Tanı:</label>
                            <span>{{muayene.tani}}</span>
                          </div>
                          <div class="bilgi-satir" *ngIf="muayene.tedavi">
                            <label>Tedavi:</label>
                            <span>{{muayene.tedavi}}</span>
                          </div>
                          <div class="bilgi-satir" *ngIf="muayene.kontrol?.tarihi">
                            <label>Kontrol Tarihi:</label>
                            <span>{{muayene.kontrol?.tarihi | date:'dd/MM/yyyy'}}</span>
                          </div>
                        </div>

                        <div class="detay-section" *ngIf="muayene.receteler && muayene.receteler.length > 0">
                          <h4><mat-icon>medication</mat-icon> Reçeteler</h4>
                          <div *ngFor="let recete of muayene.receteler" class="recete-item">
                            <strong>{{recete.ilacAdi}}</strong>
                            <div>Doz: {{recete.doz}} - {{recete.kullanim}}</div>
                            <div>Miktar: {{recete.miktar}} adet</div>
                            <div *ngIf="recete.aciklama" class="aciklama">{{recete.aciklama}}</div>
                          </div>
                        </div>

                        <div class="detay-section" *ngIf="muayene.tahliller && muayene.tahliller.length > 0">
                          <h4><mat-icon>biotech</mat-icon> Tahlil İstekleri</h4>
                          <div *ngFor="let tahlil of muayene.tahliller" class="tahlil-item">
                            <strong>{{tahlil.tahlilTuru}}</strong>
                            <div *ngIf="tahlil.aciklama">{{tahlil.aciklama}}</div>
                            <mat-chip *ngIf="tahlil.acil" color="warn">Acil</mat-chip>
                          </div>
                        </div>
                      </div>

                      <div class="action-buttons">
                        <button mat-raised-button color="primary" (click)="muayeneRaporu(muayene)">
                          <mat-icon>print</mat-icon>
                          Rapor Yazdır
                        </button>
                        <button mat-stroked-button (click)="muayeneDuzenle(muayene)">
                          <mat-icon>edit</mat-icon>
                          Düzenle
                        </button>
                      </div>
                    </div>
                  </mat-expansion-panel>
                </div>

                <div *ngIf="filtrelenenMuayeneler.length === 0" class="no-data">
                  <mat-icon>info</mat-icon>
                  <p>Muayene kaydı bulunamadı</p>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Randevu Takip Tab -->
        <mat-tab label="Günlük Randevu Takip">
          <div class="tab-content">
            <mat-card class="daily-card">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>today</mat-icon>
                  Günlük Randevu Takip
                </mat-card-title>
                <mat-card-subtitle>
                  <mat-form-field appearance="outline" class="date-picker">
                    <mat-label>Tarih Seçin</mat-label>
                    <input matInput [matDatepicker]="dailyPicker" [(ngModel)]="seciliTarih" (dateChange)="gunlukRandevulariYukle()">
                    <mat-datepicker-toggle matSuffix [for]="dailyPicker"></mat-datepicker-toggle>
                    <mat-datepicker #dailyPicker></mat-datepicker>
                  </mat-form-field>
                </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="daily-stats">
                  <mat-chip-set>
                    <mat-chip class="stat-chip">
                      <mat-icon matChipAvatar>event</mat-icon>
                      Toplam: {{gunlukRandevular.length}}
                    </mat-chip>
                    <mat-chip class="stat-chip">
                      <mat-icon matChipAvatar>schedule</mat-icon>
                      Bekleyen: {{getBekleyenSayisi()}}
                    </mat-chip>
                    <mat-chip class="stat-chip">
                      <mat-icon matChipAvatar>done</mat-icon>
                      Tamamlanan: {{getTamamlananSayisi()}}
                    </mat-chip>
                  </mat-chip-set>
                </div>

                <mat-table [dataSource]="gunlukDataSource" class="daily-table">
                  <ng-container matColumnDef="saat">
                    <mat-header-cell *matHeaderCellDef>Saat</mat-header-cell>
                    <mat-cell *matCellDef="let randevu">
                      <strong>{{randevu.randevuSaati}}</strong>
                    </mat-cell>
                  </ng-container>

                  <ng-container matColumnDef="hasta">
                    <mat-header-cell *matHeaderCellDef>Hasta</mat-header-cell>
                    <mat-cell *matCellDef="let randevu">
                      <div class="hasta-bilgi">
                        <strong>{{randevu.hastaAdi}} {{randevu.hastaSoyadi}}</strong>
                        <small>{{randevu.hastaTcKimlik}}</small>
                      </div>
                    </mat-cell>
                  </ng-container>

                  <ng-container matColumnDef="doktor">
                    <mat-header-cell *matHeaderCellDef>Doktor/Poliklinik</mat-header-cell>
                    <mat-cell *matCellDef="let randevu">
                      <div class="doktor-bilgi">
                        <strong>{{randevu.doktorAdi}}</strong>
                        <small>{{randevu.poliklinikAdi}}</small>
                      </div>
                    </mat-cell>
                  </ng-container>

                  <ng-container matColumnDef="tur">
                    <mat-header-cell *matHeaderCellDef>Tür</mat-header-cell>
                    <mat-cell *matCellDef="let randevu">
                      <mat-chip [class]="'type-' + randevu.randevuTuru.toLowerCase().replace(' ', '-')">
                        {{randevu.randevuTuru}}
                      </mat-chip>
                    </mat-cell>
                  </ng-container>

                  <ng-container matColumnDef="oncelik">
                    <mat-header-cell *matHeaderCellDef>Öncelik</mat-header-cell>
                    <mat-cell *matCellDef="let randevu">
                      <mat-chip [class]="'priority-' + randevu.oncelik.toLowerCase()">
                        {{randevu.oncelik}}
                      </mat-chip>
                    </mat-cell>
                  </ng-container>

                  <ng-container matColumnDef="durum">
                    <mat-header-cell *matHeaderCellDef>Durum</mat-header-cell>
                    <mat-cell *matCellDef="let randevu">
                      <mat-chip [class]="'status-' + randevu.durum.toLowerCase().replace(' ', '-')">
                        {{randevu.durum}}
                      </mat-chip>
                    </mat-cell>
                  </ng-container>

                  <ng-container matColumnDef="actions">
                    <mat-header-cell *matHeaderCellDef>İşlemler</mat-header-cell>
                    <mat-cell *matCellDef="let randevu">
                      <button mat-icon-button matTooltip="Geldi" color="primary"
                              *ngIf="randevu.durum === 'Bekliyor'" 
                              (click)="randevuDurumGuncelle(randevu, 'Geldi')">
                        <mat-icon>check_circle</mat-icon>
                      </button>
                      <button mat-icon-button matTooltip="Gelmedi" color="warn"
                              *ngIf="randevu.durum === 'Bekliyor'" 
                              (click)="randevuDurumGuncelle(randevu, 'Gelmedi')">
                        <mat-icon>cancel</mat-icon>
                      </button>
                      <button mat-icon-button matTooltip="Muayene Başlat" color="accent"
                              *ngIf="randevu.durum === 'Geldi'" 
                              (click)="muayeneBaslat(randevu)">
                        <mat-icon>medical_services</mat-icon>
                      </button>
                    </mat-cell>
                  </ng-container>

                  <mat-header-row *matHeaderRowDef="gunlukColumns"></mat-header-row>
                  <mat-row *matRowDef="let row; columns: gunlukColumns;" 
                           [class]="'row-' + row.durum.toLowerCase().replace(' ', '-')"></mat-row>
                </mat-table>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .randevu-container {
      padding: 0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #f5f5f5;
    }

    .toolbar {
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .toolbar-title {
      margin-left: 16px;
      font-size: 18px;
      font-weight: 500;
    }

    .spacer {
      flex: 1;
    }

    .stat-chip {
      margin-right: 8px;
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .tab-group {
      flex: 1;
      background: white;
    }

    .tab-content {
      padding: 24px;
      max-height: calc(100vh - 160px);
      overflow-y: auto;
    }

    .search-card, .history-card, .daily-card {
      margin-bottom: 24px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-start;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #E0E0E0;
    }

    .search-results {
      margin-top: 32px;
    }

    .search-results h3 {
      color: #1976D2;
      margin-bottom: 16px;
    }

    .randevu-table, .daily-table {
      width: 100%;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      border-radius: 8px;
      overflow: hidden;
    }

    .history-filters {
      display: flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }

    .muayene-list {
      margin-top: 16px;
    }

    .muayene-panel {
      margin-bottom: 16px;
      border: 1px solid #E0E0E0;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .muayene-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .hasta-info {
      display: flex;
      flex-direction: column;
    }

    .tc-no {
      font-size: 12px;
      color: #666;
    }

    .muayene-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .tarih {
      font-weight: 500;
      color: #1976D2;
    }

    .poliklinik {
      font-size: 12px;
      color: #666;
    }

    .muayene-detay {
      padding: 16px 0;
    }

    .detay-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .detay-section {
      padding: 16px;
      border: 1px solid #E0E0E0;
      border-radius: 8px;
      background: #FAFAFA;
    }

    .detay-section h4 {
      margin: 0 0 16px 0;
      color: #1976D2;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 500;
    }

    .bilgi-satir {
      display: flex;
      margin-bottom: 8px;
      padding: 4px 0;
    }

    .bilgi-satir label {
      font-weight: 500;
      color: #666;
      min-width: 120px;
      margin-right: 12px;
    }

    .bilgi-satir span {
      color: #333;
      flex: 1;
    }

    .recete-item, .tahlil-item {
      padding: 8px;
      margin-bottom: 8px;
      background: white;
      border-radius: 4px;
      border-left: 4px solid #1976D2;
    }

    .aciklama {
      font-style: italic;
      color: #666;
      font-size: 12px;
      margin-top: 4px;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #E0E0E0;
    }

    .no-data {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .no-data mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .daily-stats {
      margin-bottom: 24px;
    }

    .date-picker {
      width: 200px;
    }

    .hasta-bilgi, .doktor-bilgi {
      display: flex;
      flex-direction: column;
    }

    .hasta-bilgi small, .doktor-bilgi small {
      color: #666;
      font-size: 11px;
    }

    /* Status chips */
    .status-bekliyor {
      background-color: #FF9800;
      color: white;
    }

    .status-devam-ediyor {
      background-color: #2196F3;
      color: white;
    }

    .status-tamamlandı {
      background-color: #4CAF50;
      color: white;
    }

    .status-iptal {
      background-color: #F44336;
      color: white;
    }

    .status-geldi {
      background-color: #8BC34A;
      color: white;
    }

    .status-gelmedi {
      background-color: #FF5722;
      color: white;
    }

    /* Type chips */
    .type-ilk-muayene {
      background-color: #673AB7;
      color: white;
    }

    .type-kontrol {
      background-color: #009688;
      color: white;
    }

    .type-acil {
      background-color: #F44336;
      color: white;
    }

    /* Priority chips */
    .priority-düşük {
      background-color: #8BC34A;
      color: white;
    }

    .priority-normal {
      background-color: #2196F3;
      color: white;
    }

    .priority-yüksek {
      background-color: #FF9800;
      color: white;
    }

    .priority-acil {
      background-color: #F44336;
      color: white;
    }

    /* Row colors */
    .row-bekliyor {
      background-color: #FFF3E0;
    }

    .row-geldi {
      background-color: #F1F8E9;
    }

    .row-gelmedi {
      background-color: #FFEBEE;
    }

    .row-tamamlandı {
      background-color: #E8F5E8;
    }

    @media (max-width: 768px) {
      .tab-content {
        padding: 16px;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .history-filters {
        flex-direction: column;
        align-items: stretch;
      }

      .muayene-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }

      .detay-grid {
        grid-template-columns: 1fr;
      }

      .action-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class RandevuTakipComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedTab = 0;
  aramaForm: FormGroup;
  aramaSonuclari: Randevu[] = [];
  aramaDataSource = new MatTableDataSource<Randevu>([]);
  randevuColumns: string[] = ['tarih', 'hasta', 'doktor', 'sikayet', 'durum', 'actions'];

  muayeneler: Muayene[] = [];
  filtrelenenMuayeneler: Muayene[] = [];
  muayeneFiltre = {
    hastaTc: '',
    hastaAdi: ''
  };

  gunlukRandevular: Randevu[] = [];
  gunlukDataSource = new MatTableDataSource<Randevu>([]);
  gunlukColumns: string[] = ['saat', 'hasta', 'doktor', 'tur', 'oncelik', 'durum', 'actions'];
  seciliTarih: Date = new Date();

  poliklinikler: Poliklinik[] = [];
  isLoading = false;
  istatistikler: any = {
    toplamRandevu: 0,
    bugunkuRandevu: 0,
    bekleyenRandevu: 0,
    tamamlananRandevu: 0,
    iptalRandevu: 0,
    toplamMuayene: 0
  };

  constructor(
    private fb: FormBuilder,
    private randevuService: RandevuService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.aramaForm = this.createAramaForm();
  }

  ngOnInit() {
    this.loadPoliklinikler();
    this.loadIstatistikler();
    this.tumMuayeneleriYukle();
    this.gunlukRandevulariYukle();
  }

  createAramaForm(): FormGroup {
    return this.fb.group({
      hastaTcKimlik: [''],
      hastaAdi: [''],
      doktorAdi: [''],
      poliklinikId: [''],
      durum: [''],
      baslangicTarihi: [''],
      bitisTarihi: ['']
    });
  }

  loadPoliklinikler() {
    this.randevuService.getPoliklinikler().subscribe(
      (data: Poliklinik[]) => this.poliklinikler = data
    );
  }

  loadIstatistikler() {
    this.randevuService.getRandevuIstatistikleri().subscribe(
      (data: any) => this.istatistikler = data
    );
  }

  randevuAra() {
    this.isLoading = true;
    const kriterler = this.aramaForm.value;
    
    this.randevuService.randevuAra(kriterler).subscribe(
      (data: Randevu[]) => {
        this.aramaSonuclari = data;
        this.aramaDataSource.data = data;
        this.isLoading = false;
        
        this.snackBar.open(`${data.length} randevu bulundu`, 'Tamam', {
          duration: 2000
        });
      },
      (error: any) => {
        this.isLoading = false;
        this.snackBar.open('Arama sırasında hata oluştu', 'Tamam', {
          duration: 3000
        });
      }
    );
  }

  aramaFormTemizle() {
    this.aramaForm.reset();
    this.aramaSonuclari = [];
    this.aramaDataSource.data = [];
  }

  tumMuayeneleriYukle() {
    this.randevuService.getMuayeneler().subscribe(
      (data: Muayene[]) => {
        this.muayeneler = data;
        this.filtrelenenMuayeneler = data;
      }
    );
  }

  muayeneAra() {
    let sonuclar = [...this.muayeneler];

    if (this.muayeneFiltre.hastaTc) {
      sonuclar = sonuclar.filter(m => 
        m.hastaTcKimlik.includes(this.muayeneFiltre.hastaTc)
      );
    }

    if (this.muayeneFiltre.hastaAdi) {
      const arama = this.muayeneFiltre.hastaAdi.toLowerCase();
      sonuclar = sonuclar.filter(m => 
        m.hastaAdi.toLowerCase().includes(arama) || 
        m.hastaSoyadi.toLowerCase().includes(arama)
      );
    }

    this.filtrelenenMuayeneler = sonuclar;
  }

  gunlukRandevulariYukle() {
    this.randevuService.getRandevularByTarih(this.seciliTarih).subscribe(
      (data: Randevu[]) => {
        this.gunlukRandevular = data.sort((a: Randevu, b: Randevu) => 
          a.randevuSaati.localeCompare(b.randevuSaati)
        );
        this.gunlukDataSource.data = this.gunlukRandevular;
      }
    );
  }

  getBekleyenSayisi(): number {
    return this.gunlukRandevular.filter(r => r.durum === 'Bekliyor').length;
  }

  getTamamlananSayisi(): number {
    return this.gunlukRandevular.filter(r => r.durum === 'Tamamlandı').length;
  }

  randevuDetayGoster(randevu: Randevu) {
    // Randevu detay modalı göster
    this.snackBar.open('Randevu detayları gösteriliyor...', 'Tamam', {
      duration: 2000
    });
  }

  randevuDuzenle(randevu: Randevu) {
    // Randevu düzenleme modalı göster
    this.snackBar.open('Randevu düzenleme özelliği yakında...', 'Tamam', {
      duration: 2000
    });
  }

  randevuIptal(randevu: Randevu) {
    if (confirm('Randevuyu iptal etmek istediğinizden emin misiniz?')) {
      this.randevuService.randevuIptal(randevu.id, 'Kullanıcı tarafından iptal edildi').subscribe(
        (success: boolean) => {
          if (success) {
            this.snackBar.open('Randevu iptal edildi', 'Tamam', {
              duration: 2000
            });
            this.randevuAra(); // Listeyi yenile
            this.loadIstatistikler();
          }
        }
      );
    }
  }

  randevuDurumGuncelle(randevu: Randevu, yeniDurum: string) {
    this.randevuService.randevuGuncelle(randevu.id, { durum: yeniDurum as any }).subscribe(
      (updatedRandevu: Randevu) => {
        this.snackBar.open(`Randevu durumu "${yeniDurum}" olarak güncellendi`, 'Tamam', {
          duration: 2000
        });
        this.gunlukRandevulariYukle();
        this.loadIstatistikler();
      }
    );
  }

  muayeneBaslat(randevu: Randevu) {
    // Muayene ekranına yönlendir
    this.snackBar.open('Muayene ekranı açılıyor...', 'Tamam', {
      duration: 2000
    });
  }

  muayeneRaporu(muayene: Muayene) {
    // Muayene raporunu yazdır
    this.snackBar.open('Rapor yazdırılıyor...', 'Tamam', {
      duration: 2000
    });
  }

  muayeneDuzenle(muayene: Muayene) {
    // Muayene düzenleme ekranı
    this.snackBar.open('Muayene düzenleme özelliği yakında...', 'Tamam', {
      duration: 2000
    });
  }
}

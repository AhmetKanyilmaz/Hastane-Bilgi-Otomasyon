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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { LabService } from './lab.service';
import { LabIslem, LabDeger } from '../../models/laboratuvar.model';

@Component({
  selector: 'app-laborant-ekrani',
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
    MatCheckboxModule,
    MatSnackBarModule
  ],
  template: `
    <div class="laborant-ekrani-container">
      <div class="header-section">
        <h1 class="page-title">
          <mat-icon>science</mat-icon>
          Laboratuvar - Laborant Ekranı
        </h1>
        <p class="page-subtitle">Test işlemlerini buradan yönetebilir, sonuçları girebilir ve onaylayabilirsiniz</p>
      </div>

      <div class="main-content">
        <div class="left-panel">
          <mat-card class="islem-listesi">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>assignment</mat-icon>
                Laboratuvar İşlemleri
                <mat-chip class="islem-sayisi">{{ bekleyenIslemler.length }}</mat-chip>
              </mat-card-title>
            </mat-card-header>
            
            <mat-card-content>
              <div class="filter-section">
                <mat-form-field appearance="outline" class="filter-field">
                  <mat-label>Durum Filtresi</mat-label>
                  <mat-select [(value)]="selectedDurum" (selectionChange)="filterIslemler()">
                    <mat-option value="">Tümü</mat-option>
                    <mat-option value="Bekliyor">Bekliyor</mat-option>
                    <mat-option value="Örnek Alındı">Örnek Alındı</mat-option>
                    <mat-option value="İşlemde">İşlemde</mat-option>
                    <mat-option value="Tamamlandı">Tamamlandı</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline" class="filter-field">
                  <mat-label>Öncelik</mat-label>
                  <mat-select [(value)]="selectedOncelik" (selectionChange)="filterIslemler()">
                    <mat-option value="">Tümü</mat-option>
                    <mat-option value="Normal">Normal</mat-option>
                    <mat-option value="Acil">Acil</mat-option>
                    <mat-option value="Çok Acil">Çok Acil</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <div class="islem-list">
                <div 
                  *ngFor="let islem of filteredIslemler" 
                  class="islem-item"
                  [class.selected]="selectedIslem?.id === islem.id"
                  [class.acil]="islem.oncelik === 'Acil'"
                  [class.cok-acil]="islem.oncelik === 'Çok Acil'"
                  (click)="selectIslem(islem)">
                  
                  <div class="islem-header">
                    <div class="test-info">
                      <div class="test-name">{{ islem.testAdi }}</div>
                      <div class="barkod">{{ islem.barkod }}</div>
                      <div class="kategori">{{ islem.kategori }}</div>
                    </div>
                    
                    <div class="oncelik-badge">
                      <mat-chip 
                        [ngClass]="getOncelikClass(islem.oncelik)"
                        [matBadge]="islem.oncelik === 'Acil' ? '!' : ''"
                        matBadgeColor="warn"
                        [matBadgeHidden]="islem.oncelik === 'Normal'">
                        {{ islem.oncelik }}
                      </mat-chip>
                    </div>
                  </div>

                  <div class="hasta-info">
                    <div class="hasta-name">{{ islem.hasta.ad }} {{ islem.hasta.soyad }}</div>
                    <div class="hasta-detay">{{ islem.hasta.yas }} yaş • {{ islem.hasta.cinsiyet }}</div>
                    <div class="doktor-info">Dr: {{ islem.doktor }}</div>
                  </div>

                  <div class="islem-durum">
                    <mat-chip [ngClass]="getDurumClass(islem.durum)">
                      {{ islem.durum }}
                    </mat-chip>
                    <div class="tarih">{{ islem.istenmeTarihi | date:'dd.MM HH:mm' }}</div>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="right-panel" *ngIf="selectedIslem">
          <mat-card class="islem-detay">
            <mat-card-header>
              <div class="detay-header">
                <div class="test-title">
                  <h2>{{ selectedIslem.testAdi }}</h2>
                  <p>{{ selectedIslem.hasta.ad }} {{ selectedIslem.hasta.soyad }} - {{ selectedIslem.barkod }}</p>
                </div>
                
                <div class="durum-controls">
                  <mat-form-field appearance="outline">
                    <mat-label>İşlem Durumu</mat-label>
                    <mat-select [(value)]="selectedIslem.durum" (selectionChange)="updateDurum()">
                      <mat-option value="Bekliyor">Bekliyor</mat-option>
                      <mat-option value="Örnek Alındı">Örnek Alındı</mat-option>
                      <mat-option value="İşlemde">İşlemde</mat-option>
                      <mat-option value="Tamamlandı">Tamamlandı</mat-option>
                    </mat-select>
                  </mat-form-field>
                </div>
              </div>
            </mat-card-header>

            <mat-card-content>
              <mat-tab-group class="detay-tabs">
                
                <!-- İşlem Bilgileri Tab -->
                <mat-tab label="İşlem Bilgileri">
                  <div class="tab-content">
                    <div class="info-grid">
                      <div class="info-item">
                        <label>Test Adı:</label>
                        <span>{{ selectedIslem.testAdi }}</span>
                      </div>
                      
                      <div class="info-item">
                        <label>Kategori:</label>
                        <span>{{ selectedIslem.kategori }}</span>
                      </div>
                      
                      <div class="info-item">
                        <label>Örnek Tipi:</label>
                        <span>{{ selectedIslem.ornekTipi }}</span>
                      </div>
                      
                      <div class="info-item">
                        <label>İstem Tarihi:</label>
                        <span>{{ selectedIslem.istenmeTarihi | date:'dd.MM.yyyy HH:mm' }}</span>
                      </div>
                      
                      <div class="info-item">
                        <label>İsteyen Doktor:</label>
                        <span>{{ selectedIslem.doktor }}</span>
                      </div>
                      
                      <div class="info-item">
                        <label>Departman:</label>
                        <span>{{ selectedIslem.departman }}</span>
                      </div>
                      
                      <div class="info-item">
                        <label>Öncelik:</label>
                        <mat-chip [ngClass]="getOncelikClass(selectedIslem.oncelik)">
                          {{ selectedIslem.oncelik }}
                        </mat-chip>
                      </div>
                      
                      <div class="info-item">
                        <label>Barkod:</label>
                        <span class="barkod-text">{{ selectedIslem.barkod }}</span>
                      </div>
                    </div>

                    <mat-divider></mat-divider>

                    <div class="hasta-detay-section">
                      <h3>Hasta Bilgileri</h3>
                      <div class="info-grid">
                        <div class="info-item">
                          <label>Ad Soyad:</label>
                          <span>{{ selectedIslem.hasta.ad }} {{ selectedIslem.hasta.soyad }}</span>
                        </div>
                        
                        <div class="info-item">
                          <label>TC Kimlik:</label>
                          <span>{{ selectedIslem.hasta.tcKimlik }}</span>
                        </div>
                        
                        <div class="info-item">
                          <label>Yaş:</label>
                          <span>{{ selectedIslem.hasta.yas }}</span>
                        </div>
                        
                        <div class="info-item">
                          <label>Cinsiyet:</label>
                          <span>{{ selectedIslem.hasta.cinsiyet }}</span>
                        </div>
                      </div>
                    </div>

                    <div class="notlar-section" *ngIf="selectedIslem.notlar">
                      <h3>Doktor Notları</h3>
                      <p class="doktor-notu">{{ selectedIslem.notlar }}</p>
                    </div>
                  </div>
                </mat-tab>

                <!-- Sonuç Girişi Tab -->
                <mat-tab label="Sonuç Girişi" [disabled]="selectedIslem.durum === 'Bekliyor'">
                  <div class="tab-content">
                    <div class="sonuc-form">
                      <h3>Test Sonuçları</h3>
                      
                      <div class="parametreler">
                        <div *ngFor="let parametre of testParametreleri; let i = index" class="parametre-row">
                          <mat-form-field appearance="outline" class="parametre-name">
                            <mat-label>Parametre</mat-label>
                            <input matInput [value]="parametre.parametre" readonly>
                          </mat-form-field>

                          <mat-form-field appearance="outline" class="parametre-value">
                            <mat-label>Değer</mat-label>
                            <input matInput 
                                   type="number" 
                                   [(ngModel)]="sonucDegerleri[i].deger"
                                   (input)="hesaplaDurum(i)"
                                   placeholder="Sonuç değeri">
                          </mat-form-field>

                          <mat-form-field appearance="outline" class="parametre-unit">
                            <mat-label>Birim</mat-label>
                            <input matInput [value]="parametre.birim" readonly>
                          </mat-form-field>

                          <div class="referans-aralik">
                            <span class="referans-text">
                              {{ parametre.referansMin }} - {{ parametre.referansMax }}
                            </span>
                          </div>

                          <div class="durum-indicator">
                            <mat-chip [ngClass]="getDegerDurumClass(sonucDegerleri[i].durum)">
                              {{ sonucDegerleri[i].durum }}
                            </mat-chip>
                          </div>
                        </div>
                      </div>

                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>Laborant Yorumu</mat-label>
                        <textarea matInput 
                                  [(ngModel)]="laborantYorumu" 
                                  rows="3" 
                                  placeholder="Sonuçlarla ilgili yorumlarınızı yazabilirsiniz..."></textarea>
                      </mat-form-field>

                      <div class="kritik-degerler" *ngIf="kritikDegerler.length > 0">
                        <h4>Kritik Değerler</h4>
                        <mat-chip-set>
                          <mat-chip *ngFor="let kritik of kritikDegerler" color="warn">
                            <mat-icon>warning</mat-icon>
                            {{ kritik }}
                          </mat-chip>
                        </mat-chip-set>
                      </div>

                      <div class="form-actions">
                        <button mat-raised-button color="primary" (click)="kaydetSonuc()">
                          <mat-icon>save</mat-icon>
                          Sonuçları Kaydet
                        </button>
                        
                        <button mat-raised-button color="accent" (click)="onaylaSonuc()" 
                                [disabled]="!sonucKaydedildi">
                          <mat-icon>check_circle</mat-icon>
                          Sonuçları Onayla
                        </button>
                      </div>
                    </div>
                  </div>
                </mat-tab>

                <!-- Sonuç Görüntüleme Tab -->
                <mat-tab label="Sonuç Görüntüleme">
                  <div class="tab-content">
                    <div class="sonuc-goruntuleme">
                      <div *ngIf="!mevcutSonuc" class="no-result">
                        <mat-icon>info</mat-icon>
                        <p>Bu test için henüz sonuç girilmemiş.</p>
                      </div>

                      <div *ngIf="mevcutSonuc" class="sonuc-detay">
                        <div class="sonuc-header">
                          <h3>{{ mevcutSonuc.testAdi }} - Sonuçları</h3>
                          <mat-chip [ngClass]="getSonucDurumClass(mevcutSonuc.durum)">
                            {{ mevcutSonuc.durum }}
                          </mat-chip>
                        </div>

                        <div class="sonuc-tarihler">
                          <p><strong>Örnek Tarihi:</strong> {{ mevcutSonuc.ornekTarihi | date:'dd.MM.yyyy HH:mm' }}</p>
                          <p><strong>Sonuç Tarihi:</strong> {{ mevcutSonuc.sonucTarihi | date:'dd.MM.yyyy HH:mm' }}</p>
                          <p><strong>Laborant:</strong> {{ mevcutSonuc.laborant }}</p>
                        </div>

                        <div class="sonuc-tablasu">
                          <table class="sonuc-table">
                            <thead>
                              <tr>
                                <th>Parametre</th>
                                <th>Sonuç</th>
                                <th>Birim</th>
                                <th>Referans Aralığı</th>
                                <th>Durum</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr *ngFor="let sonuc of mevcutSonuc.sonuclar">
                                <td>{{ sonuc.parametre }}</td>
                                <td class="deger">{{ sonuc.deger }}</td>
                                <td>{{ sonuc.birim }}</td>
                                <td>{{ sonuc.referansMin }} - {{ sonuc.referansMax }}</td>
                                <td>
                                  <mat-chip [ngClass]="getDegerDurumClass(sonuc.durum)">
                                    {{ sonuc.durum }}
                                  </mat-chip>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div class="yorum-section" *ngIf="mevcutSonuc.doktorYorumu">
                          <h4>Laborant Yorumu</h4>
                          <p>{{ mevcutSonuc.doktorYorumu }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </mat-tab>

              </mat-tab-group>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- İşlem seçilmediğinde gösterilecek alan -->
        <div class="right-panel no-selection" *ngIf="!selectedIslem">
          <mat-card class="selection-prompt">
            <mat-card-content>
              <div class="prompt-content">
                <mat-icon class="large-icon">science</mat-icon>
                <h2>Test İşlemi Seçin</h2>
                <p>İşleme başlamak için sol taraftan bir laboratuvar işlemi seçin.</p>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .laborant-ekrani-container {
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
      color: #4caf50;
    }

    .page-subtitle {
      color: #666;
      margin: 0;
    }

    .main-content {
      display: grid;
      grid-template-columns: 450px 1fr;
      gap: 20px;
      min-height: 600px;
    }

    .left-panel, .right-panel {
      height: fit-content;
    }

    .islem-listesi {
      position: sticky;
      top: 20px;
    }

    .islem-sayisi {
      margin-left: 8px;
      font-size: 12px;
    }

    .filter-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }

    .filter-field {
      width: 100%;
    }

    .islem-list {
      max-height: 700px;
      overflow-y: auto;
    }

    .islem-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      margin-bottom: 8px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .islem-item:hover {
      background-color: #f5f5f5;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .islem-item.selected {
      background-color: #e8f5e8;
      border-color: #4caf50;
      box-shadow: 0 2px 8px rgba(76, 175, 80, 0.2);
    }

    .islem-item.acil {
      border-left: 4px solid #ff9800;
    }

    .islem-item.cok-acil {
      border-left: 4px solid #f44336;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(244, 67, 54, 0); }
      100% { box-shadow: 0 0 0 0 rgba(244, 67, 54, 0); }
    }

    .islem-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .test-info {
      flex: 1;
    }

    .test-name {
      font-weight: 500;
      color: #333;
      font-size: 14px;
      margin-bottom: 4px;
    }

    .barkod {
      font-size: 12px;
      color: #666;
      font-family: monospace;
      margin-bottom: 2px;
    }

    .kategori {
      font-size: 11px;
      color: #4caf50;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .oncelik-badge {
      min-width: 80px;
      text-align: center;
    }

    .hasta-info {
      margin: 8px 0;
    }

    .hasta-name {
      font-weight: 500;
      color: #333;
      margin-bottom: 2px;
    }

    .hasta-detay {
      font-size: 12px;
      color: #666;
      margin-bottom: 2px;
    }

    .doktor-info {
      font-size: 12px;
      color: #1976d2;
    }

    .islem-durum {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .tarih {
      font-size: 11px;
      color: #666;
    }

    .islem-detay {
      min-height: 700px;
    }

    .detay-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }

    .test-title h2 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .test-title p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }

    .durum-controls {
      min-width: 200px;
    }

    .detay-tabs {
      margin-top: 20px;
    }

    .tab-content {
      padding: 20px;
      min-height: 400px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-item label {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .info-item span {
      font-size: 14px;
      color: #333;
    }

    .barkod-text {
      font-family: monospace;
      background-color: #f5f5f5;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .hasta-detay-section, .notlar-section {
      margin-top: 20px;
    }

    .doktor-notu {
      background-color: #f8f9fa;
      padding: 12px;
      border-radius: 4px;
      border-left: 4px solid #1976d2;
      margin: 0;
    }

    .sonuc-form {
      width: 100%;
    }

    .parametreler {
      margin-bottom: 20px;
    }

    .parametre-row {
      display: grid;
      grid-template-columns: 200px 120px 80px 120px 100px;
      gap: 12px;
      align-items: center;
      margin-bottom: 16px;
      padding: 12px;
      background-color: #f8f9fa;
      border-radius: 4px;
    }

    .parametre-name, .parametre-value, .parametre-unit {
      margin: 0;
    }

    .referans-aralik {
      text-align: center;
      font-size: 12px;
      color: #666;
    }

    .referans-text {
      background-color: #e3f2fd;
      padding: 4px 8px;
      border-radius: 4px;
    }

    .durum-indicator {
      text-align: center;
    }

    .full-width {
      width: 100%;
    }

    .kritik-degerler {
      background-color: #fff3cd;
      border: 1px solid #ffeaa7;
      border-radius: 4px;
      padding: 12px;
      margin: 16px 0;
    }

    .kritik-degerler h4 {
      margin: 0 0 8px 0;
      color: #856404;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }

    .sonuc-goruntuleme {
      width: 100%;
    }

    .no-result {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .no-result mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .sonuc-detay {
      width: 100%;
    }

    .sonuc-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .sonuc-tarihler {
      background-color: #f8f9fa;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 20px;
    }

    .sonuc-tarihler p {
      margin: 4px 0;
      font-size: 14px;
    }

    .sonuc-tablasu {
      overflow-x: auto;
      margin-bottom: 20px;
    }

    .sonuc-table {
      width: 100%;
      border-collapse: collapse;
    }

    .sonuc-table th,
    .sonuc-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e0e0e0;
    }

    .sonuc-table th {
      background-color: #f5f5f5;
      font-weight: 500;
      color: #333;
    }

    .sonuc-table .deger {
      font-weight: 500;
      color: #333;
    }

    .yorum-section {
      background-color: #f8f9fa;
      padding: 12px;
      border-radius: 4px;
      border-left: 4px solid #4caf50;
    }

    .yorum-section h4 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .no-selection {
      grid-column: 2;
    }

    .selection-prompt {
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .prompt-content {
      text-align: center;
      color: #666;
    }

    .large-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    /* Durum chip styles */
    .oncelik-normal { background-color: #e3f2fd; color: #1976d2; }
    .oncelik-acil { background-color: #fff3e0; color: #f57c00; }
    .oncelik-cok-acil { background-color: #ffebee; color: #d32f2f; }

    .durum-bekliyor { background-color: #fff3cd; color: #856404; }
    .durum-ornek-alindi { background-color: #d4edda; color: #155724; }
    .durum-islemde { background-color: #d1ecf1; color: #0c5460; }
    .durum-tamamlandi { background-color: #e2e3e5; color: #383d41; }

    .deger-normal { background-color: #d4edda; color: #155724; }
    .deger-yuksek { background-color: #fff3cd; color: #856404; }
    .deger-dusuk { background-color: #d1ecf1; color: #0c5460; }
    .deger-kritik { background-color: #f8d7da; color: #721c24; }

    .sonuc-onay-bekliyor { background-color: #fff3cd; color: #856404; }
    .sonuc-onaylandi { background-color: #d4edda; color: #155724; }
    .sonuc-revize-gerekli { background-color: #f8d7da; color: #721c24; }

    @media (max-width: 1200px) {
      .main-content {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .left-panel {
        order: 2;
      }

      .right-panel {
        order: 1;
      }

      .parametre-row {
        grid-template-columns: 1fr;
        gap: 8px;
      }
    }
  `]
})
export class LaborantEkraniComponent implements OnInit {
  bekleyenIslemler: LabIslem[] = [];
  filteredIslemler: LabIslem[] = [];
  selectedIslem: LabIslem | null = null;
  selectedDurum: string = '';
  selectedOncelik: string = '';

  testParametreleri: any[] = [];
  sonucDegerleri: LabDeger[] = [];
  laborantYorumu: string = '';
  kritikDegerler: string[] = [];
  sonucKaydedildi: boolean = false;
  mevcutSonuc: any = null;

  constructor(
    private labService: LabService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadIslemler();
  }

  loadIslemler(): void {
    this.labService.getBekleyenIslemler().subscribe(islemler => {
      this.bekleyenIslemler = islemler;
      this.filteredIslemler = islemler;
    });
  }

  filterIslemler(): void {
    let filtered = this.bekleyenIslemler;

    if (this.selectedDurum) {
      filtered = filtered.filter(i => i.durum === this.selectedDurum);
    }

    if (this.selectedOncelik) {
      filtered = filtered.filter(i => i.oncelik === this.selectedOncelik);
    }

    this.filteredIslemler = filtered;
  }

  selectIslem(islem: LabIslem): void {
    this.selectedIslem = islem;
    this.labService.selectIslem(islem);
    this.loadTestParametreleri();
    this.resetSonucForm();
    
    // Mevcut sonuçları yükle
    this.loadMevcutSonuc();
  }

  loadTestParametreleri(): void {
    if (!this.selectedIslem) return;

    this.testParametreleri = this.labService.getTestParametreleri(this.selectedIslem.testAdi);
    this.sonucDegerleri = this.testParametreleri.map(param => ({
      parametre: param.parametre,
      deger: '',
      birim: param.birim,
      referansMin: param.referansMin,
      referansMax: param.referansMax,
      durum: 'Normal',
      not: ''
    }));
  }

  loadMevcutSonuc(): void {
    // Mock mevcut sonuç - gerçek uygulamada service'den gelecek
    this.mevcutSonuc = null;
  }

  updateDurum(): void {
    if (!this.selectedIslem) return;

    this.labService.updateIslemDurum(this.selectedIslem.id, this.selectedIslem.durum)
      .subscribe(success => {
        if (success) {
          this.snackBar.open('İşlem durumu güncellendi', 'Tamam', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        }
      });
  }

  hesaplaDurum(index: number): void {
    const deger = this.sonucDegerleri[index];
    const numericValue = parseFloat(deger.deger as string);
    
    if (isNaN(numericValue)) {
      deger.durum = 'Normal';
      return;
    }

    if (numericValue < deger.referansMin!) {
      deger.durum = 'Düşük';
      if (numericValue < deger.referansMin! * 0.5) {
        deger.durum = 'Kritik';
      }
    } else if (numericValue > deger.referansMax!) {
      deger.durum = 'Yüksek';
      if (numericValue > deger.referansMax! * 2) {
        deger.durum = 'Kritik';
      }
    } else {
      deger.durum = 'Normal';
    }

    this.updateKritikDegerler();
  }

  updateKritikDegerler(): void {
    this.kritikDegerler = this.sonucDegerleri
      .filter(d => d.durum === 'Kritik')
      .map(d => `${d.parametre}: ${d.deger} ${d.birim}`);
  }

  kaydetSonuc(): void {
    if (!this.selectedIslem) return;

    const sonucData = {
      sonuclar: this.sonucDegerleri,
      doktorYorumu: this.laborantYorumu,
      kritikDegerler: this.kritikDegerler
    };

    this.labService.saveSonuc(this.selectedIslem.id, sonucData)
      .subscribe(sonuc => {
        this.sonucKaydedildi = true;
        this.mevcutSonuc = sonuc;
        
        this.snackBar.open('Sonuçlar başarıyla kaydedildi', 'Tamam', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      });
  }

  onaylaSonuc(): void {
    if (!this.mevcutSonuc) return;

    this.labService.onaylaServic(this.mevcutSonuc.id)
      .subscribe(success => {
        if (success) {
          this.mevcutSonuc.durum = 'Onaylandı';
          
          this.snackBar.open('Sonuçlar onaylandı ve doktora gönderildi', 'Tamam', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
        }
      });
  }

  resetSonucForm(): void {
    this.laborantYorumu = '';
    this.kritikDegerler = [];
    this.sonucKaydedildi = false;
  }

  getOncelikClass(oncelik: string): string {
    return `oncelik-${oncelik.toLowerCase().replace(' ', '-')}`;
  }

  getDurumClass(durum: string): string {
    return `durum-${durum.toLowerCase().replace(' ', '-')}`;
  }

  getDegerDurumClass(durum: string): string {
    return `deger-${durum.toLowerCase()}`;
  }

  getSonucDurumClass(durum: string): string {
    return `sonuc-${durum.toLowerCase().replace(' ', '-')}`;
  }
}

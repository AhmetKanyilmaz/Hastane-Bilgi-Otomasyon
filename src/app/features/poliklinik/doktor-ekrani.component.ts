import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { PoliklinikService } from './poliklinik.service';
import { Randevu } from '../../models/muayene.model';
import { Hasta } from '../../models/hasta.model';

@Component({
  selector: 'app-doktor-ekrani',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatTableModule,
    MatBadgeModule,
    MatDividerModule
  ],
  template: `
    <div class="doktor-ekrani-container">
      <div class="header-section">
        <h1 class="page-title">
          <mat-icon>medical_services</mat-icon>
          Poliklinik - Doktor Ekranı
        </h1>
        <p class="page-subtitle">Günlük randevu ve hasta muayene işlemlerinizi buradan yönetebilirsiniz</p>
      </div>

      <div class="main-content">
        <div class="left-panel">
          <mat-card class="randevu-listesi">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>today</mat-icon>
                Bugünün Randevuları
                <mat-chip class="randevu-sayisi">{{ randevular.length }}</mat-chip>
              </mat-card-title>
            </mat-card-header>
            
            <mat-card-content>
              <div class="randevu-filter">
                <mat-form-field appearance="outline" class="filter-field">
                  <mat-label>Durum Filtresi</mat-label>
                  <mat-select [(value)]="selectedDurum" (selectionChange)="filterRandevular()">
                    <mat-option value="">Tümü</mat-option>
                    <mat-option value="Bekliyor">Bekliyor</mat-option>
                    <mat-option value="Başladı">Başladı</mat-option>
                    <mat-option value="Tamamlandı">Tamamlandı</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>

              <mat-list class="randevu-list">
                <mat-list-item 
                  *ngFor="let randevu of filteredRandevular" 
                  [class.selected]="selectedRandevu?.id === randevu.id"
                  (click)="selectRandevu(randevu)">
                  
                  <div class="randevu-item">
                    <div class="randevu-time">
                      <mat-icon>schedule</mat-icon>
                      {{ randevu.saat }}
                    </div>
                    
                    <div class="hasta-info">
                      <div class="hasta-name">{{ randevu.hasta.ad }} {{ randevu.hasta.soyad }}</div>
                      <div class="hasta-tc">{{ randevu.hasta.tcKimlik }}</div>
                      <div class="randevu-tip">{{ randevu.tip }}</div>
                    </div>
                    
                    <div class="randevu-status">
                      <mat-chip 
                        [ngClass]="getDurumClass(randevu.durum)"
                        [matBadge]="randevu.durum === 'Bekliyor' ? '!' : ''"
                        matBadgeColor="warn"
                        [matBadgeHidden]="randevu.durum !== 'Bekliyor'">
                        {{ randevu.durum }}
                      </mat-chip>
                    </div>
                  </div>
                </mat-list-item>
              </mat-list>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="right-panel" *ngIf="selectedHasta">
          <mat-card class="hasta-detay">
            <mat-card-header>
              <div class="hasta-header">
                <div class="hasta-basic-info">
                  <h2>{{ selectedHasta.ad }} {{ selectedHasta.soyad }}</h2>
                  <p>{{ selectedHasta.tcKimlik }} • {{ getYas(selectedHasta.dogumTarihi) }} yaş • {{ selectedHasta.cinsiyet }}</p>
                  <p>
                    <mat-icon>favorite</mat-icon>
                    {{ selectedHasta.kanGrubu }}
                    <mat-icon>phone</mat-icon>
                    {{ selectedHasta.telefon }}
                  </p>
                </div>
                
                <div class="hasta-alerts" *ngIf="selectedHasta.alerjiler?.length || selectedHasta.kronikHastaliklar?.length">
                  <mat-chip-set>
                    <mat-chip *ngFor="let alerji of selectedHasta.alerjiler" color="warn">
                      <mat-icon>warning</mat-icon>
                      {{ alerji }}
                    </mat-chip>
                    <mat-chip *ngFor="let hastalik of selectedHasta.kronikHastaliklar" color="primary">
                      <mat-icon>medical_information</mat-icon>
                      {{ hastalik }}
                    </mat-chip>
                  </mat-chip-set>
                </div>
              </div>
            </mat-card-header>

            <mat-card-content>
              <mat-tab-group class="hasta-tabs" [(selectedIndex)]="selectedTabIndex">
                
                <!-- Muayene Notları Tab -->
                <mat-tab label="Muayene Notları">
                  <div class="tab-content">
                    <form #muayeneForm="ngForm" (ngSubmit)="saveMuayene()">
                      <div class="form-row">
                        <mat-form-field appearance="outline" class="full-width">
                          <mat-label>Hastanın Şikayeti</mat-label>
                          <textarea matInput 
                                  [(ngModel)]="muayeneData.sikayet" 
                                  name="sikayet"
                                  rows="3" 
                                  placeholder="Hastanın ana şikayetlerini buraya yazın..."></textarea>
                        </mat-form-field>
                      </div>

                      <div class="form-row">
                        <mat-form-field appearance="outline" class="full-width">
                          <mat-label>Fizik Muayene Bulguları</mat-label>
                          <textarea matInput 
                                  [(ngModel)]="muayeneData.fizikMuayene" 
                                  name="fizikMuayene"
                                  rows="4" 
                                  placeholder="Fizik muayene bulgularını detaylı olarak yazın..."></textarea>
                        </mat-form-field>
                      </div>

                      <div class="form-row">
                        <mat-form-field appearance="outline" class="full-width">
                          <mat-label>Ön Tanı</mat-label>
                          <mat-select [(ngModel)]="muayeneData.tani" name="tani" multiple>
                            <mat-option value="Hipertansiyon">Hipertansiyon</mat-option>
                            <mat-option value="Diyabet">Diyabet</mat-option>
                            <mat-option value="Üst Solunum Yolu Enfeksiyonu">ÜSYE</mat-option>
                            <mat-option value="Gastrit">Gastrit</mat-option>
                            <mat-option value="Migren">Migren</mat-option>
                            <mat-option value="Anemí">Anemi</mat-option>
                          </mat-select>
                        </mat-form-field>
                      </div>

                      <div class="form-row">
                        <mat-form-field appearance="outline" class="full-width">
                          <mat-label>Tedavi Planı</mat-label>
                          <textarea matInput 
                                  [(ngModel)]="muayeneData.tedavi" 
                                  name="tedavi"
                                  rows="3" 
                                  placeholder="Tedavi planını ve önerilerini yazın..."></textarea>
                        </mat-form-field>
                      </div>

                      <div class="form-row">
                        <mat-form-field appearance="outline">
                          <mat-label>Kontrol Tarihi</mat-label>
                          <input matInput [matDatepicker]="picker" [(ngModel)]="muayeneData.kontrolTarihi" name="kontrolTarihi">
                          <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                          <mat-datepicker #picker></mat-datepicker>
                        </mat-form-field>
                      </div>

                      <div class="form-row">
                        <mat-form-field appearance="outline" class="full-width">
                          <mat-label>Ek Notlar</mat-label>
                          <textarea matInput 
                                  [(ngModel)]="muayeneData.notlar" 
                                  name="notlar"
                                  rows="2" 
                                  placeholder="Ek notlarınızı buraya yazabilirsiniz..."></textarea>
                        </mat-form-field>
                      </div>

                      <div class="form-actions">
                        <button mat-raised-button type="submit" color="primary">
                          <mat-icon>save</mat-icon>
                          Muayeneyi Kaydet
                        </button>
                        
                        <button mat-raised-button type="button" color="accent" (click)="selectedTabIndex = 1">
                          <mat-icon>assignment</mat-icon>
                          İstem Yaz
                        </button>
                      </div>
                    </form>
                  </div>
                </mat-tab>

                <!-- Order (İstem) Tab -->
                <mat-tab label="Order (İstem)">
                  <div class="tab-content">
                    <div class="istem-categories">
                      <mat-card *ngFor="let kategori of istemKategorileri" class="kategori-card">
                        <mat-card-header>
                          <mat-card-title>
                            <mat-icon>{{ kategori.icon }}</mat-icon>
                            {{ kategori.name }}
                          </mat-card-title>
                        </mat-card-header>
                        
                        <mat-card-content>
                          <div class="test-list">
                            <mat-checkbox 
                              *ngFor="let test of kategori.testler" 
                              (change)="toggleTest(test, $event.checked)"
                              [checked]="selectedTests.includes(test)">
                              {{ test }}
                            </mat-checkbox>
                          </div>
                        </mat-card-content>
                      </mat-card>
                    </div>

                    <div class="selected-tests" *ngIf="selectedTests.length > 0">
                      <h3>Seçilen Testler</h3>
                      <mat-chip-set>
                        <mat-chip *ngFor="let test of selectedTests" (removed)="removeTest(test)">
                          {{ test }}
                          <mat-icon matChipRemove>cancel</mat-icon>
                        </mat-chip>
                      </mat-chip-set>

                      <mat-form-field appearance="outline" class="full-width">
                        <mat-label>Doktor Notu</mat-label>
                        <textarea matInput 
                                [(ngModel)]="istemNotu" 
                                rows="2" 
                                placeholder="İstemle ilgili özel notlarınızı yazabilirsiniz..."></textarea>
                      </mat-form-field>

                      <div class="istem-options">
                        <mat-checkbox [(ngModel)]="acilIstem">Acil İstem</mat-checkbox>
                      </div>

                      <button mat-raised-button color="primary" (click)="sendIstem()">
                        <mat-icon>send</mat-icon>
                        İstemleri Gönder
                      </button>
                    </div>
                  </div>
                </mat-tab>

                <!-- Geçmiş Ziyaretler Tab -->
                <mat-tab label="Geçmiş Ziyaretler">
                  <div class="tab-content">
                    <div class="gecmis-muayeneler">
                      <mat-card *ngFor="let muayene of muayeneGecmisi" class="gecmis-item">
                        <mat-card-header>
                          <mat-card-title>
                            {{ muayene.tarih | date:'dd.MM.yyyy' }}
                          </mat-card-title>
                          <mat-card-subtitle>
                            {{ muayene.doktor }}
                          </mat-card-subtitle>
                        </mat-card-header>
                        
                        <mat-card-content>
                          <p><strong>Tanı:</strong> {{ muayene.tani }}</p>
                          <p><strong>Tedavi:</strong> {{ muayene.tedavi }}</p>
                          <p *ngIf="muayene.notlar"><strong>Notlar:</strong> {{ muayene.notlar }}</p>
                        </mat-card-content>
                      </mat-card>
                    </div>
                  </div>
                </mat-tab>

                <!-- Sonuçlar Tab -->
                <mat-tab label="Lab Sonuçları">
                  <div class="tab-content">
                    <div class="lab-sonuclari">
                      <mat-card *ngFor="let sonuc of labSonuclari" class="sonuc-item">
                        <mat-card-header>
                          <mat-card-title>{{ sonuc.testAdi }}</mat-card-title>
                          <mat-card-subtitle>{{ sonuc.tarih | date:'dd.MM.yyyy HH:mm' }}</mat-card-subtitle>
                        </mat-card-header>
                        
                        <mat-card-content>
                          <div class="sonuc-detay">
                            <div *ngFor="let parametre of sonuc.sonuclar | keyvalue" class="parametre-row">
                              <span class="parametre-adi">{{ parametre.key }}:</span>
                              <span class="parametre-deger">{{ parametre.value }}</span>
                            </div>
                          </div>
                        </mat-card-content>
                      </mat-card>
                    </div>
                  </div>
                </mat-tab>

              </mat-tab-group>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Hasta seçilmediğinde gösterilecek alan -->
        <div class="right-panel no-selection" *ngIf="!selectedHasta">
          <mat-card class="selection-prompt">
            <mat-card-content>
              <div class="prompt-content">
                <mat-icon class="large-icon">person_search</mat-icon>
                <h2>Hasta Seçin</h2>
                <p>Muayene işlemlerine başlamak için sol taraftan bir randevu seçin.</p>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .doktor-ekrani-container {
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
      color: #1976d2;
    }

    .page-subtitle {
      color: #666;
      margin: 0;
    }

    .main-content {
      display: grid;
      grid-template-columns: 400px 1fr;
      gap: 20px;
      min-height: 600px;
    }

    .left-panel, .right-panel {
      height: fit-content;
    }

    .randevu-listesi {
      position: sticky;
      top: 20px;
    }

    .randevu-sayisi {
      margin-left: 8px;
      font-size: 12px;
    }

    .randevu-filter {
      margin-bottom: 16px;
    }

    .filter-field {
      width: 100%;
    }

    .randevu-list {
      max-height: 600px;
      overflow-y: auto;
    }

    .randevu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
      cursor: pointer;
      border-radius: 8px;
      transition: background-color 0.2s;
    }

    .randevu-item:hover {
      background-color: #f5f5f5;
    }

    .randevu-time {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #1976d2;
      font-weight: 500;
      min-width: 80px;
    }

    .hasta-info {
      flex: 1;
    }

    .hasta-name {
      font-weight: 500;
      color: #333;
      margin-bottom: 2px;
    }

    .hasta-tc {
      font-size: 12px;
      color: #666;
      margin-bottom: 2px;
    }

    .randevu-tip {
      font-size: 12px;
      color: #1976d2;
    }

    .randevu-status {
      min-width: 100px;
      text-align: center;
    }

    .selected .randevu-item {
      background-color: #e3f2fd;
      border-left: 4px solid #1976d2;
      padding-left: 12px;
    }

    .hasta-detay {
      min-height: 700px;
    }

    .hasta-header {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .hasta-basic-info h2 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .hasta-basic-info p {
      margin: 4px 0;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
    }

    .hasta-basic-info mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .hasta-alerts mat-chip {
      margin: 2px;
    }

    .hasta-tabs {
      margin-top: 20px;
    }

    .tab-content {
      padding: 20px;
      min-height: 400px;
    }

    .form-row {
      margin-bottom: 16px;
    }

    .full-width {
      width: 100%;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 20px;
    }

    .istem-categories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }

    .kategori-card mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .test-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .selected-tests {
      background-color: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      margin-top: 20px;
    }

    .selected-tests h3 {
      margin: 0 0 12px 0;
      color: #333;
    }

    .istem-options {
      margin: 16px 0;
    }

    .gecmis-muayeneler, .lab-sonuclari {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .gecmis-item, .sonuc-item {
      margin: 0;
    }

    .sonuc-detay {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }

    .parametre-row {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      border-bottom: 1px solid #eee;
    }

    .parametre-adi {
      font-weight: 500;
      color: #333;
    }

    .parametre-deger {
      color: #666;
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

    .durum-bekliyor { background-color: #fff3cd; color: #856404; }
    .durum-basladi { background-color: #d4edda; color: #155724; }
    .durum-tamamlandi { background-color: #d1ecf1; color: #0c5460; }

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
    }
  `]
})
export class DoktorEkraniComponent implements OnInit {
  randevular: Randevu[] = [];
  filteredRandevular: Randevu[] = [];
  selectedRandevu: Randevu | null = null;
  selectedHasta: Hasta | null = null;
  selectedDurum: string = '';
  selectedTabIndex: number = 0;

  muayeneData = {
    sikayet: '',
    fizikMuayene: '',
    tani: [],
    tedavi: '',
    kontrolTarihi: undefined as Date | undefined,
    notlar: ''
  };

  istemKategorileri = [
    {
      name: 'Biyokimya',
      icon: 'biotech',
      testler: ['Glukoz', 'Kreatinin', 'ALT', 'AST', 'LDL', 'HDL', 'Trigliserit', 'TSH']
    },
    {
      name: 'Hematoloji',
      icon: 'water_drop',
      testler: ['Tam Kan Sayımı', 'Sedimentasyon', 'CRP', 'Ferritin', 'B12', 'Folat']
    },
    {
      name: 'Mikrobiyoloji',
      icon: 'coronavirus',
      testler: ['İdrar Kültürü', 'Boğaz Kültürü', 'Kan Kültürü', 'Hepatit Paneli']
    },
    {
      name: 'Radyoloji',
      icon: 'medical_information',
      testler: ['Akciğer Grafisi', 'Karın USG', 'Tomografi', 'MRI', 'EKG']
    }
  ];

  selectedTests: string[] = [];
  istemNotu: string = '';
  acilIstem: boolean = false;
  muayeneGecmisi: any[] = [];
  labSonuclari: any[] = [];

  constructor(private poliklinikService: PoliklinikService) {}

  ngOnInit(): void {
    this.loadRandevular();
  }

  loadRandevular(): void {
    this.poliklinikService.getBugununRandevulari().subscribe(randevular => {
      this.randevular = randevular;
      this.filteredRandevular = randevular;
    });
  }

  filterRandevular(): void {
    if (this.selectedDurum) {
      this.filteredRandevular = this.randevular.filter(r => r.durum === this.selectedDurum);
    } else {
      this.filteredRandevular = this.randevular;
    }
  }

  selectRandevu(randevu: Randevu): void {
    this.selectedRandevu = randevu;
    this.loadHastaDetay(randevu.hastaId);
    
    // Randevu durumunu 'Başladı' yap
    if (randevu.durum === 'Bekliyor') {
      this.poliklinikService.updateRandevuDurum(randevu.id, 'Başladı').subscribe();
      randevu.durum = 'Başladı';
    }
  }

  loadHastaDetay(hastaId: string): void {
    this.poliklinikService.getHastaDetay(hastaId).subscribe(hasta => {
      this.selectedHasta = hasta;
      if (hasta) {
        this.poliklinikService.selectPatient(hasta);
        this.loadMuayeneGecmisi(hastaId);
        this.loadLabSonuclari(hastaId);
      }
    });
  }

  loadMuayeneGecmisi(hastaId: string): void {
    this.poliklinikService.getMuayeneTarihi(hastaId).subscribe(gecmis => {
      this.muayeneGecmisi = gecmis;
    });
  }

  loadLabSonuclari(hastaId: string): void {
    this.poliklinikService.getLabSonuclari(hastaId).subscribe(sonuclar => {
      this.labSonuclari = sonuclar;
    });
  }

  getYas(dogumTarihi: Date): number {
    const today = new Date();
    const birthDate = new Date(dogumTarihi);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  getDurumClass(durum: string): string {
    return `durum-${durum.toLowerCase()}`;
  }

  toggleTest(test: string, checked: boolean): void {
    if (checked) {
      this.selectedTests.push(test);
    } else {
      this.removeTest(test);
    }
  }

  removeTest(test: string): void {
    const index = this.selectedTests.indexOf(test);
    if (index > -1) {
      this.selectedTests.splice(index, 1);
    }
  }

  sendIstem(): void {
    if (this.selectedTests.length === 0 || !this.selectedHasta) return;

    this.selectedTests.forEach(test => {
      const istem = {
        tip: this.getTestTip(test) as 'Laboratuvar' | 'Radyoloji',
        kategori: this.getTestKategori(test),
        testAdi: test,
        acilDurum: this.acilIstem,
        doktorNotu: this.istemNotu
      };

      this.poliklinikService.createIstem(istem).subscribe(result => {
        console.log('İstem gönderildi:', result);
      });
    });

    // Reset form
    this.selectedTests = [];
    this.istemNotu = '';
    this.acilIstem = false;

    alert('İstemler başarıyla gönderildi!');
  }

  getTestTip(test: string): string {
    const radyolojiTestleri = ['Akciğer Grafisi', 'Karın USG', 'Tomografi', 'MRI', 'EKG'];
    return radyolojiTestleri.includes(test) ? 'Radyoloji' : 'Laboratuvar';
  }

  getTestKategori(test: string): string {
    for (const kategori of this.istemKategorileri) {
      if (kategori.testler.includes(test)) {
        return kategori.name;
      }
    }
    return 'Diğer';
  }

  saveMuayene(): void {
    if (!this.selectedHasta || !this.selectedRandevu) return;

    const muayene = {
      randevuId: this.selectedRandevu.id,
      hastaId: this.selectedHasta.id,
      ...this.muayeneData
    };

    this.poliklinikService.saveMuayene(muayene).subscribe(result => {
      console.log('Muayene kaydedildi:', result);
      
      // Randevu durumunu tamamlandı yap
      if (this.selectedRandevu) {
        this.poliklinikService.updateRandevuDurum(this.selectedRandevu.id, 'Tamamlandı').subscribe();
        this.selectedRandevu.durum = 'Tamamlandı';
      }
      
      alert('Muayene başarıyla kaydedildi!');
      
      // Form'u temizle
      this.muayeneData = {
        sikayet: '',
        fizikMuayene: '',
        tani: [],
        tedavi: '',
        kontrolTarihi: undefined,
        notlar: ''
      };
    });
  }
}

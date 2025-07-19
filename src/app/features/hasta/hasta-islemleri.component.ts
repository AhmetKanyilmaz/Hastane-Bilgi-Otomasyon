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

import { Hasta } from '../../models/hasta.model';
import { HastaService } from './hasta.service';

@Component({
  selector: 'app-hasta-islemleri',
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
    MatTooltipModule
  ],
  template: `
    <div class="hasta-islemleri-container">
      <!-- Header -->
      <mat-toolbar color="primary" class="toolbar">
        <mat-icon>people</mat-icon>
        <span class="toolbar-title">Hasta İşlemleri</span>
        <span class="spacer"></span>
        <mat-chip-set>
          <mat-chip class="stat-chip">
            <mat-icon matChipAvatar>group</mat-icon>
            Toplam: {{istatistikler.toplamHasta}}
          </mat-chip>
          <mat-chip class="stat-chip">
            <mat-icon matChipAvatar>verified_user</mat-icon>
            Aktif: {{istatistikler.aktifHasta}}
          </mat-chip>
        </mat-chip-set>
      </mat-toolbar>

      <!-- Tabs -->
      <mat-tab-group class="tab-group" [(selectedIndex)]="selectedTab">
        
        <!-- Hasta Arama Tab -->
        <mat-tab label="Hasta Arama">
          <div class="tab-content">
            <mat-card class="search-card">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>search</mat-icon>
                  Hasta Arama
                </mat-card-title>
                <mat-card-subtitle>Ad, soyad, TC kimlik no veya telefon ile arama yapabilirsiniz</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="search-form">
                  <mat-form-field appearance="outline" class="search-field">
                    <mat-label>Arama</mat-label>
                    <input matInput 
                           [(ngModel)]="aramaMetni" 
                           (input)="aramaYap()"
                           placeholder="Ad, soyad, TC kimlik no, telefon...">
                    <mat-icon matSuffix>search</mat-icon>
                  </mat-form-field>
                  <button mat-raised-button color="primary" (click)="aramaYap()">
                    <mat-icon>search</mat-icon>
                    Ara
                  </button>
                  <button mat-button (click)="aramaTemizle()">
                    <mat-icon>clear</mat-icon>
                    Temizle
                  </button>
                </div>
              </mat-card-content>
            </mat-card>

            <!-- Arama Sonuçları -->
            <mat-card class="results-card" *ngIf="aramaSonuclari.length > 0">
              <mat-card-header>
                <mat-card-title>
                  Arama Sonuçları
                  <mat-chip class="result-count">{{aramaSonuclari.length}} hasta bulundu</mat-chip>
                </mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="search-results">
                  <mat-expansion-panel *ngFor="let hasta of aramaSonuclari" class="hasta-panel">
                    <mat-expansion-panel-header>
                      <mat-panel-title>
                        <div class="hasta-header">
                          <mat-icon [class]="hasta.cinsiyet === 'Erkek' ? 'male-icon' : 'female-icon'">
                            {{hasta.cinsiyet === 'Erkek' ? 'male' : 'female'}}
                          </mat-icon>
                          <span class="hasta-name">{{hasta.ad}} {{hasta.soyad}}</span>
                          <mat-chip class="tc-chip">{{hasta.tcKimlik}}</mat-chip>
                        </div>
                      </mat-panel-title>
                      <mat-panel-description>
                        <div class="hasta-info">
                          <span>{{getYas(hasta.dogumTarihi)}} yaş</span>
                          <span>{{hasta.telefon}}</span>
                          <mat-chip [class]="hasta.aktif ? 'aktif-chip' : 'pasif-chip'">
                            {{hasta.aktif ? 'Aktif' : 'Pasif'}}
                          </mat-chip>
                        </div>
                      </mat-panel-description>
                    </mat-expansion-panel-header>
                    
                    <div class="hasta-details">
                      <div class="detail-grid">
                        <div class="detail-item">
                          <strong>Doğum Tarihi:</strong>
                          <span>{{hasta.dogumTarihi | date:'dd/MM/yyyy'}}</span>
                        </div>
                        <div class="detail-item">
                          <strong>Kan Grubu:</strong>
                          <span>{{hasta.kanGrubu}}</span>
                        </div>
                        <div class="detail-item">
                          <strong>Telefon:</strong>
                          <span>{{hasta.telefon}}</span>
                        </div>
                        <div class="detail-item">
                          <strong>E-posta:</strong>
                          <span>{{hasta.email || 'Belirtilmemiş'}}</span>
                        </div>
                        <div class="detail-item full-width">
                          <strong>Adres:</strong>
                          <span>{{hasta.adres}}</span>
                        </div>
                        <div class="detail-item" *ngIf="hasta.meslek">
                          <strong>Meslek:</strong>
                          <span>{{hasta.meslek}}</span>
                        </div>
                        <div class="detail-item" *ngIf="hasta.medeniDurum">
                          <strong>Medeni Durum:</strong>
                          <span>{{hasta.medeniDurum}}</span>
                        </div>
                        <div class="detail-item" *ngIf="hasta.sigortaBilgileri">
                          <strong>Sigorta:</strong>
                          <span>{{hasta.sigortaBilgileri.sigortaTuru}} - {{hasta.sigortaBilgileri.sigortaNo}}</span>
                        </div>
                        <div class="detail-item full-width" *ngIf="hasta.notlar">
                          <strong>Notlar:</strong>
                          <span>{{hasta.notlar}}</span>
                        </div>
                      </div>
                      
                      <div class="action-buttons">
                        <button mat-raised-button color="primary" (click)="hastaDetay(hasta)">
                          <mat-icon>visibility</mat-icon>
                          Detay
                        </button>
                        <button mat-raised-button color="accent" (click)="hastaGuncelle(hasta)">
                          <mat-icon>edit</mat-icon>
                          Güncelle
                        </button>
                        <button mat-raised-button color="warn" (click)="hastaSil(hasta)" [disabled]="!hasta.aktif">
                          <mat-icon>delete</mat-icon>
                          Sil
                        </button>
                      </div>
                    </div>
                  </mat-expansion-panel>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Hasta Kayıt Tab -->
        <mat-tab label="Hasta Kayıt">
          <div class="tab-content">
            <mat-card class="form-card">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>person_add</mat-icon>
                  Yeni Hasta Kaydı
                </mat-card-title>
                <mat-card-subtitle>Hasta bilgilerini eksiksiz doldurunuz</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <form [formGroup]="hastaForm" (ngSubmit)="hastaKaydet()" class="hasta-form">
                  
                  <!-- Temel Bilgiler -->
                  <h3 class="section-title">
                    <mat-icon>person</mat-icon>
                    Temel Bilgiler
                  </h3>
                  <div class="form-grid">
                    <mat-form-field appearance="outline">
                      <mat-label>TC Kimlik No *</mat-label>
                      <input matInput formControlName="tcKimlik" maxlength="11" 
                             (blur)="tcKimlikKontrol()" placeholder="11 haneli TC kimlik no">
                      <mat-icon matSuffix>badge</mat-icon>
                      <mat-error *ngIf="hastaForm.get('tcKimlik')?.hasError('required')">
                        TC Kimlik No zorunludur
                      </mat-error>
                      <mat-error *ngIf="hastaForm.get('tcKimlik')?.hasError('pattern')">
                        Geçerli bir TC Kimlik No giriniz
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Ad *</mat-label>
                      <input matInput formControlName="ad" placeholder="Hasta adı">
                      <mat-icon matSuffix>person</mat-icon>
                      <mat-error *ngIf="hastaForm.get('ad')?.hasError('required')">
                        Ad zorunludur
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Soyad *</mat-label>
                      <input matInput formControlName="soyad" placeholder="Hasta soyadı">
                      <mat-icon matSuffix>person</mat-icon>
                      <mat-error *ngIf="hastaForm.get('soyad')?.hasError('required')">
                        Soyad zorunludur
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Doğum Tarihi *</mat-label>
                      <input matInput [matDatepicker]="picker" formControlName="dogumTarihi">
                      <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                      <mat-datepicker #picker></mat-datepicker>
                      <mat-error *ngIf="hastaForm.get('dogumTarihi')?.hasError('required')">
                        Doğum tarihi zorunludur
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Cinsiyet *</mat-label>
                      <mat-select formControlName="cinsiyet">
                        <mat-option value="Erkek">Erkek</mat-option>
                        <mat-option value="Kadın">Kadın</mat-option>
                      </mat-select>
                      <mat-icon matSuffix>wc</mat-icon>
                      <mat-error *ngIf="hastaForm.get('cinsiyet')?.hasError('required')">
                        Cinsiyet seçimi zorunludur
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Kan Grubu</mat-label>
                      <mat-select formControlName="kanGrubu">
                        <mat-option value="A+">A Rh(+)</mat-option>
                        <mat-option value="A-">A Rh(-)</mat-option>
                        <mat-option value="B+">B Rh(+)</mat-option>
                        <mat-option value="B-">B Rh(-)</mat-option>
                        <mat-option value="AB+">AB Rh(+)</mat-option>
                        <mat-option value="AB-">AB Rh(-)</mat-option>
                        <mat-option value="O+">O Rh(+)</mat-option>
                        <mat-option value="O-">O Rh(-)</mat-option>
                      </mat-select>
                      <mat-icon matSuffix>opacity</mat-icon>
                    </mat-form-field>
                  </div>

                  <!-- İletişim Bilgileri -->
                  <h3 class="section-title">
                    <mat-icon>contact_phone</mat-icon>
                    İletişim Bilgileri
                  </h3>
                  <div class="form-grid">
                    <mat-form-field appearance="outline">
                      <mat-label>Telefon *</mat-label>
                      <input matInput formControlName="telefon" placeholder="5XX XXX XX XX">
                      <mat-icon matSuffix>phone</mat-icon>
                      <mat-error *ngIf="hastaForm.get('telefon')?.hasError('required')">
                        Telefon zorunludur
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>E-posta</mat-label>
                      <input matInput formControlName="email" type="email" placeholder="hasta@email.com">
                      <mat-icon matSuffix>email</mat-icon>
                      <mat-error *ngIf="hastaForm.get('email')?.hasError('email')">
                        Geçerli bir e-posta adresi giriniz
                      </mat-error>
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Adres *</mat-label>
                      <textarea matInput formControlName="adres" rows="3" placeholder="Tam adres"></textarea>
                      <mat-icon matSuffix>location_on</mat-icon>
                      <mat-error *ngIf="hastaForm.get('adres')?.hasError('required')">
                        Adres zorunludur
                      </mat-error>
                    </mat-form-field>
                  </div>

                  <!-- Ek Bilgiler -->
                  <h3 class="section-title">
                    <mat-icon>info</mat-icon>
                    Ek Bilgiler
                  </h3>
                  <div class="form-grid">
                    <mat-form-field appearance="outline">
                      <mat-label>Doğum Yeri</mat-label>
                      <input matInput formControlName="dogumYeri" placeholder="Doğum yeri">
                      <mat-icon matSuffix>place</mat-icon>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Baba Adı</mat-label>
                      <input matInput formControlName="babaAdi" placeholder="Baba adı">
                      <mat-icon matSuffix>person</mat-icon>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Ana Adı</mat-label>
                      <input matInput formControlName="anaAdi" placeholder="Ana adı">
                      <mat-icon matSuffix>person</mat-icon>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Meslek</mat-label>
                      <input matInput formControlName="meslek" placeholder="Meslek">
                      <mat-icon matSuffix>work</mat-icon>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Medeni Durum</mat-label>
                      <mat-select formControlName="medeniDurum">
                        <mat-option value="Bekar">Bekar</mat-option>
                        <mat-option value="Evli">Evli</mat-option>
                        <mat-option value="Dul">Dul</mat-option>
                        <mat-option value="Boşanmış">Boşanmış</mat-option>
                      </mat-select>
                      <mat-icon matSuffix>favorite</mat-icon>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Uyruk</mat-label>
                      <input matInput formControlName="uyruk" placeholder="TC, DE, vs.">
                      <mat-icon matSuffix>flag</mat-icon>
                    </mat-form-field>
                  </div>

                  <!-- Acil Durum Kişisi -->
                  <h3 class="section-title">
                    <mat-icon>emergency</mat-icon>
                    Acil Durum İletişim
                  </h3>
                  <div formGroupName="acilKisi" class="form-grid">
                    <mat-form-field appearance="outline">
                      <mat-label>Acil Kişi Adı</mat-label>
                      <input matInput formControlName="ad" placeholder="Acil durumda aranacak kişi">
                      <mat-icon matSuffix>person</mat-icon>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Acil Kişi Telefon</mat-label>
                      <input matInput formControlName="telefon" placeholder="Acil kişi telefonu">
                      <mat-icon matSuffix>phone</mat-icon>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Yakınlık</mat-label>
                      <mat-select formControlName="yakinlik">
                        <mat-option value="Anne">Anne</mat-option>
                        <mat-option value="Baba">Baba</mat-option>
                        <mat-option value="Eş">Eş</mat-option>
                        <mat-option value="Kardeş">Kardeş</mat-option>
                        <mat-option value="Çocuk">Çocuk</mat-option>
                        <mat-option value="Akraba">Akraba</mat-option>
                        <mat-option value="Arkadaş">Arkadaş</mat-option>
                      </mat-select>
                      <mat-icon matSuffix>family_restroom</mat-icon>
                    </mat-form-field>
                  </div>

                  <!-- Sigorta Bilgileri -->
                  <h3 class="section-title">
                    <mat-icon>verified_user</mat-icon>
                    Sigorta Bilgileri
                  </h3>
                  <div formGroupName="sigortaBilgileri" class="form-grid">
                    <mat-form-field appearance="outline">
                      <mat-label>Sigorta Türü</mat-label>
                      <mat-select formControlName="sigortaTuru">
                        <mat-option value="SGK">SGK</mat-option>
                        <mat-option value="Özel Sigorta">Özel Sigorta</mat-option>
                        <mat-option value="Yok">Sigorta Yok</mat-option>
                      </mat-select>
                      <mat-icon matSuffix>security</mat-icon>
                    </mat-form-field>

                    <mat-form-field appearance="outline">
                      <mat-label>Sigorta No</mat-label>
                      <input matInput formControlName="sigortaNo" placeholder="Sigorta numarası">
                      <mat-icon matSuffix>confirmation_number</mat-icon>
                    </mat-form-field>
                  </div>

                  <!-- Notlar -->
                  <div class="form-grid">
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Notlar</mat-label>
                      <textarea matInput formControlName="notlar" rows="3" placeholder="Hasta hakkında özel notlar"></textarea>
                      <mat-icon matSuffix>note</mat-icon>
                    </mat-form-field>
                  </div>

                  <!-- Form Buttons -->
                  <div class="form-actions">
                    <button mat-raised-button color="primary" type="submit" [disabled]="!hastaForm.valid || isLoading">
                      <mat-icon>save</mat-icon>
                      <span *ngIf="!isLoading">Hasta Kaydet</span>
                      <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
                    </button>
                    <button mat-button type="button" (click)="formTemizle()">
                      <mat-icon>clear</mat-icon>
                      Temizle
                    </button>
                    <button mat-button type="button" (click)="tcKimlikKontrol()" [disabled]="!hastaForm.get('tcKimlik')?.value">
                      <mat-icon>search</mat-icon>
                      TC Kontrol Et
                    </button>
                  </div>
                </form>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Hasta Listesi Tab -->
        <mat-tab label="Hasta Listesi">
          <div class="tab-content">
            <mat-card class="list-card">
              <mat-card-header>
                <mat-card-title>
                  <mat-icon>list</mat-icon>
                  Hasta Listesi
                </mat-card-title>
                <mat-card-subtitle>Kayıtlı tüm hastalar</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="table-toolbar">
                  <mat-form-field appearance="outline" class="filter-field">
                    <mat-label>Filtrele</mat-label>
                    <input matInput (keyup)="applyFilter($event)" placeholder="Ad, soyad, TC...">
                    <mat-icon matSuffix>filter_list</mat-icon>
                  </mat-form-field>
                  
                  <div class="toolbar-buttons">
                    <button mat-raised-button color="primary" (click)="refreshList()">
                      <mat-icon>refresh</mat-icon>
                      Yenile
                    </button>
                    <button mat-raised-button color="accent" (click)="exportList()">
                      <mat-icon>download</mat-icon>
                      Dışa Aktar
                    </button>
                  </div>
                </div>

                <div class="table-container">
                  <table mat-table [dataSource]="dataSource" matSort class="hasta-table">
                    
                    <!-- TC Kimlik Column -->
                    <ng-container matColumnDef="tcKimlik">
                      <th mat-header-cell *matHeaderCellDef mat-sort-header>TC Kimlik</th>
                      <td mat-cell *matCellDef="let hasta">{{hasta.tcKimlik}}</td>
                    </ng-container>

                    <!-- Ad Soyad Column -->
                    <ng-container matColumnDef="adSoyad">
                      <th mat-header-cell *matHeaderCellDef mat-sort-header>Ad Soyad</th>
                      <td mat-cell *matCellDef="let hasta">
                        <div class="name-cell">
                          <mat-icon [class]="hasta.cinsiyet === 'Erkek' ? 'male-icon' : 'female-icon'">
                            {{hasta.cinsiyet === 'Erkek' ? 'male' : 'female'}}
                          </mat-icon>
                          <span>{{hasta.ad}} {{hasta.soyad}}</span>
                        </div>
                      </td>
                    </ng-container>

                    <!-- Yaş Column -->
                    <ng-container matColumnDef="yas">
                      <th mat-header-cell *matHeaderCellDef mat-sort-header>Yaş</th>
                      <td mat-cell *matCellDef="let hasta">{{getYas(hasta.dogumTarihi)}}</td>
                    </ng-container>

                    <!-- Telefon Column -->
                    <ng-container matColumnDef="telefon">
                      <th mat-header-cell *matHeaderCellDef>Telefon</th>
                      <td mat-cell *matCellDef="let hasta">{{hasta.telefon}}</td>
                    </ng-container>

                    <!-- Kan Grubu Column -->
                    <ng-container matColumnDef="kanGrubu">
                      <th mat-header-cell *matHeaderCellDef mat-sort-header>Kan Grubu</th>
                      <td mat-cell *matCellDef="let hasta">
                        <mat-chip class="kan-grubu-chip">{{hasta.kanGrubu}}</mat-chip>
                      </td>
                    </ng-container>

                    <!-- Kayıt Tarihi Column -->
                    <ng-container matColumnDef="kayitTarihi">
                      <th mat-header-cell *matHeaderCellDef mat-sort-header>Kayıt Tarihi</th>
                      <td mat-cell *matCellDef="let hasta">{{hasta.kayitTarihi | date:'dd/MM/yyyy'}}</td>
                    </ng-container>

                    <!-- Durum Column -->
                    <ng-container matColumnDef="durum">
                      <th mat-header-cell *matHeaderCellDef>Durum</th>
                      <td mat-cell *matCellDef="let hasta">
                        <mat-chip [class]="hasta.aktif ? 'aktif-chip' : 'pasif-chip'">
                          {{hasta.aktif ? 'Aktif' : 'Pasif'}}
                        </mat-chip>
                      </td>
                    </ng-container>

                    <!-- Actions Column -->
                    <ng-container matColumnDef="actions">
                      <th mat-header-cell *matHeaderCellDef>İşlemler</th>
                      <td mat-cell *matCellDef="let hasta">
                        <button mat-icon-button color="primary" 
                                (click)="hastaDetay(hasta)"
                                matTooltip="Detay">
                          <mat-icon>visibility</mat-icon>
                        </button>
                        <button mat-icon-button color="accent" 
                                (click)="hastaGuncelle(hasta)"
                                matTooltip="Güncelle">
                          <mat-icon>edit</mat-icon>
                        </button>
                        <button mat-icon-button color="warn" 
                                (click)="hastaSil(hasta)"
                                [disabled]="!hasta.aktif"
                                matTooltip="Sil">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
                        (click)="hastaDetay(row)" class="clickable-row"></tr>
                  </table>

                  <mat-paginator [pageSizeOptions]="[5, 10, 20, 50]" 
                                 showFirstLastButtons>
                  </mat-paginator>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

      </mat-tab-group>
    </div>

    <!-- Hasta Detay Modal -->
    <div class="modal-overlay" *ngIf="detayModalAcik" (click)="modalKapat()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <mat-card *ngIf="seciliHasta">
          <mat-card-header>
            <mat-card-title>
              <mat-icon>person</mat-icon>
              Hasta Detayları
            </mat-card-title>
            <button mat-icon-button (click)="modalKapat()" class="close-button">
              <mat-icon>close</mat-icon>
            </button>
          </mat-card-header>
          
          <mat-card-content>
            <div class="detay-grid">
              <div class="detay-section">
                <h3>Kişisel Bilgiler</h3>
                <div class="detay-row">
                  <label>TC Kimlik No:</label>
                  <span>{{seciliHasta.tcKimlik}}</span>
                </div>
                <div class="detay-row">
                  <label>Ad Soyad:</label>
                  <span>{{seciliHasta.ad}} {{seciliHasta.soyad}}</span>
                </div>
                <div class="detay-row">
                  <label>Doğum Tarihi:</label>
                  <span>{{seciliHasta.dogumTarihi | date:'dd/MM/yyyy'}}</span>
                </div>
                <div class="detay-row">
                  <label>Yaş:</label>
                  <span>{{getYas(seciliHasta.dogumTarihi)}}</span>
                </div>
                <div class="detay-row">
                  <label>Cinsiyet:</label>
                  <span>{{seciliHasta.cinsiyet}}</span>
                </div>
                <div class="detay-row">
                  <label>Kan Grubu:</label>
                  <span>{{seciliHasta.kanGrubu}}</span>
                </div>
              </div>

              <div class="detay-section">
                <h3>İletişim Bilgileri</h3>
                <div class="detay-row">
                  <label>Telefon:</label>
                  <span>{{seciliHasta.telefon}}</span>
                </div>
                <div class="detay-row">
                  <label>E-posta:</label>
                  <span>{{seciliHasta.email}}</span>
                </div>
                <div class="detay-row">
                  <label>Adres:</label>
                  <span>{{seciliHasta.adres}}</span>
                </div>
              </div>

              <div class="detay-section" *ngIf="seciliHasta.acilKisi">
                <h3>Acil Durumda Aranacak Kişi</h3>
                <div class="detay-row">
                  <label>Ad:</label>
                  <span>{{seciliHasta.acilKisi.ad}}</span>
                </div>
                <div class="detay-row">
                  <label>Telefon:</label>
                  <span>{{seciliHasta.acilKisi.telefon}}</span>
                </div>
                <div class="detay-row">
                  <label>Yakınlık:</label>
                  <span>{{seciliHasta.acilKisi.yakinlik}}</span>
                </div>
              </div>

              <div class="detay-section">
                <h3>Sistem Bilgileri</h3>
                <div class="detay-row">
                  <label>Kayıt Tarihi:</label>
                  <span>{{seciliHasta.kayitTarihi | date:'dd/MM/yyyy HH:mm'}}</span>
                </div>
                <div class="detay-row">
                  <label>Durum:</label>
                  <span [class]="seciliHasta.aktif ? 'status-active' : 'status-inactive'">
                    {{seciliHasta.aktif ? 'Aktif' : 'Pasif'}}
                  </span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .hasta-islemleri-container {
      padding: 20px;
      background: #f5f5f5;
      min-height: calc(100vh - 64px);
    }

    .toolbar {
      margin-bottom: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .toolbar-title {
      margin-left: 16px;
      font-weight: 500;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .stat-chip {
      margin-left: 8px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .tab-group {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .tab-content {
      padding: 24px;
    }

    .search-card, .form-card, .results-card, .list-card {
      margin-bottom: 20px;
      border-radius: 8px;
    }

    .search-form {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-field {
      flex: 1;
      min-width: 300px;
    }

    .search-results {
      margin-top: 16px;
    }

    .hasta-panel {
      margin-bottom: 8px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .hasta-header {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .male-icon {
      color: #2196F3;
    }

    .female-icon {
      color: #E91E63;
    }

    .hasta-name {
      font-weight: 500;
      font-size: 16px;
    }

    .tc-chip {
      background: #E3F2FD;
      color: #1976D2;
      font-family: monospace;
    }

    .hasta-info {
      display: flex;
      gap: 16px;
      align-items: center;
      color: #666;
    }

    .aktif-chip {
      background: #C8E6C9;
      color: #2E7D32;
    }

    .pasif-chip {
      background: #FFCDD2;
      color: #C62828;
    }

    .hasta-details {
      padding: 16px 0;
    }

    .detail-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .detail-item strong {
      color: #333;
      font-weight: 500;
    }

    .detail-item span {
      color: #666;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .result-count {
      background: #E3F2FD;
      color: #1976D2;
      margin-left: 16px;
    }

    .hasta-form {
      max-width: 100%;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #1976D2;
      margin: 24px 0 16px 0;
      font-weight: 500;
      border-bottom: 2px solid #E3F2FD;
      padding-bottom: 8px;
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

    .table-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      flex-wrap: wrap;
      gap: 16px;
    }

    .filter-field {
      min-width: 300px;
    }

    .toolbar-buttons {
      display: flex;
      gap: 12px;
    }

    .table-container {
      max-width: 100%;
      overflow: auto;
    }

    .hasta-table {
      width: 100%;
      background: white;
    }

    .name-cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .kan-grubu-chip {
      background: #FFF3E0;
      color: #F57C00;
      font-weight: 500;
    }

    .clickable-row {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .clickable-row:hover {
      background-color: #F5F5F5;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hasta-islemleri-container {
        padding: 10px;
      }

      .tab-content {
        padding: 16px;
      }

      .search-form {
        flex-direction: column;
        align-items: stretch;
      }

      .search-field {
        min-width: auto;
      }

      .form-grid {
        grid-template-columns: 1fr;
      }

      .detail-grid {
        grid-template-columns: 1fr;
      }

      .table-toolbar {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-field {
        min-width: auto;
      }
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      width: 90%;
      max-width: 800px;
      max-height: 90%;
      overflow-y: auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }

    .close-button {
      position: absolute;
      top: 8px;
      right: 8px;
    }

    .detay-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 16px;
    }

    .detay-section {
      padding: 16px;
      border: 1px solid #E0E0E0;
      border-radius: 8px;
      background: #FAFAFA;
    }

    .detay-section h3 {
      margin: 0 0 16px 0;
      color: #1976D2;
      font-size: 16px;
      font-weight: 500;
      border-bottom: 1px solid #E3F2FD;
      padding-bottom: 8px;
    }

    .detay-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      padding: 4px 0;
    }

    .detay-row label {
      font-weight: 500;
      color: #666;
      min-width: 120px;
    }

    .detay-row span {
      color: #333;
      text-align: right;
    }

    .status-active {
      color: #4CAF50;
      font-weight: 500;
    }

    .status-inactive {
      color: #F44336;
      font-weight: 500;
    }
  `]
})
export class HastaIslemleriComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  hastaForm: FormGroup;
  aramaMetni = '';
  aramaSonuclari: Hasta[] = [];
  hastalar: Hasta[] = [];
  dataSource = new MatTableDataSource<Hasta>([]);
  displayedColumns: string[] = ['tcKimlik', 'adSoyad', 'yas', 'telefon', 'kanGrubu', 'kayitTarihi', 'durum', 'actions'];
  isLoading = false;
  selectedTab = 0;
  seciliHasta: Hasta | null = null;
  detayModalAcik = false;
  istatistikler: any = {
    toplamHasta: 0,
    aktifHasta: 0,
    erkekHasta: 0,
    kadinHasta: 0
  };

  constructor(
    private fb: FormBuilder,
    private hastaService: HastaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.hastaForm = this.createForm();
  }

  ngOnInit() {
    this.loadHastalar();
    this.loadIstatistikler();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createForm(): FormGroup {
    return this.fb.group({
      tcKimlik: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      ad: ['', Validators.required],
      soyad: ['', Validators.required],
      dogumTarihi: ['', Validators.required],
      cinsiyet: ['', Validators.required],
      telefon: ['', Validators.required],
      email: ['', Validators.email],
      adres: ['', Validators.required],
      kanGrubu: [''],
      dogumYeri: [''],
      babaAdi: [''],
      anaAdi: [''],
      meslek: [''],
      medeniDurum: ['Bekar'],
      uyruk: ['TC'],
      acilKisi: this.fb.group({
        ad: [''],
        telefon: [''],
        yakinlik: ['']
      }),
      sigortaBilgileri: this.fb.group({
        sigortaTuru: ['SGK'],
        sigortaNo: [''],
        aktif: [true]
      }),
      notlar: ['']
    });
  }

  loadHastalar() {
    this.hastaService.getTumHastalar().subscribe(hastalar => {
      this.hastalar = hastalar;
      this.dataSource.data = hastalar;
    });
  }

  loadIstatistikler() {
    this.hastaService.getHastaIstatistikleri().subscribe(stats => {
      this.istatistikler = stats;
    });
  }

  aramaYap() {
    if (this.aramaMetni.trim()) {
      this.hastaService.aramaYap(this.aramaMetni).subscribe(sonuclar => {
        this.aramaSonuclari = sonuclar;
      });
    } else {
      this.aramaSonuclari = [];
    }
  }

  aramaTemizle() {
    this.aramaMetni = '';
    this.aramaSonuclari = [];
  }

  tcKimlikKontrol() {
    const tcKimlik = this.hastaForm.get('tcKimlik')?.value;
    if (tcKimlik) {
      if (this.hastaService.tcKimlikNoKontrol(tcKimlik)) {
        // TC kontrolü başarılı, mevcut hasta var mı kontrol et
        this.hastaService.getHastaByTcNo(tcKimlik).subscribe(hasta => {
          if (hasta) {
            this.snackBar.open('Bu TC kimlik numarasında kayıtlı hasta bulundu!', 'Tamam', {
              duration: 3000,
              panelClass: ['warning-snackbar']
            });
          } else {
            this.snackBar.open('TC kimlik numarası geçerli', 'Tamam', {
              duration: 2000,
              panelClass: ['success-snackbar']
            });
          }
        });
      } else {
        this.snackBar.open('Geçersiz TC kimlik numarası!', 'Tamam', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    }
  }

  hastaKaydet() {
    if (this.hastaForm.valid) {
      this.isLoading = true;
      
      const hastaData = this.hastaForm.value;
      this.hastaService.hastaKaydet(hastaData).subscribe({
        next: (yeniHasta) => {
          this.snackBar.open('Hasta başarıyla kaydedildi!', 'Tamam', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.formTemizle();
          this.loadHastalar();
          this.loadIstatistikler();
          this.isLoading = false;
        },
        error: (error) => {
          this.snackBar.open('Hasta kaydında hata oluştu!', 'Tamam', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          this.isLoading = false;
        }
      });
    }
  }

  formTemizle() {
    this.hastaForm.reset();
    this.hastaForm.patchValue({
      medeniDurum: 'Bekar',
      uyruk: 'TC',
      acilKisi: { ad: '', telefon: '', yakinlik: '' },
      sigortaBilgileri: { sigortaTuru: 'SGK', sigortaNo: '', aktif: true }
    });
  }

  hastaDetay(hasta: Hasta) {
    // Hasta detay dialog açılacak
    console.log('Hasta detay:', hasta);
  }

  hastaGuncelle(hasta: Hasta) {
    // Hasta güncelleme formu açılacak
    console.log('Hasta güncelle:', hasta);
  }

  hastaSil(hasta: Hasta) {
    if (confirm(`${hasta.ad} ${hasta.soyad} adlı hastayı silmek istediğinizden emin misiniz?`)) {
      this.hastaService.hastaSil(hasta.id).subscribe({
        next: (result) => {
          if (result) {
            this.snackBar.open('Hasta başarıyla silindi!', 'Tamam', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.loadHastalar();
            this.loadIstatistikler();
          }
        },
        error: (error) => {
          this.snackBar.open('Hasta silinirken hata oluştu!', 'Tamam', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshList() {
    this.loadHastalar();
    this.snackBar.open('Liste yenilendi', 'Tamam', {
      duration: 2000
    });
  }

  exportList() {
    // CSV export işlemi
    const csvData = this.hastalar.map(hasta => ({
      'TC Kimlik': hasta.tcKimlik,
      'Ad': hasta.ad,
      'Soyad': hasta.soyad,
      'Doğum Tarihi': hasta.dogumTarihi.toLocaleDateString('tr-TR'),
      'Cinsiyet': hasta.cinsiyet,
      'Telefon': hasta.telefon,
      'E-posta': hasta.email,
      'Kan Grubu': hasta.kanGrubu,
      'Kayıt Tarihi': hasta.kayitTarihi?.toLocaleDateString('tr-TR'),
      'Durum': hasta.aktif ? 'Aktif' : 'Pasif'
    }));
    
    console.log('Export data:', csvData);
    this.snackBar.open('Liste dışa aktarılıyor...', 'Tamam', {
      duration: 2000
    });
  }

  getYas(dogumTarihi: Date): number {
    const bugun = new Date();
    const dogum = new Date(dogumTarihi);
    let yas = bugun.getFullYear() - dogum.getFullYear();
    const ayFarki = bugun.getMonth() - dogum.getMonth();
    
    if (ayFarki < 0 || (ayFarki === 0 && bugun.getDate() < dogum.getDate())) {
      yas--;
    }
    
    return yas;
  }

  hastaDetayGoster(hasta: Hasta) {
    this.seciliHasta = hasta;
    this.detayModalAcik = true;
  }

  hastaDuzenle(hasta: Hasta) {
    this.seciliHasta = hasta;
    // Formu hasta bilgileriyle doldur
    this.hastaForm.patchValue({
      tcKimlik: hasta.tcKimlik,
      ad: hasta.ad,
      soyad: hasta.soyad,
      dogumTarihi: hasta.dogumTarihi,
      cinsiyet: hasta.cinsiyet,
      telefon: hasta.telefon,
      email: hasta.email,
      adres: typeof hasta.adres === 'string' ? hasta.adres : 
             hasta.adres ? `${hasta.adres.il}, ${hasta.adres.ilce}, ${hasta.adres.mahalle}` : '',
      kanGrubu: hasta.kanGrubu,
      medeniDurum: hasta.medeniDurum,
      meslek: hasta.meslek,
      acilKisiAdi: hasta.acilKisi?.ad,
      acilKisiTelefon: hasta.acilKisi?.telefon,
      acilKisiYakinlik: hasta.acilKisi?.yakinlik,
      sigortaTuru: hasta.sigortaBilgileri?.sigortaTuru,
      sigortaNo: hasta.sigortaBilgileri?.sigortaNo
    });
    this.selectedTab = 1; // Kayıt sekmesine geç
  }

  modalKapat() {
    this.detayModalAcik = false;
    this.seciliHasta = null;
  }
}

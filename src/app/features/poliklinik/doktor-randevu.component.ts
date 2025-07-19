import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';

import { PoliklinikService } from '../../services/poliklinik.service';
import { Poliklinik, Doktor, PoliklinikKategori, RandevuSlot, YeniRandevu, RandevuOncelik } from '../../models/poliklinik.model';
import { Hasta } from '../../models/hasta.model';

@Component({
  selector: 'app-doktor-randevu',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatExpansionModule,
    MatDividerModule,
    MatGridListModule
  ],
  templateUrl: './doktor-randevu.component.html',
  styleUrls: ['./doktor-randevu.component.css']
})
export class DoktorRandevuComponent implements OnInit {
  selectedTab = 0;
  yukleniyor = false;

  // Formlar
  doktorAramaForm!: FormGroup;
  randevuForm!: FormGroup;

  // Veriler
  poliklinikler: Poliklinik[] = [];
  doktorlar: Doktor[] = [];
  filtreliDoktorlar: Doktor[] = [];
  hastalar: Hasta[] = [];
  randevuSlotlari: RandevuSlot[] = [];
  
  // Seçili veriler
  seciliPoliklinik: Poliklinik | null = null;
  seciliDoktor: Doktor | null = null;
  seciliHasta: Hasta | null = null;
  seciliSlot: RandevuSlot | null = null;

  // Kategoriler
  kategoriler = Object.values(PoliklinikKategori);
  oncelikler = Object.values(RandevuOncelik);

  // Tablo kolonları
  doktorTableColumns = ['unvan', 'adSoyad', 'poliklinik', 'uzmanlik', 'deneyim', 'islemler'];

  constructor(
    private fb: FormBuilder,
    private poliklinikService: PoliklinikService,
    private dialog: MatDialog
  ) {
    this.createForms();
  }

  ngOnInit() {
    this.loadInitialData();
  }

  createForms() {
    this.doktorAramaForm = this.fb.group({
      aramaTerimi: [''],
      poliklinikId: [''],
      kategori: ['']
    });

    this.randevuForm = this.fb.group({
      hastaId: ['', Validators.required],
      doktorId: ['', Validators.required],
      tarih: ['', Validators.required],
      saat: ['', Validators.required],
      sikayet: [''],
      notlar: [''],
      oncelik: [RandevuOncelik.NORMAL, Validators.required]
    });
  }

  loadInitialData() {
    this.yukleniyor = true;

    // Poliklinikleri yükle
    this.poliklinikService.getPoliklinikler().subscribe(poliklinikler => {
      this.poliklinikler = poliklinikler;
    });

    // Doktorları yükle
    this.poliklinikService.getDoktorlar().subscribe(doktorlar => {
      this.doktorlar = doktorlar;
      this.filtreliDoktorlar = doktorlar;
    });

    // Mock hasta verileri
    this.hastalar = [
      { 
        id: '1', ad: 'Ali', soyad: 'Yılmaz', tcKimlik: '12345678901', 
        telefon: '0532 111 1111', email: 'ali.yilmaz@email.com', 
        dogumTarihi: new Date('1990-01-01'), cinsiyet: 'Erkek', 
        adres: 'İstanbul', sigorta: { tip: 'SGK', sirketAdi: 'SGK' }, 
        aktif: true, kayitTarihi: new Date()
      },
      { 
        id: '2', ad: 'Ayşe', soyad: 'Kaya', tcKimlik: '12345678902', 
        telefon: '0532 111 1112', email: 'ayse.kaya@email.com', 
        dogumTarihi: new Date('1985-05-15'), cinsiyet: 'Kadın', 
        adres: 'Ankara', sigorta: { tip: 'Özel', sirketAdi: 'Axa Sigorta' }, 
        aktif: true, kayitTarihi: new Date()
      },
      { 
        id: '3', ad: 'Mehmet', soyad: 'Öz', tcKimlik: '12345678903', 
        telefon: '0532 111 1113', email: 'mehmet.oz@email.com', 
        dogumTarihi: new Date('1975-09-20'), cinsiyet: 'Erkek', 
        adres: 'İzmir', sigorta: { tip: 'SGK', sirketAdi: 'SGK' }, 
        aktif: true, kayitTarihi: new Date()
      }
    ];
    
    this.yukleniyor = false;
  }

  doktorAra() {
    const formValue = this.doktorAramaForm.value;
    this.yukleniyor = true;

    let filtreliDoktorlar = [...this.doktorlar];

    // Arama terimi filtresi
    if (formValue.aramaTerimi) {
      const aramaTerimi = formValue.aramaTerimi.toLowerCase();
      filtreliDoktorlar = filtreliDoktorlar.filter(doktor =>
        (doktor.ad + ' ' + doktor.soyad).toLowerCase().includes(aramaTerimi) ||
        doktor.uzmanlikAlani.toLowerCase().includes(aramaTerimi) ||
        doktor.poliklinikAdi.toLowerCase().includes(aramaTerimi)
      );
    }

    // Poliklinik filtresi
    if (formValue.poliklinikId) {
      filtreliDoktorlar = filtreliDoktorlar.filter(doktor =>
        doktor.poliklinikId === formValue.poliklinikId
      );
    }

    // Kategori filtresi
    if (formValue.kategori) {
      const kategoriPoliklinikler = this.poliklinikler
        .filter(p => p.kategori === formValue.kategori)
        .map(p => p.id);
      filtreliDoktorlar = filtreliDoktorlar.filter(doktor =>
        kategoriPoliklinikler.includes(doktor.poliklinikId)
      );
    }

    setTimeout(() => {
      this.filtreliDoktorlar = filtreliDoktorlar;
      this.yukleniyor = false;
    }, 500);
  }

  doktorSec(doktor: Doktor) {
    this.seciliDoktor = doktor;
    this.seciliPoliklinik = this.poliklinikler.find(p => p.id === doktor.poliklinikId) || null;
    this.randevuForm.patchValue({
      doktorId: doktor.id
    });
    this.selectedTab = 1; // Randevu alma sekmesine geç
  }

  randevuTarihiSecildi() {
    if (this.seciliDoktor && this.randevuForm.get('tarih')?.value) {
      this.randevuSlotlariGetir();
    }
  }

  randevuSlotlariGetir() {
    if (!this.seciliDoktor || !this.randevuForm.get('tarih')?.value) return;

    this.yukleniyor = true;
    const tarih = this.randevuForm.get('tarih')?.value;

    this.poliklinikService.getMusaitRandevuSlotlari(this.seciliDoktor.id, tarih).subscribe(slotlar => {
      this.randevuSlotlari = slotlar;
      this.yukleniyor = false;
    });
  }

  slotSec(slot: RandevuSlot) {
    if (!slot.musait) return;

    this.seciliSlot = slot;
    this.randevuForm.patchValue({
      saat: slot.saat
    });
  }

  randevuAl() {
    if (this.randevuForm.invalid) {
      console.log('Lütfen tüm gerekli alanları doldurun');
      return;
    }

    this.yukleniyor = true;
    const formValue = this.randevuForm.value;

    const yeniRandevu: YeniRandevu = {
      hastaId: formValue.hastaId,
      doktorId: formValue.doktorId,
      poliklinikId: this.seciliDoktor?.poliklinikId || 0,
      tarih: formValue.tarih,
      saat: formValue.saat,
      sikayet: formValue.sikayet,
      notlar: formValue.notlar,
      oncelik: formValue.oncelik
    };

    this.poliklinikService.randevuAl(yeniRandevu).subscribe(success => {
      this.yukleniyor = false;
      if (success) {
        console.log('Randevu başarıyla alındı!');
        this.randevuForm.reset();
        this.randevuForm.patchValue({ oncelik: RandevuOncelik.NORMAL });
        this.seciliSlot = null;
        this.randevuSlotlari = [];
      } else {
        console.log('Randevu alınırken hata oluştu');
      }
    });
  }

  temizle() {
    this.doktorAramaForm.reset();
    this.filtreliDoktorlar = [...this.doktorlar];
  }

  getPoliklinikRengi(poliklinikId: number): string {
    const poliklinik = this.poliklinikler.find(p => p.id === poliklinikId);
    return poliklinik?.renk || '#666';
  }

  getHastaAdi(hastaId: string): string {
    const hasta = this.hastalar.find(h => h.id === hastaId);
    return hasta ? `${hasta.ad} ${hasta.soyad}` : '';
  }
}

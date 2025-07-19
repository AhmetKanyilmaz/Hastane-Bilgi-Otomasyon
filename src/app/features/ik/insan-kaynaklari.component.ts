import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

interface Personel {
  id: string;
  tcKimlik: string;
  ad: string;
  soyad: string;
  telefon: string;
  email: string;
  dogumTarihi: Date;
  cinsiyet: string;
  adres: string;
  pozisyon: string;
  departman: string;
  maas: number;
  iseBaslamaTarihi: Date;
  durum: 'Aktif' | 'İzinli' | 'Pasif';
  sicilNo: string;
  unvan: string;
  deneyimYili: number;
}

interface IzinTalebi {
  id: string;
  personelId: string;
  personelAdi: string;
  izinTipi: string;
  baslangicTarihi: Date;
  bitisTarihi: Date;
  gun: number;
  aciklama: string;
  durum: 'Bekliyor' | 'Onaylandı' | 'Reddedildi';
  talepTarihi: Date;
}

interface VardiyaPlani {
  id: string;
  personelId: string;
  personelAdi: string;
  tarih: Date;
  vardiya: 'Gündüz' | 'Gece' | 'Nöbet';
  baslangicSaati: string;
  bitisSaati: string;
}

@Component({
  selector: 'app-insan-kaynaklari',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatBadgeModule,
    MatDividerModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  templateUrl: './insan-kaynaklari.component.html',
  styleUrls: ['./insan-kaynaklari.component.css']
})
export class InsanKaynaklariComponent implements OnInit {
  // Personel verileri
  personeller: Personel[] = [];
  filteredPersoneller: Personel[] = [];
  
  // İzin talepleri
  izinTalepleri: IzinTalebi[] = [];
  bekleyenIzinler: IzinTalebi[] = [];
  
  // Vardiya planları
  vardiyaPlanlari: VardiyaPlani[] = [];
  
  // Formlar
  personelForm!: FormGroup;
  izinForm!: FormGroup;
  vardiyaForm!: FormGroup;
  aramaForm!: FormGroup;
  
  // Tablo kolonları
  personelColumns = ['sicilNo', 'adSoyad', 'pozisyon', 'departman', 'telefon', 'durum', 'islemler'];
  izinColumns = ['personelAdi', 'izinTipi', 'tarihAraligi', 'gun', 'durum', 'islemler'];
  vardiyaColumns = ['personelAdi', 'tarih', 'vardiya', 'saatAraligi', 'islemler'];
  
  // Seçenekler
  pozisyonlar = ['Doktor', 'Hemşire', 'Teknisyen', 'İdari Personel', 'Güvenlik', 'Temizlik'];
  departmanlar = ['Poliklinik', 'Laboratuvar', 'Radyoloji', 'İdari İşler', 'Mali İşler', 'İnsan Kaynakları'];
  izinTipleri = ['Yıllık İzin', 'Hastalık İzni', 'Mazeret İzni', 'Doğum İzni', 'Babalık İzni'];
  vardiyaTipleri = ['Gündüz', 'Gece', 'Nöbet'];
  
  selectedTab = 0;

  constructor(private fb: FormBuilder) {
    this.createForms();
  }

  ngOnInit() {
    console.log('İnsan Kaynakları modülü yüklendi');
    this.loadMockData();
  }

  createForms() {
    this.personelForm = this.fb.group({
      tcKimlik: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      ad: ['', Validators.required],
      soyad: ['', Validators.required],
      telefon: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dogumTarihi: ['', Validators.required],
      cinsiyet: ['', Validators.required],
      adres: ['', Validators.required],
      pozisyon: ['', Validators.required],
      departman: ['', Validators.required],
      maas: ['', [Validators.required, Validators.min(0)]],
      iseBaslamaTarihi: ['', Validators.required],
      unvan: [''],
      deneyimYili: [0, [Validators.min(0)]]
    });

    this.izinForm = this.fb.group({
      personelId: ['', Validators.required],
      izinTipi: ['', Validators.required],
      baslangicTarihi: ['', Validators.required],
      bitisTarihi: ['', Validators.required],
      aciklama: ['']
    });

    this.vardiyaForm = this.fb.group({
      personelId: ['', Validators.required],
      tarih: ['', Validators.required],
      vardiya: ['', Validators.required],
      baslangicSaati: ['', Validators.required],
      bitisSaati: ['', Validators.required]
    });

    this.aramaForm = this.fb.group({
      aramaTerimi: [''],
      departman: [''],
      pozisyon: [''],
      durum: ['']
    });
  }

  loadMockData() {
    // Mock personel verileri
    this.personeller = [
      {
        id: '1',
        tcKimlik: '12345678901',
        ad: 'Dr. Mehmet',
        soyad: 'Yılmaz',
        telefon: '0532 111 1111',
        email: 'mehmet.yilmaz@hastane.com',
        dogumTarihi: new Date('1980-05-15'),
        cinsiyet: 'Erkek',
        adres: 'İstanbul',
        pozisyon: 'Doktor',
        departman: 'Poliklinik',
        maas: 25000,
        iseBaslamaTarihi: new Date('2020-01-15'),
        durum: 'Aktif',
        sicilNo: 'HB001',
        unvan: 'Uzman Doktor',
        deneyimYili: 15
      },
      {
        id: '2',
        tcKimlik: '12345678902',
        ad: 'Hemşire Ayşe',
        soyad: 'Kaya',
        telefon: '0532 111 1112',
        email: 'ayse.kaya@hastane.com',
        dogumTarihi: new Date('1985-08-20'),
        cinsiyet: 'Kadın',
        adres: 'Ankara',
        pozisyon: 'Hemşire',
        departman: 'Poliklinik',
        maas: 12000,
        iseBaslamaTarihi: new Date('2019-03-10'),
        durum: 'Aktif',
        sicilNo: 'HB002',
        unvan: 'Başhemşire',
        deneyimYili: 10
      },
      {
        id: '3',
        tcKimlik: '12345678903',
        ad: 'Teknisyen Ali',
        soyad: 'Öz',
        telefon: '0532 111 1113',
        email: 'ali.oz@hastane.com',
        dogumTarihi: new Date('1990-12-05'),
        cinsiyet: 'Erkek',
        adres: 'İzmir',
        pozisyon: 'Teknisyen',
        departman: 'Laboratuvar',
        maas: 8000,
        iseBaslamaTarihi: new Date('2021-06-01'),
        durum: 'Aktif',
        sicilNo: 'HB003',
        unvan: 'Kıdemli Teknisyen',
        deneyimYili: 5
      }
    ];

    // Mock izin talepleri
    this.izinTalepleri = [
      {
        id: '1',
        personelId: '1',
        personelAdi: 'Dr. Mehmet Yılmaz',
        izinTipi: 'Yıllık İzin',
        baslangicTarihi: new Date('2025-08-01'),
        bitisTarihi: new Date('2025-08-15'),
        gun: 14,
        aciklama: 'Yaz tatili',
        durum: 'Bekliyor',
        talepTarihi: new Date()
      },
      {
        id: '2',
        personelId: '2',
        personelAdi: 'Hemşire Ayşe Kaya',
        izinTipi: 'Hastalık İzni',
        baslangicTarihi: new Date('2025-07-20'),
        bitisTarihi: new Date('2025-07-22'),
        gun: 3,
        aciklama: 'Grip',
        durum: 'Onaylandı',
        talepTarihi: new Date('2025-07-19')
      }
    ];

    // Mock vardiya planları
    this.vardiyaPlanlari = [
      {
        id: '1',
        personelId: '1',
        personelAdi: 'Dr. Mehmet Yılmaz',
        tarih: new Date('2025-07-18'),
        vardiya: 'Gündüz',
        baslangicSaati: '08:00',
        bitisSaati: '16:00'
      },
      {
        id: '2',
        personelId: '2',
        personelAdi: 'Hemşire Ayşe Kaya',
        tarih: new Date('2025-07-18'),
        vardiya: 'Gece',
        baslangicSaati: '20:00',
        bitisSaati: '08:00'
      }
    ];

    this.filteredPersoneller = [...this.personeller];
    this.bekleyenIzinler = this.izinTalepleri.filter(izin => izin.durum === 'Bekliyor');
  }

  // Personel işlemleri
  personelEkle() {
    if (this.personelForm.valid) {
      const yeniPersonel: Personel = {
        id: Date.now().toString(),
        sicilNo: `HB${(this.personeller.length + 1).toString().padStart(3, '0')}`,
        durum: 'Aktif',
        ...this.personelForm.value
      };
      
      this.personeller.push(yeniPersonel);
      this.filteredPersoneller = [...this.personeller];
      this.personelForm.reset();
      console.log('Yeni personel eklendi:', yeniPersonel.ad + ' ' + yeniPersonel.soyad);
    }
  }

  personelDuzenle(personel: Personel) {
    this.personelForm.patchValue(personel);
  }

  personelSil(id: string) {
    this.personeller = this.personeller.filter(p => p.id !== id);
    this.filteredPersoneller = [...this.personeller];
    console.log('Personel silindi');
  }

  // İzin işlemleri
  izinTalebiOlustur() {
    if (this.izinForm.valid) {
      const formValue = this.izinForm.value;
      const personel = this.personeller.find(p => p.id === formValue.personelId);
      
      const gunFarki = Math.ceil((formValue.bitisTarihi - formValue.baslangicTarihi) / (1000 * 60 * 60 * 24)) + 1;
      
      const yeniIzin: IzinTalebi = {
        id: Date.now().toString(),
        personelAdi: personel ? `${personel.ad} ${personel.soyad}` : '',
        gun: gunFarki,
        durum: 'Bekliyor',
        talepTarihi: new Date(),
        ...formValue
      };
      
      this.izinTalepleri.push(yeniIzin);
      this.bekleyenIzinler = this.izinTalepleri.filter(izin => izin.durum === 'Bekliyor');
      this.izinForm.reset();
      console.log('İzin talebi oluşturuldu');
    }
  }

  izinOnayla(id: string) {
    const izin = this.izinTalepleri.find(i => i.id === id);
    if (izin) {
      izin.durum = 'Onaylandı';
      this.bekleyenIzinler = this.izinTalepleri.filter(izin => izin.durum === 'Bekliyor');
      console.log('İzin onaylandı');
    }
  }

  izinReddet(id: string) {
    const izin = this.izinTalepleri.find(i => i.id === id);
    if (izin) {
      izin.durum = 'Reddedildi';
      this.bekleyenIzinler = this.izinTalepleri.filter(izin => izin.durum === 'Bekliyor');
      console.log('İzin reddedildi');
    }
  }

  // Vardiya işlemleri
  vardiyaEkle() {
    if (this.vardiyaForm.valid) {
      const formValue = this.vardiyaForm.value;
      const personel = this.personeller.find(p => p.id === formValue.personelId);
      
      const yeniVardiya: VardiyaPlani = {
        id: Date.now().toString(),
        personelAdi: personel ? `${personel.ad} ${personel.soyad}` : '',
        ...formValue
      };
      
      this.vardiyaPlanlari.push(yeniVardiya);
      this.vardiyaForm.reset();
      console.log('Vardiya planı eklendi');
    }
  }

  vardiyaSil(id: string) {
    this.vardiyaPlanlari = this.vardiyaPlanlari.filter((v: VardiyaPlani) => v.id !== id);
    console.log('Vardiya planı silindi');
  }

  // Arama ve filtreleme
  aramaTerimi = '';
  
  // Helper methods
  getAktifPersonelSayisi(): number {
    return this.personeller.filter(p => p.durum === 'Aktif').length;
  }
  personelAra() {
    const { aramaTerimi, departman, pozisyon, durum } = this.aramaForm.value;
    
    this.filteredPersoneller = this.personeller.filter(personel => {
      const aramaUygun = !aramaTerimi || 
        personel.ad.toLowerCase().includes(aramaTerimi.toLowerCase()) ||
        personel.soyad.toLowerCase().includes(aramaTerimi.toLowerCase()) ||
        personel.sicilNo.toLowerCase().includes(aramaTerimi.toLowerCase());
      
      const departmanUygun = !departman || personel.departman === departman;
      const pozisyonUygun = !pozisyon || personel.pozisyon === pozisyon;
      const durumUygun = !durum || personel.durum === durum;
      
      return aramaUygun && departmanUygun && pozisyonUygun && durumUygun;
    });
  }

  aramaTemizle() {
    this.aramaForm.reset();
    this.filteredPersoneller = [...this.personeller];
  }

  // Yardımcı fonksiyonlar
  getDurumClass(durum: string): string {
    switch (durum) {
      case 'Aktif': return 'aktif-chip';
      case 'İzinli': return 'izinli-chip';
      case 'Pasif': return 'pasif-chip';
      default: return '';
    }
  }

  getIzinDurumClass(durum: string): string {
    switch (durum) {
      case 'Bekliyor': return 'bekliyor-chip';
      case 'Onaylandı': return 'onaylandi-chip';
      case 'Reddedildi': return 'reddedildi-chip';
      default: return '';
    }
  }
}

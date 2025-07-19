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
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface StokKalemi {
  id: string;
  kod: string;
  ad: string;
  kategori: string;
  marka: string;
  model: string;
  birim: string;
  stokMiktari: number;
  minStokSeviyesi: number;
  maxStokSeviyesi: number;
  birimFiyat: number;
  toplamDeger: number;
  sonKullanmaTarihi?: Date;
  tedarikci: string;
  rafNo: string;
  aciklama: string;
  durum: 'Aktif' | 'Pasif' | 'Kritik';
  kayitTarihi: Date;
}

interface StokHareketi {
  id: string;
  stokKalemiId: string;
  stokKalemiAdi: string;
  hareketTipi: 'Giriş' | 'Çıkış' | 'Transfer' | 'Sayım';
  miktar: number;
  oncekiMiktar: number;
  yeniMiktar: number;
  birimFiyat: number;
  toplamTutar: number;
  tarih: Date;
  kullanici: string;
  aciklama: string;
  belgeNo?: string;
}

interface Tedarikci {
  id: string;
  kod: string;
  unvan: string;
  yetkiliKisi: string;
  telefon: string;
  email: string;
  adres: string;
  vergiNo: string;
  durum: 'Aktif' | 'Pasif';
}

interface TalepFormu {
  id: string;
  departman: string;
  talepEden: string;
  talepTarihi: Date;
  aciklama: string;
  durum: 'Bekliyor' | 'Onaylandı' | 'Reddedildi' | 'Tamamlandı';
  onaylayanKisi?: string;
  onayTarihi?: Date;
  kalemleri: TalepKalemi[];
}

interface TalepKalemi {
  stokKalemiId: string;
  stokKalemiAdi: string;
  talipMiktari: number;
  birim: string;
  aciklama: string;
}

@Component({
  selector: 'app-stok-yonetimi',
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
    MatDialogModule,
    MatProgressBarModule
  ],
  templateUrl: './stok-yonetimi.component.html',
  styleUrls: ['./stok-yonetimi.component.css']
})
export class StokYonetimiComponent implements OnInit {
  // Veriler
  stokKalemleri: StokKalemi[] = [];
  filteredStokKalemleri: StokKalemi[] = [];
  stokHareketleri: StokHareketi[] = [];
  tedarikciler: Tedarikci[] = [];
  talepFormlari: TalepFormu[] = [];
  bekleyenTalepler: TalepFormu[] = [];
  kritikStoklar: StokKalemi[] = [];
  
  // Formlar
  stokForm!: FormGroup;
  hareketForm!: FormGroup;
  tedarikciForm!: FormGroup;
  talepForm!: FormGroup;
  aramaForm!: FormGroup;
  
  // Tablo kolonları
  stokColumns = ['kod', 'ad', 'kategori', 'stokMiktari', 'birimFiyat', 'durum', 'islemler'];
  hareketColumns = ['tarih', 'stokKalemi', 'hareketTipi', 'miktar', 'kullanici', 'islemler'];
  tedarikciColumns = ['kod', 'unvan', 'yetkiliKisi', 'telefon', 'durum', 'islemler'];
  talepColumns = ['departman', 'talepEden', 'talepTarihi', 'durum', 'islemler'];
  
  // Seçenekler
  kategoriler = ['İlaç', 'Tıbbi Malzeme', 'Laboratuvar', 'Radyoloji', 'Temizlik', 'Kırtasiye', 'Teknik'];
  birimler = ['Adet', 'Kutu', 'Şişe', 'Paket', 'Kg', 'Litre', 'Metre'];
  hareketTipleri = ['Giriş', 'Çıkış', 'Transfer', 'Sayım'];
  departmanlar = ['Poliklinik', 'Laboratuvar', 'Radyoloji', 'İdari İşler', 'Mali İşler', 'Temizlik'];
  
  selectedTab = 0;

  constructor(private fb: FormBuilder) {
    this.createForms();
  }

  ngOnInit() {
    console.log('Stok Yönetimi modülü yüklendi');
    this.loadMockData();
  }

  createForms() {
    this.stokForm = this.fb.group({
      kod: ['', Validators.required],
      ad: ['', Validators.required],
      kategori: ['', Validators.required],
      marka: [''],
      model: [''],
      birim: ['', Validators.required],
      stokMiktari: [0, [Validators.required, Validators.min(0)]],
      minStokSeviyesi: [0, [Validators.required, Validators.min(0)]],
      maxStokSeviyesi: [0, [Validators.required, Validators.min(0)]],
      birimFiyat: [0, [Validators.required, Validators.min(0)]],
      sonKullanmaTarihi: [''],
      tedarikci: ['', Validators.required],
      rafNo: [''],
      aciklama: ['']
    });

    this.hareketForm = this.fb.group({
      stokKalemiId: ['', Validators.required],
      hareketTipi: ['', Validators.required],
      miktar: [0, [Validators.required, Validators.min(0.01)]],
      birimFiyat: [0, [Validators.min(0)]],
      aciklama: [''],
      belgeNo: ['']
    });

    this.tedarikciForm = this.fb.group({
      kod: ['', Validators.required],
      unvan: ['', Validators.required],
      yetkiliKisi: ['', Validators.required],
      telefon: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adres: ['', Validators.required],
      vergiNo: ['', Validators.required]
    });

    this.talepForm = this.fb.group({
      departman: ['', Validators.required],
      talepEden: ['', Validators.required],
      aciklama: ['']
    });

    this.aramaForm = this.fb.group({
      aramaTerimi: [''],
      kategori: [''],
      durum: [''],
      tedarikci: ['']
    });
  }

  loadMockData() {
    // Mock tedarikci verileri
    this.tedarikciler = [
      {
        id: '1',
        kod: 'TED001',
        unvan: 'Medikal Tedarik A.Ş.',
        yetkiliKisi: 'Ahmet Kaya',
        telefon: '0212 555 1111',
        email: 'info@medikaltedarik.com',
        adres: 'İstanbul',
        vergiNo: '1234567890',
        durum: 'Aktif'
      },
      {
        id: '2',
        kod: 'TED002',
        unvan: 'Sağlık Malzeme Ltd.',
        yetkiliKisi: 'Mehmet Yılmaz',
        telefon: '0312 555 2222',
        email: 'info@saglikmalzeme.com',
        adres: 'Ankara',
        vergiNo: '0987654321',
        durum: 'Aktif'
      }
    ];

    // Mock stok kalemleri
    this.stokKalemleri = [
      {
        id: '1',
        kod: 'ILC001',
        ad: 'Paracetamol 500mg',
        kategori: 'İlaç',
        marka: 'Atabay',
        model: '500mg',
        birim: 'Kutu',
        stokMiktari: 50,
        minStokSeviyesi: 20,
        maxStokSeviyesi: 100,
        birimFiyat: 12.50,
        toplamDeger: 625,
        sonKullanmaTarihi: new Date('2026-12-31'),
        tedarikci: 'Medikal Tedarik A.Ş.',
        rafNo: 'A1-01',
        aciklama: 'Ağrı kesici',
        durum: 'Aktif',
        kayitTarihi: new Date('2025-01-01')
      },
      {
        id: '2',
        kod: 'TMM001',
        ad: 'Steril Eldiven',
        kategori: 'Tıbbi Malzeme',
        marka: 'Ansell',
        model: 'Latex',
        birim: 'Kutu',
        stokMiktari: 15,
        minStokSeviyesi: 25,
        maxStokSeviyesi: 100,
        birimFiyat: 45.00,
        toplamDeger: 675,
        tedarikci: 'Sağlık Malzeme Ltd.',
        rafNo: 'B2-03',
        aciklama: 'Muayene eldiveni',
        durum: 'Kritik',
        kayitTarihi: new Date('2025-01-15')
      },
      {
        id: '3',
        kod: 'LAB001',
        ad: 'Test Tüpü',
        kategori: 'Laboratuvar',
        marka: 'BD',
        model: '5ml',
        birim: 'Paket',
        stokMiktari: 200,
        minStokSeviyesi: 50,
        maxStokSeviyesi: 300,
        birimFiyat: 2.50,
        toplamDeger: 500,
        tedarikci: 'Medikal Tedarik A.Ş.',
        rafNo: 'C1-15',
        aciklama: 'Kan test tüpü',
        durum: 'Aktif',
        kayitTarihi: new Date('2025-02-01')
      }
    ];

    // Mock stok hareketleri
    this.stokHareketleri = [
      {
        id: '1',
        stokKalemiId: '1',
        stokKalemiAdi: 'Paracetamol 500mg',
        hareketTipi: 'Giriş',
        miktar: 100,
        oncekiMiktar: 0,
        yeniMiktar: 100,
        birimFiyat: 12.50,
        toplamTutar: 1250,
        tarih: new Date('2025-07-01'),
        kullanici: 'Stok Sorumlusu',
        aciklama: 'İlk stok girişi',
        belgeNo: 'FIS001'
      },
      {
        id: '2',
        stokKalemiId: '1',
        stokKalemiAdi: 'Paracetamol 500mg',
        hareketTipi: 'Çıkış',
        miktar: 50,
        oncekiMiktar: 100,
        yeniMiktar: 50,
        birimFiyat: 12.50,
        toplamTutar: 625,
        tarih: new Date('2025-07-15'),
        kullanici: 'Eczane Sorumlusu',
        aciklama: 'Poliklinik çıkışı',
        belgeNo: 'CIK001'
      }
    ];

    // Mock talep formları
    this.talepFormlari = [
      {
        id: '1',
        departman: 'Poliklinik',
        talepEden: 'Dr. Ayşe Yılmaz',
        talepTarihi: new Date(),
        aciklama: 'Acil ihtiyaç',
        durum: 'Bekliyor',
        kalemleri: [
          {
            stokKalemiId: '2',
            stokKalemiAdi: 'Steril Eldiven',
            talipMiktari: 10,
            birim: 'Kutu',
            aciklama: 'Muayene için'
          }
        ]
      }
    ];

    this.filteredStokKalemleri = [...this.stokKalemleri];
    this.bekleyenTalepler = this.talepFormlari.filter(talep => talep.durum === 'Bekliyor');
    this.kritikStoklar = this.stokKalemleri.filter(stok => stok.stokMiktari <= stok.minStokSeviyesi);
    
    // Durum güncellemeleri
    this.updateStokDurumlari();
  }

  updateStokDurumlari() {
    this.stokKalemleri.forEach(stok => {
      if (stok.stokMiktari <= stok.minStokSeviyesi) {
        stok.durum = 'Kritik';
      } else {
        stok.durum = 'Aktif';
      }
      stok.toplamDeger = stok.stokMiktari * stok.birimFiyat;
    });
    this.kritikStoklar = this.stokKalemleri.filter(stok => stok.durum === 'Kritik');
  }

  // Stok işlemleri
  stokEkle() {
    if (this.stokForm.valid) {
      const yeniStok: StokKalemi = {
        id: Date.now().toString(),
        durum: 'Aktif',
        toplamDeger: 0,
        kayitTarihi: new Date(),
        ...this.stokForm.value
      };
      
      yeniStok.toplamDeger = yeniStok.stokMiktari * yeniStok.birimFiyat;
      
      this.stokKalemleri.push(yeniStok);
      this.filteredStokKalemleri = [...this.stokKalemleri];
      this.updateStokDurumlari();
      this.stokForm.reset();
      console.log('Yeni stok kalemi eklendi:', yeniStok.ad);
    }
  }

  stokDuzenle(stok: StokKalemi) {
    this.stokForm.patchValue(stok);
  }

  stokSil(id: string) {
    this.stokKalemleri = this.stokKalemleri.filter(s => s.id !== id);
    this.filteredStokKalemleri = [...this.stokKalemleri];
    this.updateStokDurumlari();
    console.log('Stok kalemi silindi');
  }

  // Stok hareket işlemleri
  stokHareketiEkle() {
    if (this.hareketForm.valid) {
      const formValue = this.hareketForm.value;
      const stokKalemi = this.stokKalemleri.find(s => s.id === formValue.stokKalemiId);
      
      if (stokKalemi) {
        const oncekiMiktar = stokKalemi.stokMiktari;
        let yeniMiktar = oncekiMiktar;
        
        if (formValue.hareketTipi === 'Giriş') {
          yeniMiktar += formValue.miktar;
        } else if (formValue.hareketTipi === 'Çıkış') {
          yeniMiktar -= formValue.miktar;
        }
        
        const yeniHareket: StokHareketi = {
          id: Date.now().toString(),
          stokKalemiAdi: stokKalemi.ad,
          oncekiMiktar: oncekiMiktar,
          yeniMiktar: yeniMiktar,
          toplamTutar: formValue.miktar * (formValue.birimFiyat || stokKalemi.birimFiyat),
          tarih: new Date(),
          kullanici: 'Sistem Kullanıcısı',
          ...formValue
        };
        
        // Stok miktarını güncelle
        stokKalemi.stokMiktari = yeniMiktar;
        
        this.stokHareketleri.push(yeniHareket);
        this.updateStokDurumlari();
        this.hareketForm.reset();
        console.log('Stok hareketi eklendi');
      }
    }
  }

  // Tedarikci işlemleri
  tedarikciEkle() {
    if (this.tedarikciForm.valid) {
      const yeniTedarikci: Tedarikci = {
        id: Date.now().toString(),
        durum: 'Aktif',
        ...this.tedarikciForm.value
      };
      
      this.tedarikciler.push(yeniTedarikci);
      this.tedarikciForm.reset();
      console.log('Yeni tedarikci eklendi:', yeniTedarikci.unvan);
    }
  }

  tedarikciDuzenle(tedarikci: Tedarikci) {
    this.tedarikciForm.patchValue(tedarikci);
  }

  tedarikciSil(id: string) {
    this.tedarikciler = this.tedarikciler.filter(t => t.id !== id);
    console.log('Tedarikci silindi');
  }

  // Talep işlemleri
  talepOlustur() {
    if (this.talepForm.valid) {
      const yeniTalep: TalepFormu = {
        id: Date.now().toString(),
        talepTarihi: new Date(),
        durum: 'Bekliyor',
        kalemleri: [],
        ...this.talepForm.value
      };
      
      this.talepFormlari.push(yeniTalep);
      this.bekleyenTalepler = this.talepFormlari.filter(talep => talep.durum === 'Bekliyor');
      this.talepForm.reset();
      console.log('Yeni talep oluşturuldu');
    }
  }

  talepOnayla(id: string) {
    const talep = this.talepFormlari.find(t => t.id === id);
    if (talep) {
      talep.durum = 'Onaylandı';
      talep.onaylayanKisi = 'Stok Müdürü';
      talep.onayTarihi = new Date();
      this.bekleyenTalepler = this.talepFormlari.filter(talep => talep.durum === 'Bekliyor');
      console.log('Talep onaylandı');
    }
  }

  talepReddet(id: string) {
    const talep = this.talepFormlari.find(t => t.id === id);
    if (talep) {
      talep.durum = 'Reddedildi';
      this.bekleyenTalepler = this.talepFormlari.filter(talep => talep.durum === 'Bekliyor');
      console.log('Talep reddedildi');
    }
  }

  // Arama ve filtreleme
  stokAra() {
    const { aramaTerimi, kategori, durum, tedarikci } = this.aramaForm.value;
    
    this.filteredStokKalemleri = this.stokKalemleri.filter(stok => {
      const aramaUygun = !aramaTerimi || 
        stok.ad.toLowerCase().includes(aramaTerimi.toLowerCase()) ||
        stok.kod.toLowerCase().includes(aramaTerimi.toLowerCase());
      
      const kategoriUygun = !kategori || stok.kategori === kategori;
      const durumUygun = !durum || stok.durum === durum;
      const tedarikciUygun = !tedarikci || stok.tedarikci === tedarikci;
      
      return aramaUygun && kategoriUygun && durumUygun && tedarikciUygun;
    });
  }

  aramaTemizle() {
    this.aramaForm.reset();
    this.filteredStokKalemleri = [...this.stokKalemleri];
  }

  // Yardımcı fonksiyonlar
  getDurumClass(durum: string): string {
    switch (durum) {
      case 'Aktif': return 'aktif-chip';
      case 'Kritik': return 'kritik-chip';
      case 'Pasif': return 'pasif-chip';
      default: return '';
    }
  }

  getTalepDurumClass(durum: string): string {
    switch (durum) {
      case 'Bekliyor': return 'bekliyor-chip';
      case 'Onaylandı': return 'onaylandi-chip';
      case 'Reddedildi': return 'reddedildi-chip';
      case 'Tamamlandı': return 'tamamlandi-chip';
      default: return '';
    }
  }

  getStokSeviyeClass(stok: StokKalemi): string {
    const yuzde = (stok.stokMiktari / stok.maxStokSeviyesi) * 100;
    if (yuzde <= 25) return 'kritik-seviye';
    if (yuzde <= 50) return 'dusuk-seviye';
    if (yuzde <= 75) return 'orta-seviye';
    return 'yuksek-seviye';
  }

  getStokSeviyeYuzde(stok: StokKalemi): number {
    return (stok.stokMiktari / stok.maxStokSeviyesi) * 100;
  }
}

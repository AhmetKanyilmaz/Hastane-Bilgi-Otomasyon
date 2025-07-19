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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RadyolojiService } from '../../services/radyoloji.service';
import { 
  RadyolojiIstek, 
  RadyolojiTetkikTuru, 
  RadyolojiOncelik, 
  RadyolojiDurum,
  RadyolojiPersonel,
  RadyolojiCihaz,
  RadyolojiIstatistik
} from '../../models/radyoloji.model';

@Component({
  selector: 'app-radyoloji-ekrani',
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
    MatGridListModule,
    MatProgressBarModule,
    MatMenuModule,
    MatTooltipModule
  ],
  templateUrl: './radyoloji-ekrani.component.html',
  styleUrls: ['./radyoloji-ekrani.component.css']
})
export class RadyolojiEkraniComponent implements OnInit {
  // Enum'ları template'de kullanabilmek için public hale getiriyoruz
  RadyolojiDurum = RadyolojiDurum;
  RadyolojiTetkikTuru = RadyolojiTetkikTuru;
  RadyolojiOncelik = RadyolojiOncelik;

  // Component properties
  selectedTab = 0;
  yukleniyor = false;

  // Formlar
  istekAramaForm!: FormGroup;
  yeniIstekForm!: FormGroup;

  // Veriler
  radyolojiIstekleri: RadyolojiIstek[] = [];
  filtreliIstekler: RadyolojiIstek[] = [];
  personel: RadyolojiPersonel[] = [];
  cihazlar: RadyolojiCihaz[] = [];
  istatistikler: RadyolojiIstatistik | null = null;

  // Enum'ları template'de kullanmak için
  tetkikTurleri = Object.values(RadyolojiTetkikTuru);
  oncelikler = Object.values(RadyolojiOncelik);
  durumlar = Object.values(RadyolojiDurum);

  // Tablo kolonları
  istekTableColumns = ['id', 'hastaAdi', 'tetkikAdi', 'istekTarihi', 'oncelik', 'durum', 'islemler'];
  cihazTableColumns = ['ad', 'tip', 'durum', 'lokasyon', 'sonBakim', 'islemler'];
  personelTableColumns = ['adSoyad', 'unvan', 'uzmanlik', 'telefon', 'islemler'];

  constructor(
    private fb: FormBuilder,
    private radyolojiService: RadyolojiService,
    private dialog: MatDialog
  ) {
    this.createForms();
  }

  ngOnInit() {
    this.loadInitialData();
  }

  createForms() {
    this.istekAramaForm = this.fb.group({
      hastaAdi: [''],
      tetkikTuru: [''],
      durum: [''],
      tarihBaslangic: [''],
      tarihBitis: ['']
    });

    this.yeniIstekForm = this.fb.group({
      hastaId: ['', Validators.required],
      hastaAdi: ['', Validators.required],
      hastaTcKimlik: ['', [Validators.required, Validators.minLength(11)]],
      doktorId: ['', Validators.required],
      doktorAdi: ['', Validators.required],
      poliklinikAdi: ['', Validators.required],
      tetkikTuru: ['', Validators.required],
      tetkikAdi: ['', Validators.required],
      klinikBilgi: ['', Validators.required],
      onTani: ['', Validators.required],
      aciklama: [''],
      oncelik: [RadyolojiOncelik.NORMAL, Validators.required],
      maliyet: [0, [Validators.required, Validators.min(0)]],
      odemeYontem: ['']
    });
  }

  loadInitialData() {
    this.yukleniyor = true;

    // İstekleri yükle
    this.radyolojiService.getRadyolojiIstekleri().subscribe(istekler => {
      this.radyolojiIstekleri = istekler;
      this.filtreliIstekler = istekler;
    });

    // Personeli yükle
    this.radyolojiService.getPersonel().subscribe(personel => {
      this.personel = personel;
    });

    // Cihazları yükle
    this.radyolojiService.getCihazlar().subscribe(cihazlar => {
      this.cihazlar = cihazlar;
    });

    // İstatistikleri yükle
    this.radyolojiService.getIstatistikler().subscribe(istatistikler => {
      this.istatistikler = istatistikler;
      this.yukleniyor = false;
    });
  }

  istekAra() {
    const formValue = this.istekAramaForm.value;
    this.yukleniyor = true;

    this.radyolojiService.istekAra(formValue).subscribe(sonuclar => {
      this.filtreliIstekler = sonuclar;
      this.yukleniyor = false;
    });
  }

  aramaTemizle() {
    this.istekAramaForm.reset();
    this.filtreliIstekler = [...this.radyolojiIstekleri];
  }

  yeniIstekKaydet() {
    if (this.yeniIstekForm.invalid) {
      console.log('Form geçersiz');
      return;
    }

    this.yukleniyor = true;
    const formValue = this.yeniIstekForm.value;

    this.radyolojiService.radyolojiIstekEkle(formValue).subscribe(yeniIstek => {
      this.radyolojiIstekleri.unshift(yeniIstek);
      this.filtreliIstekler.unshift(yeniIstek);
      this.yeniIstekForm.reset();
      this.yeniIstekForm.patchValue({ oncelik: RadyolojiOncelik.NORMAL, maliyet: 0 });
      this.yukleniyor = false;
      console.log('Radyoloji isteği başarıyla oluşturuldu');
    });
  }

  istekDurumGuncelle(istekId: string, yeniDurum: RadyolojiDurum) {
    this.yukleniyor = true;
    
    this.radyolojiService.istekDurumGuncelle(istekId, yeniDurum).subscribe(basarili => {
      if (basarili) {
        const istek = this.radyolojiIstekleri.find(i => i.id === istekId);
        if (istek) {
          istek.durum = yeniDurum;
        }
        console.log('Durum güncellendi');
      }
      this.yukleniyor = false;
    });
  }

  getDurumRengi(durum: RadyolojiDurum): string {
    const renkler = {
      [RadyolojiDurum.ISTEK_VERILDI]: '#ff9800',
      [RadyolojiDurum.RANDEVU_VERILDI]: '#2196f3',
      [RadyolojiDurum.HASTA_CAGRILDI]: '#9c27b0',
      [RadyolojiDurum.CEKIM_DEVAM_EDIYOR]: '#ff5722',
      [RadyolojiDurum.CEKIM_TAMAMLANDI]: '#795548',
      [RadyolojiDurum.RAPOR_YAZILIYOR]: '#607d8b',
      [RadyolojiDurum.RAPOR_TAMAMLANDI]: '#4caf50',
      [RadyolojiDurum.TESLIM_EDILDI]: '#8bc34a',
      [RadyolojiDurum.IPTAL]: '#f44336'
    };
    return renkler[durum] || '#666';
  }

  getOncelikRengi(oncelik: RadyolojiOncelik): string {
    const renkler = {
      [RadyolojiOncelik.NORMAL]: '#4caf50',
      [RadyolojiOncelik.ACIL]: '#ff9800',
      [RadyolojiOncelik.ÇOK_ACIL]: '#f44336',
      [RadyolojiOncelik.STAT]: '#d32f2f'
    };
    return renkler[oncelik] || '#666';
  }

  getCihazDurumRengi(durum: string): string {
    const renkler: { [key: string]: string } = {
      'Aktif': '#4caf50',
      'Bakımda': '#ff9800',
      'Arızalı': '#f44336',
      'Kalibrasyon Bekliyor': '#2196f3',
      'Pasif': '#9e9e9e'
    };
    return renkler[durum] || '#666';
  }

  getPersonelUzmanliklari(uzmanliklar: any[]): string {
    return uzmanliklar.map(u => u.replace('_', ' ')).join(', ');
  }

  formatTarih(tarih: Date): string {
    return new Date(tarih).toLocaleDateString('tr-TR');
  }

  formatSaat(saat: string): string {
    return saat;
  }

  // Chart verileri için
  getCihazKullanimYuzdesi(kullanim: number, kapasite: number): number {
    return Math.round((kullanim / kapasite) * 100);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LabIslem, LabSonuc, LabDeger } from '../../models/laboratuvar.model';

@Injectable({
  providedIn: 'root'
})
export class LabService {
  
  private mockLabIslemleri: LabIslem[] = [
    {
      id: '1',
      istemId: 'IST001',
      hastaId: '1',
      hasta: {
        ad: 'Ahmet',
        soyad: 'Yılmaz',
        tcKimlik: '12345678901',
        yas: 39,
        cinsiyet: 'Erkek'
      },
      testAdi: 'Tam Kan Sayımı',
      kategori: 'Hematoloji',
      istenmeTarihi: new Date('2024-01-17T08:30:00'),
      doktor: 'Dr. Mehmet Özkan',
      departman: 'Dahiliye',
      durum: 'Bekliyor',
      oncelik: 'Normal',
      ornekTipi: 'Kan',
      barkod: 'TKS240117001',
      notlar: 'Rutin kontrol'
    },
    {
      id: '2',
      istemId: 'IST002',
      hastaId: '2',
      hasta: {
        ad: 'Fatma',
        soyad: 'Demir',
        tcKimlik: '98765432109',
        yas: 34,
        cinsiyet: 'Kadın'
      },
      testAdi: 'Biyokimya Paneli',
      kategori: 'Biyokimya',
      istenmeTarihi: new Date('2024-01-17T09:15:00'),
      doktor: 'Dr. Mehmet Özkan',
      departman: 'Dahiliye',
      durum: 'Örnek Alındı',
      oncelik: 'Acil',
      ornekTipi: 'Kan',
      barkod: 'BIO240117002',
      notlar: 'Acil değerlendirme gerekli'
    },
    {
      id: '3',
      istemId: 'IST003',
      hastaId: '3',
      hasta: {
        ad: 'Mehmet',
        soyad: 'Kaya',
        tcKimlik: '11223344556',
        yas: 49,
        cinsiyet: 'Erkek'
      },
      testAdi: 'İdrar Analizi',
      kategori: 'Mikrobiyoloji',
      istenmeTarihi: new Date('2024-01-17T10:00:00'),
      doktor: 'Dr. Ayşe Çelik',
      departman: 'Üroloji',
      durum: 'İşlemde',
      oncelik: 'Normal',
      ornekTipi: 'İdrar',
      barkod: 'IDR240117003',
      notlar: ''
    },
    {
      id: '4',
      istemId: 'IST004',
      hastaId: '1',
      hasta: {
        ad: 'Ahmet',
        soyad: 'Yılmaz',
        tcKimlik: '12345678901',
        yas: 39,
        cinsiyet: 'Erkek'
      },
      testAdi: 'HbA1c',
      kategori: 'Biyokimya',
      istenmeTarihi: new Date('2024-01-17T11:30:00'),
      doktor: 'Dr. Mehmet Özkan',
      departman: 'Dahiliye',
      durum: 'Tamamlandı',
      oncelik: 'Normal',
      ornekTipi: 'Kan',
      barkod: 'HBA240117004',
      notlar: 'Diyabet takibi'
    }
  ];

  private mockLabSonuclari: LabSonuc[] = [
    {
      id: '1',
      istemId: 'IST004',
      hastaId: '1',
      testAdi: 'HbA1c',
      kategori: 'Biyokimya',
      ornekTarihi: new Date('2024-01-17T11:30:00'),
      sonucTarihi: new Date('2024-01-17T14:45:00'),
      sonuclar: [
        {
          parametre: 'HbA1c',
          deger: 6.8,
          birim: '%',
          referansMin: 4.0,
          referansMax: 6.0,
          durum: 'Yüksek',
          not: 'Diyabet kontrolü gerekli'
        }
      ],
      doktorYorumu: 'HbA1c değeri yüksek, diyabet takibi önerilir',
      laborantId: '2',
      laborant: 'Ayşe Kaya',
      durum: 'Onaylandı',
      kritikDegerler: ['HbA1c yüksek'],
      referansAraligi: '4.0-6.0%'
    }
  ];

  private selectedIslemSubject = new BehaviorSubject<LabIslem | null>(null);
  public selectedIslem$ = this.selectedIslemSubject.asObservable();

  constructor() {}

  getBekleyenIslemler(): Observable<LabIslem[]> {
    return of(this.mockLabIslemleri.filter(islem => 
      ['Bekliyor', 'Örnek Alındı', 'İşlemde'].includes(islem.durum)
    ));
  }

  getTumIslemler(): Observable<LabIslem[]> {
    return of(this.mockLabIslemleri);
  }

  getIslemDetay(islemId: string): Observable<LabIslem | null> {
    const islem = this.mockLabIslemleri.find(i => i.id === islemId);
    return of(islem || null);
  }

  selectIslem(islem: LabIslem): void {
    this.selectedIslemSubject.next(islem);
  }

  updateIslemDurum(islemId: string, yeniDurum: string): Observable<boolean> {
    const islem = this.mockLabIslemleri.find(i => i.id === islemId);
    if (islem) {
      islem.durum = yeniDurum as any;
      return of(true);
    }
    return of(false);
  }

  saveSonuc(islemId: string, sonucData: any): Observable<LabSonuc> {
    const islem = this.mockLabIslemleri.find(i => i.id === islemId);
    if (!islem) {
      throw new Error('İşlem bulunamadı');
    }

    const yeniSonuc: LabSonuc = {
      id: Date.now().toString(),
      istemId: islem.istemId,
      hastaId: islem.hastaId,
      testAdi: islem.testAdi,
      kategori: islem.kategori,
      ornekTarihi: islem.istenmeTarihi,
      sonucTarihi: new Date(),
      sonuclar: sonucData.sonuclar || [],
      doktorYorumu: sonucData.doktorYorumu || '',
      laborantId: '2', // Current laborant
      laborant: 'Ayşe Kaya',
      durum: 'Onay Bekliyor',
      kritikDegerler: sonucData.kritikDegerler || [],
      referansAraligi: sonucData.referansAraligi || ''
    };

    this.mockLabSonuclari.push(yeniSonuc);
    
    // İşlem durumunu güncelle
    islem.durum = 'Tamamlandı';

    console.log('Sonuç kaydedildi:', yeniSonuc);
    return of(yeniSonuc);
  }

  onaylaServic(sonucId: string): Observable<boolean> {
    const sonuc = this.mockLabSonuclari.find(s => s.id === sonucId);
    if (sonuc) {
      sonuc.durum = 'Onaylandı';
      return of(true);
    }
    return of(false);
  }

  getSonuclar(): Observable<LabSonuc[]> {
    return of(this.mockLabSonuclari);
  }

  getLabIslemleri(): Observable<LabIslem[]> {
    return of(this.mockLabIslemleri);
  }

  getTestParametreleri(testAdi: string): any[] {
    const parametreler: { [key: string]: any[] } = {
      'Tam Kan Sayımı': [
        { parametre: 'Hemoglobin', birim: 'g/dL', referansMin: 12.0, referansMax: 16.0 },
        { parametre: 'Hematokrit', birim: '%', referansMin: 36.0, referansMax: 46.0 },
        { parametre: 'Lökosit', birim: '/mm³', referansMin: 4000, referansMax: 11000 },
        { parametre: 'Trombosit', birim: '/mm³', referansMin: 150000, referansMax: 450000 }
      ],
      'Biyokimya Paneli': [
        { parametre: 'Glukoz', birim: 'mg/dL', referansMin: 70, referansMax: 100 },
        { parametre: 'Kreatinin', birim: 'mg/dL', referansMin: 0.6, referansMax: 1.2 },
        { parametre: 'ALT', birim: 'U/L', referansMin: 7, referansMax: 56 },
        { parametre: 'AST', birim: 'U/L', referansMin: 10, referansMax: 40 }
      ],
      'İdrar Analizi': [
        { parametre: 'Protein', birim: 'mg/dL', referansMin: 0, referansMax: 15 },
        { parametre: 'Glukoz', birim: 'mg/dL', referansMin: 0, referansMax: 15 },
        { parametre: 'Lökosit', birim: '/hpf', referansMin: 0, referansMax: 5 },
        { parametre: 'Eritrosit', birim: '/hpf', referansMin: 0, referansMax: 3 }
      ],
      'HbA1c': [
        { parametre: 'HbA1c', birim: '%', referansMin: 4.0, referansMax: 6.0 }
      ]
    };

    return parametreler[testAdi] || [];
  }

  getBarkod(): string {
    const prefix = ['TKS', 'BIO', 'IDR', 'HBA'][Math.floor(Math.random() * 4)];
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${date}${random}`;
  }
}

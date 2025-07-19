import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Fatura, FaturaItem, SGKBildirim, MaliRapor } from '../../models/fatura.model';

@Injectable({
  providedIn: 'root'
})
export class FaturalandirmaService {
  
  private billableActionsSubject = new Subject<any>();
  public billableActions$ = this.billableActionsSubject.asObservable();

  private mockFaturalar: Fatura[] = [
    {
      id: '1',
      faturaNo: 'FTR-2024-001',
      hastaId: '1',
      hasta: {
        ad: 'Ahmet',
        soyad: 'Yılmaz',
        tcKimlik: '12345678901'
      },
      tarih: new Date('2024-01-17T09:00:00'),
      durum: 'Bekliyor',
      items: [
        {
          id: '1',
          kod: 'MUY001',
          ad: 'Dahiliye Muayenesi',
          miktar: 1,
          birimFiyat: 150.00,
          toplam: 150.00,
          kategori: 'Muayene'
        },
        {
          id: '2',
          kod: 'LAB001',
          ad: 'Tam Kan Sayımı',
          miktar: 1,
          birimFiyat: 45.00,
          toplam: 45.00,
          kategori: 'Test'
        },
        {
          id: '3',
          kod: 'LAB002',
          ad: 'Biyokimya Paneli',
          miktar: 1,
          birimFiyat: 120.00,
          toplam: 120.00,
          kategori: 'Test'
        }
      ],
      toplamTutar: 315.00,
      odenentTutar: 0,
      kalanTutar: 315.00,
      sigorta: {
        tip: 'SGK',
        orani: 80,
        tutari: 252.00
      }
    },
    {
      id: '2',
      faturaNo: 'FTR-2024-002',
      hastaId: '2',
      hasta: {
        ad: 'Fatma',
        soyad: 'Demir',
        tcKimlik: '98765432109'
      },
      tarih: new Date('2024-01-17T10:30:00'),
      durum: 'Ödendi',
      items: [
        {
          id: '1',
          kod: 'MUY001',
          ad: 'Dahiliye Muayenesi',
          miktar: 1,
          birimFiyat: 150.00,
          toplam: 150.00,
          kategori: 'Muayene'
        },
        {
          id: '2',
          kod: 'LAB003',
          ad: 'İdrar Analizi',
          miktar: 1,
          birimFiyat: 35.00,
          toplam: 35.00,
          kategori: 'Test'
        }
      ],
      toplamTutar: 185.00,
      odenentTutar: 185.00,
      kalanTutar: 0,
      sigorta: {
        tip: 'Özel',
        orani: 100,
        tutari: 185.00
      },
      odemeTipi: 'Kredi Kartı'
    },
    {
      id: '3',
      faturaNo: 'FTR-2024-003',
      hastaId: '3',
      hasta: {
        ad: 'Mehmet',
        soyad: 'Kaya',
        tcKimlik: '11223344556'
      },
      tarih: new Date('2024-01-17T11:15:00'),
      durum: 'Bekliyor',
      items: [
        {
          id: '1',
          kod: 'MUY002',
          ad: 'Üroloji Muayenesi',
          miktar: 1,
          birimFiyat: 180.00,
          toplam: 180.00,
          kategori: 'Muayene'
        },
        {
          id: '2',
          kod: 'LAB004',
          ad: 'PSA Testi',
          miktar: 1,
          birimFiyat: 85.00,
          toplam: 85.00,
          kategori: 'Test'
        }
      ],
      toplamTutar: 265.00,
      odenentTutar: 0,
      kalanTutar: 265.00,
      sigorta: {
        tip: 'SGK',
        orani: 80,
        tutari: 212.00
      }
    }
  ];

  private mockSGKBildirimleri: SGKBildirim[] = [
    {
      id: '1',
      faturaId: '1',
      bildirimTarihi: new Date('2024-01-17T12:00:00'),
      durum: 'Bekliyor',
      tutari: 252.00,
      aciklama: 'Dahiliye muayene ve laboratuvar testleri'
    }
  ];

  private hizmetKataloga = [
    { kod: 'MUY001', ad: 'Dahiliye Muayenesi', fiyat: 150.00, kategori: 'Muayene' },
    { kod: 'MUY002', ad: 'Üroloji Muayenesi', fiyat: 180.00, kategori: 'Muayene' },
    { kod: 'MUY003', ad: 'Kardiyoloji Muayenesi', fiyat: 200.00, kategori: 'Muayene' },
    { kod: 'LAB001', ad: 'Tam Kan Sayımı', fiyat: 45.00, kategori: 'Test' },
    { kod: 'LAB002', ad: 'Biyokimya Paneli', fiyat: 120.00, kategori: 'Test' },
    { kod: 'LAB003', ad: 'İdrar Analizi', fiyat: 35.00, kategori: 'Test' },
    { kod: 'LAB004', ad: 'PSA Testi', fiyat: 85.00, kategori: 'Test' },
    { kod: 'RAD001', ad: 'Akciğer Grafisi', fiyat: 80.00, kategori: 'Test' },
    { kod: 'RAD002', ad: 'Karın USG', fiyat: 150.00, kategori: 'Test' }
  ];

  constructor() {
    // Mock olarak bazı billable actions dinle
    this.setupMockBillableActions();
  }

  private setupMockBillableActions(): void {
    // Bu normalde diğer servislerden gelecek
    // Şimdilik mock data ile simulate ediyoruz
  }

  getFaturalar(): Observable<Fatura[]> {
    return of(this.mockFaturalar);
  }

  getBekleyenFaturalar(): Observable<Fatura[]> {
    return of(this.mockFaturalar.filter(f => f.durum === 'Bekliyor'));
  }

  getFaturaDetay(faturaId: string): Observable<Fatura | null> {
    const fatura = this.mockFaturalar.find(f => f.id === faturaId);
    return of(fatura || null);
  }

  createFatura(hastaId: string, items: FaturaItem[]): Observable<Fatura> {
    const toplamTutar = items.reduce((total, item) => total + item.toplam, 0);
    
    const yeniFatura: Fatura = {
      id: Date.now().toString(),
      faturaNo: this.generateFaturaNo(),
      hastaId: hastaId,
      hasta: {
        ad: 'Yeni',
        soyad: 'Hasta',
        tcKimlik: '00000000000'
      },
      tarih: new Date(),
      durum: 'Bekliyor',
      items: items,
      toplamTutar: toplamTutar,
      odenentTutar: 0,
      kalanTutar: toplamTutar,
      sigorta: {
        tip: 'SGK',
        orani: 80,
        tutari: toplamTutar * 0.8
      }
    };

    this.mockFaturalar.push(yeniFatura);
    console.log('Yeni fatura oluşturuldu:', yeniFatura);
    
    return of(yeniFatura);
  }

  odemeAl(faturaId: string, tutar: number, odemeTipi: string): Observable<boolean> {
    const fatura = this.mockFaturalar.find(f => f.id === faturaId);
    if (!fatura) return of(false);

    fatura.odenentTutar += tutar;
    fatura.kalanTutar = fatura.toplamTutar - fatura.odenentTutar;
    fatura.odemeTipi = odemeTipi as any;

    if (fatura.kalanTutar <= 0) {
      fatura.durum = 'Ödendi';
    } else if (fatura.odenentTutar > 0) {
      fatura.durum = 'Kısmen Ödendi';
    }

    console.log('Ödeme alındı:', { faturaId, tutar, odemeTipi });
    return of(true);
  }

  sgkBildirimi(faturaId: string): Observable<SGKBildirim> {
    const fatura = this.mockFaturalar.find(f => f.id === faturaId);
    if (!fatura) {
      throw new Error('Fatura bulunamadı');
    }

    const yeniBildirim: SGKBildirim = {
      id: Date.now().toString(),
      faturaId: faturaId,
      bildirimTarihi: new Date(),
      durum: 'Bekliyor',
      tutari: fatura.sigorta.tutari,
      aciklama: `${fatura.faturaNo} numaralı fatura SGK bildirimi`
    };

    this.mockSGKBildirimleri.push(yeniBildirim);
    console.log('SGK bildirimi oluşturuldu:', yeniBildirim);
    
    return of(yeniBildirim);
  }

  getSGKBildirimleri(): Observable<SGKBildirim[]> {
    return of(this.mockSGKBildirimleri);
  }

  getHizmetKatalogu(): Observable<any[]> {
    return of(this.hizmetKataloga);
  }

  getMaliRapor(): Observable<MaliRapor> {
    const bugun = new Date();
    const gunlukFaturalar = this.mockFaturalar.filter(f => 
      f.tarih.toDateString() === bugun.toDateString()
    );

    const gunlukGelir = gunlukFaturalar
      .filter(f => f.durum === 'Ödendi')
      .reduce((total, f) => total + f.odenentTutar, 0);

    const sgkGelir = gunlukFaturalar
      .filter(f => f.durum === 'Ödendi' && f.sigorta.tip === 'SGK')
      .reduce((total, f) => total + f.odenentTutar, 0);

    const ozelSigortaGelir = gunlukFaturalar
      .filter(f => f.durum === 'Ödendi' && f.sigorta.tip === 'Özel')
      .reduce((total, f) => total + f.odenentTutar, 0);

    const nakitGelir = gunlukFaturalar
      .filter(f => f.durum === 'Ödendi' && f.odemeTipi === 'Nakit')
      .reduce((total, f) => total + f.odenentTutar, 0);

    const rapport: MaliRapor = {
      tarih: bugun,
      gunlukGelir,
      sgkGelir,
      ozelSigortaGelir,
      nakitGelir,
      toplamFatura: gunlukFaturalar.length,
      odenenFatura: gunlukFaturalar.filter(f => f.durum === 'Ödendi').length,
      bekleyenFatura: gunlukFaturalar.filter(f => f.durum === 'Bekliyor').length
    };

    return of(rapport);
  }

  // Diğer modüllerden gelen faturalanabilir işlemler için
  addBillableAction(action: any): void {
    this.billableActionsSubject.next(action);
  }

  private generateFaturaNo(): string {
    const year = new Date().getFullYear();
    const count = this.mockFaturalar.length + 1;
    return `FTR-${year}-${count.toString().padStart(3, '0')}`;
  }
}

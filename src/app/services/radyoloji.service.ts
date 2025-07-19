import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { 
  RadyolojiIstek, 
  RadyolojiTetkikTuru, 
  RadyolojiOncelik, 
  RadyolojiDurum,
  RadyolojiPersonel,
  RadyolojiCihaz,
  RadyolojiRandevu,
  RadyolojiIstatistik,
  RadyolojiRapor,
  RadyolojiUzmanlik,
  CihazDurum,
  RandevuDurum,
  TETKIK_HAZIRLIK_TALIMATLARI
} from '../models/radyoloji.model';

@Injectable({
  providedIn: 'root'
})
export class RadyolojiService {

  // Mock radyoloji istekleri
  private radyolojiIstekleri: RadyolojiIstek[] = [
    {
      id: 'RAD001',
      hastaId: '1',
      hastaAdi: 'Ali Yılmaz',
      hastaTcKimlik: '12345678901',
      doktorId: '1',
      doktorAdi: 'Prof. Dr. Ahmet Kaya',
      poliklinikAdi: 'Dahiliye',
      istekTarihi: new Date('2025-07-17'),
      istekSaati: '09:30',
      tetkikTuru: RadyolojiTetkikTuru.BT,
      tetkikAdi: 'Toraks BT',
      klinikBilgi: 'Nefes darlığı, göğüs ağrısı',
      onTani: 'Pnömoni şüphesi',
      aciklama: 'Kontrastlı çekim yapılacak',
      oncelik: RadyolojiOncelik.ACIL,
      durum: RadyolojiDurum.RAPOR_TAMAMLANDI,
      cekimTarihi: new Date('2025-07-17'),
      cekimSaati: '14:30',
      teknisyenId: 'TEK001',
      teknisyenAdi: 'Fatma Demir',
      raporTarihi: new Date('2025-07-17'),
      raporlayanDoktorId: 'RAD001',
      raporlayanDoktor: 'Dr. Mehmet Özkan',
      maliyet: 350,
      odemeYontem: 'Sigorta',
      odemeDurum: 'Ödendi'
    },
    {
      id: 'RAD002',
      hastaId: '2',
      hastaAdi: 'Ayşe Kaya',
      hastaTcKimlik: '12345678902',
      doktorId: '2',
      doktorAdi: 'Doç. Dr. Fatma Demir',
      poliklinikAdi: 'Kardiyoloji',
      istekTarihi: new Date('2025-07-17'),
      istekSaati: '10:15',
      tetkikTuru: RadyolojiTetkikTuru.MR,
      tetkikAdi: 'Kalp MR',
      klinikBilgi: 'Kalp yetmezliği',
      onTani: 'Kardiyomiyopati',
      oncelik: RadyolojiOncelik.NORMAL,
      durum: RadyolojiDurum.RANDEVU_VERILDI,
      maliyet: 750,
      odemeYontem: 'Kredi Kartı',
      odemeDurum: 'Bekliyor'
    },
    {
      id: 'RAD003',
      hastaId: '3',
      hastaAdi: 'Mehmet Öz',
      hastaTcKimlik: '12345678903',
      doktorId: '3',
      doktorAdi: 'Prof. Dr. Mehmet Özkan',
      poliklinikAdi: 'Ortopedi',
      istekTarihi: new Date('2025-07-17'),
      istekSaati: '11:00',
      tetkikTuru: RadyolojiTetkikTuru.DIREKT_GRAFI,
      tetkikAdi: 'Diz Grafisi (AP-Lateral)',
      klinikBilgi: 'Diz ağrısı, şişlik',
      onTani: 'Menisküs yırtığı şüphesi',
      oncelik: RadyolojiOncelik.NORMAL,
      durum: RadyolojiDurum.CEKIM_TAMAMLANDI,
      cekimTarihi: new Date('2025-07-17'),
      cekimSaati: '15:45',
      teknisyenId: 'TEK002',
      teknisyenAdi: 'Ahmet Yıldız',
      maliyet: 75,
      odemeYontem: 'Nakit',
      odemeDurum: 'Ödendi'
    }
  ];

  // Mock personel verileri
  private personel: RadyolojiPersonel[] = [
    {
      id: 'RAD001',
      ad: 'Mehmet',
      soyad: 'Özkan',
      unvan: 'Radyoloji Uzmanı',
      uzmanlik: [RadyolojiUzmanlik.GENEL_RADYOLOJI, RadyolojiUzmanlik.TORAKS_RADYOLOJI],
      aktif: true,
      telefon: '0532 111 1111',
      email: 'mehmet.ozkan@hastane.com'
    },
    {
      id: 'RAD002',
      ad: 'Zeynep',
      soyad: 'Aydın',
      unvan: 'Radyoloji Uzmanı',
      uzmanlik: [RadyolojiUzmanlik.NORORADYOLOJI, RadyolojiUzmanlik.PEDIATRIK],
      aktif: true,
      telefon: '0532 111 1112',
      email: 'zeynep.aydin@hastane.com'
    },
    {
      id: 'TEK001',
      ad: 'Fatma',
      soyad: 'Demir',
      unvan: 'Radyoloji Teknisyeni',
      uzmanlik: [RadyolojiUzmanlik.GENEL_RADYOLOJI],
      aktif: true,
      telefon: '0532 111 1113',
      email: 'fatma.demir@hastane.com'
    },
    {
      id: 'TEK002',
      ad: 'Ahmet',
      soyad: 'Yıldız',
      unvan: 'Radyoloji Teknisyeni',
      uzmanlik: [RadyolojiUzmanlik.GENEL_RADYOLOJI],
      aktif: true,
      telefon: '0532 111 1114',
      email: 'ahmet.yildiz@hastane.com'
    }
  ];

  // Mock cihaz verileri
  private cihazlar: RadyolojiCihaz[] = [
    {
      id: 'CIH001',
      ad: 'BT Scanner 1',
      marka: 'Siemens',
      model: 'Somatom Definition AS',
      seriNo: 'SIE-2024-001',
      tip: RadyolojiTetkikTuru.BT,
      lokasyon: 'Radyoloji - Kat 1',
      durum: CihazDurum.AKTIF,
      sonBakimTarihi: new Date('2025-07-01'),
      sonKalibrasyon: new Date('2025-07-10'),
      aktif: true
    },
    {
      id: 'CIH002',
      ad: 'MR Scanner 1',
      marka: 'GE Healthcare',
      model: 'Signa Explorer',
      seriNo: 'GE-2024-002',
      tip: RadyolojiTetkikTuru.MR,
      lokasyon: 'Radyoloji - Kat 2',
      durum: CihazDurum.AKTIF,
      sonBakimTarihi: new Date('2025-06-28'),
      sonKalibrasyon: new Date('2025-07-05'),
      aktif: true
    },
    {
      id: 'CIH003',
      ad: 'Röntgen Cihazı 1',
      marka: 'Philips',
      model: 'DigitalDiagnost C90',
      seriNo: 'PHI-2024-003',
      tip: RadyolojiTetkikTuru.DIREKT_GRAFI,
      lokasyon: 'Radyoloji - Kat 1',
      durum: CihazDurum.AKTIF,
      sonBakimTarihi: new Date('2025-07-05'),
      sonKalibrasyon: new Date('2025-07-12'),
      aktif: true
    },
    {
      id: 'CIH004',
      ad: 'Ultrason Cihazı 1',
      marka: 'Samsung',
      model: 'RS80A',
      seriNo: 'SAM-2024-004',
      tip: RadyolojiTetkikTuru.ULTRASON,
      lokasyon: 'Radyoloji - Poliklinik',
      durum: CihazDurum.AKTIF,
      sonBakimTarihi: new Date('2025-07-08'),
      aktif: true
    }
  ];

  constructor() { }

  // Radyoloji istekleri
  getRadyolojiIstekleri(): Observable<RadyolojiIstek[]> {
    return of(this.radyolojiIstekleri).pipe(delay(300));
  }

  getRadyolojiIstekById(id: string): Observable<RadyolojiIstek | undefined> {
    const istek = this.radyolojiIstekleri.find(i => i.id === id);
    return of(istek).pipe(delay(200));
  }

  radyolojiIstekEkle(istek: Partial<RadyolojiIstek>): Observable<RadyolojiIstek> {
    const yeniIstek: RadyolojiIstek = {
      id: 'RAD' + (this.radyolojiIstekleri.length + 1).toString().padStart(3, '0'),
      hastaId: istek.hastaId!,
      hastaAdi: istek.hastaAdi!,
      hastaTcKimlik: istek.hastaTcKimlik!,
      doktorId: istek.doktorId!,
      doktorAdi: istek.doktorAdi!,
      poliklinikAdi: istek.poliklinikAdi!,
      istekTarihi: new Date(),
      istekSaati: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      tetkikTuru: istek.tetkikTuru!,
      tetkikAdi: istek.tetkikAdi!,
      klinikBilgi: istek.klinikBilgi!,
      onTani: istek.onTani!,
      aciklama: istek.aciklama,
      oncelik: istek.oncelik || RadyolojiOncelik.NORMAL,
      durum: RadyolojiDurum.ISTEK_VERILDI,
      maliyet: istek.maliyet || 0,
      odemeYontem: istek.odemeYontem,
      odemeDurum: istek.odemeDurum || 'Bekliyor'
    };

    this.radyolojiIstekleri.push(yeniIstek);
    return of(yeniIstek).pipe(delay(500));
  }

  istekDurumGuncelle(id: string, durum: RadyolojiDurum): Observable<boolean> {
    const istek = this.radyolojiIstekleri.find(i => i.id === id);
    if (istek) {
      istek.durum = durum;
      return of(true).pipe(delay(300));
    }
    return of(false).pipe(delay(300));
  }

  // Personel yönetimi
  getPersonel(): Observable<RadyolojiPersonel[]> {
    return of(this.personel).pipe(delay(300));
  }

  getRadyologlar(): Observable<RadyolojiPersonel[]> {
    const radyologlar = this.personel.filter(p => p.unvan.includes('Uzman'));
    return of(radyologlar).pipe(delay(300));
  }

  getTeknisyenler(): Observable<RadyolojiPersonel[]> {
    const teknisyenler = this.personel.filter(p => p.unvan.includes('Teknisyen'));
    return of(teknisyenler).pipe(delay(300));
  }

  // Cihaz yönetimi
  getCihazlar(): Observable<RadyolojiCihaz[]> {
    return of(this.cihazlar).pipe(delay(300));
  }

  getAktifCihazlar(): Observable<RadyolojiCihaz[]> {
    const aktifCihazlar = this.cihazlar.filter(c => c.aktif && c.durum === CihazDurum.AKTIF);
    return of(aktifCihazlar).pipe(delay(300));
  }

  getCihazByTetkikTuru(tetkikTuru: RadyolojiTetkikTuru): Observable<RadyolojiCihaz[]> {
    const uygunCihazlar = this.cihazlar.filter(c => 
      c.tip === tetkikTuru && c.aktif && c.durum === CihazDurum.AKTIF
    );
    return of(uygunCihazlar).pipe(delay(300));
  }

  // Randevu yönetimi
  randevuOlustur(randevu: Partial<RadyolojiRandevu>): Observable<RadyolojiRandevu> {
    const yeniRandevu: RadyolojiRandevu = {
      id: 'RAN' + Date.now().toString(),
      hastaId: randevu.hastaId!,
      hastaAdi: randevu.hastaAdi!,
      tetkikTuru: randevu.tetkikTuru!,
      tarih: randevu.tarih!,
      saat: randevu.saat!,
      cihazId: randevu.cihazId!,
      teknisyenId: randevu.teknisyenId!,
      hazirlikTalimati: TETKIK_HAZIRLIK_TALIMATLARI[randevu.tetkikTuru!],
      durum: RandevuDurum.BEKLIYOR,
      notlar: randevu.notlar
    };
    
    return of(yeniRandevu).pipe(delay(500));
  }

  // Rapor yönetimi
  raporOlustur(rapor: Partial<RadyolojiRapor>): Observable<RadyolojiRapor> {
    const yeniRapor: RadyolojiRapor = {
      id: 'RPR' + Date.now().toString(),
      istekId: rapor.istekId!,
      raporTarihi: new Date(),
      raporlayanDoktorId: rapor.raporlayanDoktorId!,
      raporlayanDoktor: rapor.raporlayanDoktor!,
      bulgu: rapor.bulgu!,
      sonuc: rapor.sonuc!,
      oneri: rapor.oneri,
      kritikBulgu: rapor.kritikBulgu || false,
      acilDurum: rapor.acilDurum || false,
      karsilastirma: rapor.karsilastirma,
      teknikBilgi: rapor.teknikBilgi,
      onayDurum: 'Taslak'
    };

    return of(yeniRapor).pipe(delay(500));
  }

  // Arama ve filtreleme
  istekAra(kriterler: any): Observable<RadyolojiIstek[]> {
    let sonuclar = [...this.radyolojiIstekleri];

    if (kriterler.hastaAdi) {
      const arama = kriterler.hastaAdi.toLowerCase();
      sonuclar = sonuclar.filter(i => 
        i.hastaAdi.toLowerCase().includes(arama) ||
        i.hastaTcKimlik.includes(arama)
      );
    }

    if (kriterler.tetkikTuru) {
      sonuclar = sonuclar.filter(i => i.tetkikTuru === kriterler.tetkikTuru);
    }

    if (kriterler.durum) {
      sonuclar = sonuclar.filter(i => i.durum === kriterler.durum);
    }

    if (kriterler.tarihBaslangic && kriterler.tarihBitis) {
      sonuclar = sonuclar.filter(i => 
        i.istekTarihi >= kriterler.tarihBaslangic && 
        i.istekTarihi <= kriterler.tarihBitis
      );
    }

    return of(sonuclar).pipe(delay(400));
  }

  // İstatistikler
  getIstatistikler(): Observable<RadyolojiIstatistik> {
    const istatistik: RadyolojiIstatistik = {
      gunlukTetkikSayisi: this.radyolojiIstekleri.filter(i => 
        i.istekTarihi.toDateString() === new Date().toDateString()
      ).length,
      bekleyenIstek: this.radyolojiIstekleri.filter(i => 
        i.durum === RadyolojiDurum.ISTEK_VERILDI || 
        i.durum === RadyolojiDurum.RANDEVU_VERILDI
      ).length,
      tamamlananIstek: this.radyolojiIstekleri.filter(i => 
        i.durum === RadyolojiDurum.RAPOR_TAMAMLANDI || 
        i.durum === RadyolojiDurum.TESLIM_EDILDI
      ).length,
      kritikBulgu: 2, // Mock veri
      gelirToplami: this.radyolojiIstekleri
        .filter(i => i.odemeDurum === 'Ödendi')
        .reduce((toplam, i) => toplam + (i.maliyet || 0), 0),
      cihazKullanimi: [
        { cihazAdi: 'BT Scanner 1', kullanim: 85, kapasite: 100 },
        { cihazAdi: 'MR Scanner 1', kullanim: 70, kapasite: 100 },
        { cihazAdi: 'Röntgen Cihazı 1', kullanim: 95, kapasite: 100 },
        { cihazAdi: 'Ultrason Cihazı 1', kullanim: 60, kapasite: 100 }
      ],
      populerTetkikler: [
        { tetkikAdi: 'Direkt Grafi', sayi: 45 },
        { tetkikAdi: 'BT', sayi: 32 },
        { tetkikAdi: 'Ultrason', sayi: 28 },
        { tetkikAdi: 'MR', sayi: 18 }
      ]
    };

    return of(istatistik).pipe(delay(400));
  }

  // Hazırlık talimatları
  getHazirlikTalimati(tetkikTuru: RadyolojiTetkikTuru): string {
    return TETKIK_HAZIRLIK_TALIMATLARI[tetkikTuru];
  }
}

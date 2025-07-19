import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Randevu, Muayene, Poliklinik, RandevuSlot } from '../../models/randevu.model';

@Injectable({
  providedIn: 'root'
})
export class RandevuService {

  private mockRandevular: Randevu[] = [
    {
      id: '1',
      hastaId: '1',
      hastaTcKimlik: '12345678901',
      hastaAdi: 'Ahmet',
      hastaSoyadi: 'Yılmaz',
      doktorId: 'dr1',
      doktorAdi: 'Dr. Mehmet Özkan',
      poliklinikId: 'pol1',
      poliklinikAdi: 'Dahiliye',
      randevuTarihi: new Date('2025-07-18T09:00:00'),
      randevuSaati: '09:00',
      durum: 'Bekliyor',
      randevuTuru: 'İlk Muayene',
      oncelik: 'Normal',
      sikayet: 'Baş ağrısı ve ateş',
      olusturmaTarihi: new Date('2025-07-17T14:30:00'),
      telefonRandevu: false,
      onlineRandevu: true
    },
    {
      id: '2',
      hastaId: '2',
      hastaTcKimlik: '98765432109',
      hastaAdi: 'Fatma',
      hastaSoyadi: 'Demir',
      doktorId: 'dr2',
      doktorAdi: 'Dr. Ayşe Kaya',
      poliklinikId: 'pol2',
      poliklinikAdi: 'Kardiyoloji',
      randevuTarihi: new Date('2025-07-18T10:30:00'),
      randevuSaati: '10:30',
      durum: 'Tamamlandı',
      randevuTuru: 'Kontrol',
      oncelik: 'Yüksek',
      sikayet: 'Kalp çarpıntısı',
      olusturmaTarihi: new Date('2025-07-16T10:15:00'),
      telefonRandevu: true,
      onlineRandevu: false
    },
    {
      id: '3',
      hastaId: '3',
      hastaTcKimlik: '11122233344',
      hastaAdi: 'Ali',
      hastaSoyadi: 'Kaya',
      doktorId: 'dr3',
      doktorAdi: 'Dr. Elif Şahin',
      poliklinikId: 'pol3',
      poliklinikAdi: 'Ortopedi',
      randevuTarihi: new Date('2025-07-19T14:00:00'),
      randevuSaati: '14:00',
      durum: 'Bekliyor',
      randevuTuru: 'İlk Muayene',
      oncelik: 'Normal',
      sikayet: 'Diz ağrısı',
      olusturmaTarihi: new Date('2025-07-17T16:45:00'),
      telefonRandevu: false,
      onlineRandevu: false
    },
    {
      id: '4',
      hastaId: '1',
      hastaTcKimlik: '12345678901',
      hastaAdi: 'Ahmet',
      hastaSoyadi: 'Yılmaz',
      doktorId: 'dr4',
      doktorAdi: 'Dr. Can Özdemir',
      poliklinikId: 'pol4',
      poliklinikAdi: 'Nöroloji',
      randevuTarihi: new Date('2025-07-17T16:00:00'),
      randevuSaati: '16:00',
      durum: 'Tamamlandı',
      randevuTuru: 'Kontrol',
      oncelik: 'Normal',
      sikayet: 'Baş dönmesi',
      olusturmaTarihi: new Date('2025-07-15T11:20:00'),
      telefonRandevu: true,
      onlineRandevu: false
    },
    {
      id: '5',
      hastaId: '4',
      hastaTcKimlik: '55566677788',
      hastaAdi: 'Zeynep',
      hastaSoyadi: 'Arslan',
      doktorId: 'dr5',
      doktorAdi: 'Dr. Murat Yıldırım',
      poliklinikId: 'pol5',
      poliklinikAdi: 'Göz Hastalıkları',
      randevuTarihi: new Date('2025-07-20T11:15:00'),
      randevuSaati: '11:15',
      durum: 'Bekliyor',
      randevuTuru: 'İlk Muayene',
      oncelik: 'Düşük',
      sikayet: 'Görme bulanıklığı',
      olusturmaTarihi: new Date('2025-07-17T09:30:00'),
      telefonRandevu: false,
      onlineRandevu: true
    }
  ];

  private mockMuayeneler: Muayene[] = [
    {
      id: '1',
      randevuId: '2',
      hastaId: '2',
      hastaTcKimlik: '98765432109',
      hastaAdi: 'Fatma',
      hastaSoyadi: 'Demir',
      doktorId: 'dr2',
      doktorAdi: 'Dr. Ayşe Kaya',
      poliklinikId: 'pol2',
      poliklinikAdi: 'Kardiyoloji',
      muayeneTarihi: new Date('2025-07-18T10:30:00'),
      muayeneSaati: '10:30',
      sikayet: 'Kalp çarpıntısı, nefes darlığı',
      anamnez: 'Hasta 3 aydır aralıklı kalp çarpıntısı yaşıyor. Fiziksel aktivite sırasında artıyor.',
      fizikMuayene: 'TA: 140/90 mmHg, Nabız: 92/dk düzenli, Kalp sesleri doğal',
      tani: 'Hipertansiyon, Sinüs taşikardisi şüphesi',
      tedavi: 'ACE inhibitörü başlandı, tuz kısıtlaması önerildi',
      receteler: [
        {
          id: 'r1',
          ilacAdi: 'Ramipril 5mg',
          doz: '1x1',
          kullanim: 'Sabah aç karnına',
          miktar: 30,
          aciklama: '30 gün kullanım'
        }
      ],
      tahliller: [
        {
          id: 't1',
          tahlilTuru: 'EKG',
          aciklama: 'Ritm bozukluğu araştırılması',
          acil: false
        },
        {
          id: 't2',
          tahlilTuru: 'Ekokardiyografi',
          aciklama: 'Kardiyak fonksiyon değerlendirmesi',
          acil: false
        }
      ],
      kontrol: {
        tarihi: new Date('2025-08-18T10:30:00'),
        aciklama: '1 ay sonra kontrol, tansiyon takibi'
      },
      durum: 'Tamamlandı',
      olusturmaTarihi: new Date('2025-07-18T10:30:00'),
      guncellemeTarihi: new Date('2025-07-18T11:15:00')
    },
    {
      id: '2',
      randevuId: '4',
      hastaId: '1',
      hastaTcKimlik: '12345678901',
      hastaAdi: 'Ahmet',
      hastaSoyadi: 'Yılmaz',
      doktorId: 'dr4',
      doktorAdi: 'Dr. Can Özdemir',
      poliklinikId: 'pol4',
      poliklinikAdi: 'Nöroloji',
      muayeneTarihi: new Date('2025-07-17T16:00:00'),
      muayeneSaati: '16:00',
      sikayet: 'Baş dönmesi, dengesizlik hissi',
      anamnez: 'Son 1 haftadır süregelen baş dönmesi. Ayağa kalkarken artıyor.',
      fizikMuayene: 'Nörolojik muayene normal, Romberg testi negatif',
      tani: 'Benign postural vertigo şüphesi',
      tedavi: 'Betahistin başlandı, pozisyon değişikliklerinde dikkatli olması önerildi',
      receteler: [
        {
          id: 'r2',
          ilacAdi: 'Betahistin 24mg',
          doz: '1x2',
          kullanim: 'Sabah-akşam yemeklerden sonra',
          miktar: 20,
          aciklama: '10 gün kullanım'
        }
      ],
      tahliller: [],
      kontrol: {
        tarihi: new Date('2025-07-31T16:00:00'),
        aciklama: '2 hafta sonra kontrol'
      },
      durum: 'Tamamlandı',
      olusturmaTarihi: new Date('2025-07-17T16:00:00'),
      guncellemeTarihi: new Date('2025-07-17T16:45:00')
    }
  ];

  private mockPoliklinikler: Poliklinik[] = [
    {
      id: 'pol1',
      adi: 'Dahiliye',
      kod: 'DAH',
      aciklama: 'İç hastalıkları polikliği',
      aktif: true,
      doktorlar: [
        {
          id: 'pd1',
          doktorId: 'dr1',
          doktorAdi: 'Dr. Mehmet Özkan',
          uzmanlik: 'İç Hastalıkları',
          aktif: true,
          calismaSaatleri: [
            { gun: 'Pazartesi', baslangic: '08:00', bitis: '16:00', randevuSuresi: 15 },
            { gun: 'Salı', baslangic: '08:00', bitis: '16:00', randevuSuresi: 15 },
            { gun: 'Çarşamba', baslangic: '08:00', bitis: '16:00', randevuSuresi: 15 }
          ]
        }
      ]
    },
    {
      id: 'pol2',
      adi: 'Kardiyoloji',
      kod: 'KAR',
      aciklama: 'Kalp ve damar hastalıkları',
      aktif: true,
      doktorlar: [
        {
          id: 'pd2',
          doktorId: 'dr2',
          doktorAdi: 'Dr. Ayşe Kaya',
          uzmanlik: 'Kardiyoloji',
          aktif: true,
          calismaSaatleri: [
            { gun: 'Pazartesi', baslangic: '09:00', bitis: '17:00', randevuSuresi: 20 },
            { gun: 'Çarşamba', baslangic: '09:00', bitis: '17:00', randevuSuresi: 20 },
            { gun: 'Cuma', baslangic: '09:00', bitis: '17:00', randevuSuresi: 20 }
          ]
        }
      ]
    }
  ];

  constructor() { }

  // Randevu işlemleri
  getRandevular(): Observable<Randevu[]> {
    return of(this.mockRandevular).pipe(delay(500));
  }

  getRandevuById(id: string): Observable<Randevu | undefined> {
    const randevu = this.mockRandevular.find(r => r.id === id);
    return of(randevu).pipe(delay(300));
  }

  getRandevularByHasta(hastaId: string): Observable<Randevu[]> {
    const randevular = this.mockRandevular.filter(r => r.hastaId === hastaId);
    return of(randevular).pipe(delay(400));
  }

  getRandevularByTarih(tarih: Date): Observable<Randevu[]> {
    const randevular = this.mockRandevular.filter(r => 
      r.randevuTarihi.toDateString() === tarih.toDateString()
    );
    return of(randevular).pipe(delay(400));
  }

  randevuKaydet(randevu: Partial<Randevu>): Observable<Randevu> {
    const yeniRandevu: Randevu = {
      id: (this.mockRandevular.length + 1).toString(),
      hastaId: randevu.hastaId!,
      hastaTcKimlik: randevu.hastaTcKimlik!,
      hastaAdi: randevu.hastaAdi!,
      hastaSoyadi: randevu.hastaSoyadi!,
      doktorId: randevu.doktorId!,
      doktorAdi: randevu.doktorAdi!,
      poliklinikId: randevu.poliklinikId!,
      poliklinikAdi: randevu.poliklinikAdi!,
      randevuTarihi: randevu.randevuTarihi!,
      randevuSaati: randevu.randevuSaati!,
      durum: 'Bekliyor',
      randevuTuru: randevu.randevuTuru || 'İlk Muayene',
      oncelik: randevu.oncelik || 'Normal',
      sikayet: randevu.sikayet,
      notlar: randevu.notlar,
      olusturmaTarihi: new Date(),
      telefonRandevu: randevu.telefonRandevu || false,
      onlineRandevu: randevu.onlineRandevu || false
    };

    this.mockRandevular.push(yeniRandevu);
    return of(yeniRandevu).pipe(delay(600));
  }

  randevuGuncelle(id: string, guncellenenVeri: Partial<Randevu>): Observable<Randevu> {
    const index = this.mockRandevular.findIndex(r => r.id === id);
    if (index !== -1) {
      this.mockRandevular[index] = { 
        ...this.mockRandevular[index], 
        ...guncellenenVeri,
        guncellemeTarihi: new Date()
      };
      return of(this.mockRandevular[index]).pipe(delay(500));
    }
    throw new Error('Randevu bulunamadı');
  }

  randevuIptal(id: string, iptalNedeni?: string): Observable<boolean> {
    const index = this.mockRandevular.findIndex(r => r.id === id);
    if (index !== -1) {
      this.mockRandevular[index].durum = 'İptal';
      this.mockRandevular[index].notlar = (this.mockRandevular[index].notlar || '') + 
        ` İptal nedeni: ${iptalNedeni || 'Belirtilmedi'}`;
      this.mockRandevular[index].guncellemeTarihi = new Date();
      return of(true).pipe(delay(400));
    }
    return of(false).pipe(delay(400));
  }

  // Muayene işlemleri
  getMuayeneler(): Observable<Muayene[]> {
    return of(this.mockMuayeneler).pipe(delay(500));
  }

  getMuayeneById(id: string): Observable<Muayene | undefined> {
    const muayene = this.mockMuayeneler.find(m => m.id === id);
    return of(muayene).pipe(delay(300));
  }

  getMuayenelerByHasta(hastaId: string): Observable<Muayene[]> {
    const muayeneler = this.mockMuayeneler.filter(m => m.hastaId === hastaId);
    return of(muayeneler).pipe(delay(400));
  }

  muayeneKaydet(muayene: Partial<Muayene>): Observable<Muayene> {
    const yeniMuayene: Muayene = {
      id: (this.mockMuayeneler.length + 1).toString(),
      randevuId: muayene.randevuId!,
      hastaId: muayene.hastaId!,
      hastaTcKimlik: muayene.hastaTcKimlik!,
      hastaAdi: muayene.hastaAdi!,
      hastaSoyadi: muayene.hastaSoyadi!,
      doktorId: muayene.doktorId!,
      doktorAdi: muayene.doktorAdi!,
      poliklinikId: muayene.poliklinikId!,
      poliklinikAdi: muayene.poliklinikAdi!,
      muayeneTarihi: muayene.muayeneTarihi!,
      muayeneSaati: muayene.muayeneSaati!,
      sikayet: muayene.sikayet!,
      anamnez: muayene.anamnez,
      fizikMuayene: muayene.fizikMuayene,
      tani: muayene.tani,
      tedavi: muayene.tedavi,
      receteler: muayene.receteler || [],
      tahliller: muayene.tahliller || [],
      notlar: muayene.notlar,
      kontrol: muayene.kontrol,
      durum: muayene.durum || 'Devam Ediyor',
      olusturmaTarihi: new Date()
    };

    this.mockMuayeneler.push(yeniMuayene);
    return of(yeniMuayene).pipe(delay(600));
  }

  // Poliklinik işlemleri
  getPoliklinikler(): Observable<Poliklinik[]> {
    return of(this.mockPoliklinikler).pipe(delay(300));
  }

  // Arama işlemleri
  randevuAra(kriterler: any): Observable<Randevu[]> {
    let sonuclar = [...this.mockRandevular];

    if (kriterler.hastaTcKimlik) {
      sonuclar = sonuclar.filter(r => 
        r.hastaTcKimlik.includes(kriterler.hastaTcKimlik)
      );
    }

    if (kriterler.hastaAdi) {
      const arama = kriterler.hastaAdi.toLowerCase();
      sonuclar = sonuclar.filter(r => 
        r.hastaAdi.toLowerCase().includes(arama) || 
        r.hastaSoyadi.toLowerCase().includes(arama)
      );
    }

    if (kriterler.doktorAdi) {
      sonuclar = sonuclar.filter(r => 
        r.doktorAdi.toLowerCase().includes(kriterler.doktorAdi.toLowerCase())
      );
    }

    if (kriterler.poliklinikId) {
      sonuclar = sonuclar.filter(r => r.poliklinikId === kriterler.poliklinikId);
    }

    if (kriterler.durum) {
      sonuclar = sonuclar.filter(r => r.durum === kriterler.durum);
    }

    if (kriterler.baslangicTarihi && kriterler.bitisTarihi) {
      const baslangic = new Date(kriterler.baslangicTarihi);
      const bitis = new Date(kriterler.bitisTarihi);
      sonuclar = sonuclar.filter(r => 
        r.randevuTarihi >= baslangic && r.randevuTarihi <= bitis
      );
    }

    return of(sonuclar).pipe(delay(600));
  }

  // İstatistikler
  getRandevuIstatistikleri(): Observable<any> {
    const istatistikler = {
      toplamRandevu: this.mockRandevular.length,
      bugunkuRandevu: this.mockRandevular.filter(r => 
        r.randevuTarihi.toDateString() === new Date().toDateString()
      ).length,
      bekleyenRandevu: this.mockRandevular.filter(r => r.durum === 'Bekliyor').length,
      tamamlananRandevu: this.mockRandevular.filter(r => r.durum === 'Tamamlandı').length,
      iptalRandevu: this.mockRandevular.filter(r => r.durum === 'İptal').length,
      toplamMuayene: this.mockMuayeneler.length,
      bugunMuayene: this.mockMuayeneler.filter(m => 
        m.muayeneTarihi.toDateString() === new Date().toDateString()
      ).length
    };

    return of(istatistikler).pipe(delay(400));
  }

  // Müsait randevu slotları
  getMusaitSlotlar(poliklinikId: string, tarih: Date): Observable<RandevuSlot[]> {
    // Mock data - gerçek uygulamada doktor çalışma saatleri ve mevcut randevular kontrol edilir
    const slotlar: RandevuSlot[] = [];
    const saatler = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];
    
    saatler.forEach(saat => {
      slotlar.push({
        tarih: tarih,
        saat: saat,
        musait: Math.random() > 0.3, // %70 ihtimalle müsait
        doktorId: 'dr1',
        doktorAdi: 'Dr. Mehmet Özkan'
      });
    });

    return of(slotlar).pipe(delay(500));
  }
}

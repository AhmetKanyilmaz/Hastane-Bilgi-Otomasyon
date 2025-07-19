import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Doktor, Poliklinik, POLIKLINIKLER, Gun, RandevuSlot, YeniRandevu, RandevuOncelik } from '../models/poliklinik.model';

@Injectable({
  providedIn: 'root'
})
export class PoliklinikService {

  // Mock doktor verileri
  private doktorlar: Doktor[] = [
    // Dahiliye
    {
      id: 1, ad: 'Ahmet', soyad: 'Kaya', unvan: 'Prof. Dr.', tcKimlik: '12345678901',
      telefon: '0532 111 1111', email: 'ahmet.kaya@hastane.com', poliklinikId: 1,
      poliklinikAdi: 'Dahiliye (İç Hastalıkları)', uzmanlikAlani: 'İç Hastalıkları',
      deneyimYil: 15, aktif: true,
      diploma: [
        { tip: 'Lisans', universite: 'İstanbul Üniversitesi', bolum: 'Tıp Fakültesi', yil: 2000 },
        { tip: 'Uzmanlik', universite: 'İstanbul Üniversitesi', bolum: 'İç Hastalıkları', yil: 2005 }
      ],
      calismaSaatleri: [
        { gun: Gun.PAZARTESI, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.SALI, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.CARSAMBA, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.PERSEMBE, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.CUMA, baslangic: '09:00', bitis: '17:00', aktif: true }
      ]
    },
    {
      id: 2, ad: 'Fatma', soyad: 'Demir', unvan: 'Doç. Dr.', tcKimlik: '12345678902',
      telefon: '0532 111 1112', email: 'fatma.demir@hastane.com', poliklinikId: 1,
      poliklinikAdi: 'Dahiliye (İç Hastalıkları)', uzmanlikAlani: 'Endokrinoloji',
      deneyimYil: 12, aktif: true,
      diploma: [
        { tip: 'Lisans', universite: 'Hacettepe Üniversitesi', bolum: 'Tıp Fakültesi', yil: 2003 },
        { tip: 'Uzmanlik', universite: 'Hacettepe Üniversitesi', bolum: 'İç Hastalıkları', yil: 2008 }
      ],
      calismaSaatleri: [
        { gun: Gun.PAZARTESI, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.SALI, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.CARSAMBA, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.PERSEMBE, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.CUMA, baslangic: '08:00', bitis: '16:00', aktif: true }
      ]
    },
    // Kardiyoloji
    {
      id: 3, ad: 'Mehmet', soyad: 'Özkan', unvan: 'Prof. Dr.', tcKimlik: '12345678903',
      telefon: '0532 111 1113', email: 'mehmet.ozkan@hastane.com', poliklinikId: 2,
      poliklinikAdi: 'Kardiyoloji (Kalp ve Damar Hastalıkları)', uzmanlikAlani: 'Kardiyoloji',
      deneyimYil: 18, aktif: true,
      diploma: [
        { tip: 'Lisans', universite: 'Ankara Üniversitesi', bolum: 'Tıp Fakültesi', yil: 1998 },
        { tip: 'Uzmanlik', universite: 'Ankara Üniversitesi', bolum: 'Kardiyoloji', yil: 2003 }
      ],
      calismaSaatleri: [
        { gun: Gun.PAZARTESI, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.SALI, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.CARSAMBA, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.PERSEMBE, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.CUMA, baslangic: '09:00', bitis: '17:00', aktif: true }
      ]
    },
    {
      id: 4, ad: 'Zeynep', soyad: 'Aydın', unvan: 'Uzm. Dr.', tcKimlik: '12345678904',
      telefon: '0532 111 1114', email: 'zeynep.aydin@hastane.com', poliklinikId: 2,
      poliklinikAdi: 'Kardiyoloji (Kalp ve Damar Hastalıkları)', uzmanlikAlani: 'Elektrofizyoloji',
      deneyimYil: 8, aktif: true,
      diploma: [
        { tip: 'Lisans', universite: 'Ege Üniversitesi', bolum: 'Tıp Fakültesi', yil: 2008 },
        { tip: 'Uzmanlik', universite: 'Ege Üniversitesi', bolum: 'Kardiyoloji', yil: 2013 }
      ],
      calismaSaatleri: [
        { gun: Gun.PAZARTESI, baslangic: '10:00', bitis: '18:00', aktif: true },
        { gun: Gun.SALI, baslangic: '10:00', bitis: '18:00', aktif: true },
        { gun: Gun.CARSAMBA, baslangic: '10:00', bitis: '18:00', aktif: true },
        { gun: Gun.PERSEMBE, baslangic: '10:00', bitis: '18:00', aktif: true },
        { gun: Gun.CUMA, baslangic: '10:00', bitis: '18:00', aktif: true }
      ]
    },
    // Gastroenteroloji
    {
      id: 5, ad: 'Ali', soyad: 'Şen', unvan: 'Doç. Dr.', tcKimlik: '12345678905',
      telefon: '0532 111 1115', email: 'ali.sen@hastane.com', poliklinikId: 3,
      poliklinikAdi: 'Gastroenteroloji (Sindirim Sistemi Hastalıkları)', uzmanlikAlani: 'Gastroenteroloji',
      deneyimYil: 10, aktif: true,
      diploma: [
        { tip: 'Lisans', universite: 'Marmara Üniversitesi', bolum: 'Tıp Fakültesi', yil: 2005 },
        { tip: 'Uzmanlik', universite: 'Marmara Üniversitesi', bolum: 'Gastroenteroloji', yil: 2010 }
      ],
      calismaSaatleri: [
        { gun: Gun.PAZARTESI, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.SALI, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.CARSAMBA, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.PERSEMBE, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.CUMA, baslangic: '08:00', bitis: '16:00', aktif: true }
      ]
    },
    // Kadın Hastalıkları
    {
      id: 6, ad: 'Ayşe', soyad: 'Yılmaz', unvan: 'Prof. Dr.', tcKimlik: '12345678906',
      telefon: '0532 111 1116', email: 'ayse.yilmaz@hastane.com', poliklinikId: 4,
      poliklinikAdi: 'Kadın Hastalıkları ve Doğum', uzmanlikAlani: 'Kadın Doğum',
      deneyimYil: 20, aktif: true,
      diploma: [
        { tip: 'Lisans', universite: 'İstanbul Üniversitesi', bolum: 'Tıp Fakültesi', yil: 1995 },
        { tip: 'Uzmanlik', universite: 'İstanbul Üniversitesi', bolum: 'Kadın Hastalıkları ve Doğum', yil: 2000 }
      ],
      calismaSaatleri: [
        { gun: Gun.PAZARTESI, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.SALI, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.CARSAMBA, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.PERSEMBE, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.CUMA, baslangic: '09:00', bitis: '17:00', aktif: true }
      ]
    },
    // Pediatri
    {
      id: 7, ad: 'Hasan', soyad: 'Çelik', unvan: 'Doç. Dr.', tcKimlik: '12345678907',
      telefon: '0532 111 1117', email: 'hasan.celik@hastane.com', poliklinikId: 5,
      poliklinikAdi: 'Çocuk Sağlığı ve Hastalıkları (Pediatri)', uzmanlikAlani: 'Çocuk Sağlığı',
      deneyimYil: 14, aktif: true,
      diploma: [
        { tip: 'Lisans', universite: 'Hacettepe Üniversitesi', bolum: 'Tıp Fakültesi', yil: 2002 },
        { tip: 'Uzmanlik', universite: 'Hacettepe Üniversitesi', bolum: 'Çocuk Sağlığı ve Hastalıkları', yil: 2007 }
      ],
      calismaSaatleri: [
        { gun: Gun.PAZARTESI, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.SALI, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.CARSAMBA, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.PERSEMBE, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.CUMA, baslangic: '08:00', bitis: '16:00', aktif: true }
      ]
    },
    // KBB
    {
      id: 8, ad: 'Elif', soyad: 'Arslan', unvan: 'Uzm. Dr.', tcKimlik: '12345678908',
      telefon: '0532 111 1118', email: 'elif.arslan@hastane.com', poliklinikId: 6,
      poliklinikAdi: 'Kulak Burun Boğaz (KBB)', uzmanlikAlani: 'Kulak Burun Boğaz',
      deneyimYil: 9, aktif: true,
      diploma: [
        { tip: 'Lisans', universite: 'Gazi Üniversitesi', bolum: 'Tıp Fakültesi', yil: 2006 },
        { tip: 'Uzmanlik', universite: 'Gazi Üniversitesi', bolum: 'Kulak Burun Boğaz', yil: 2011 }
      ],
      calismaSaatleri: [
        { gun: Gun.PAZARTESI, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.SALI, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.CARSAMBA, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.PERSEMBE, baslangic: '09:00', bitis: '17:00', aktif: true },
        { gun: Gun.CUMA, baslangic: '09:00', bitis: '17:00', aktif: true }
      ]
    },
    // Göz Hastalıkları
    {
      id: 9, ad: 'Murat', soyad: 'Öztürk', unvan: 'Prof. Dr.', tcKimlik: '12345678909',
      telefon: '0532 111 1119', email: 'murat.ozturk@hastane.com', poliklinikId: 7,
      poliklinikAdi: 'Göz Hastalıkları (Oftalmoloji)', uzmanlikAlani: 'Oftalmoloji',
      deneyimYil: 16, aktif: true,
      diploma: [
        { tip: 'Lisans', universite: 'Cerrahpaşa Üniversitesi', bolum: 'Tıp Fakültesi', yil: 1999 },
        { tip: 'Uzmanlik', universite: 'Cerrahpaşa Üniversitesi', bolum: 'Göz Hastalıkları', yil: 2004 }
      ],
      calismaSaatleri: [
        { gun: Gun.PAZARTESI, baslangic: '10:00', bitis: '18:00', aktif: true },
        { gun: Gun.SALI, baslangic: '10:00', bitis: '18:00', aktif: true },
        { gun: Gun.CARSAMBA, baslangic: '10:00', bitis: '18:00', aktif: true },
        { gun: Gun.PERSEMBE, baslangic: '10:00', bitis: '18:00', aktif: true },
        { gun: Gun.CUMA, baslangic: '10:00', bitis: '18:00', aktif: true }
      ]
    },
    // Ortopedi
    {
      id: 10, ad: 'Canan', soyad: 'Kılıç', unvan: 'Doç. Dr.', tcKimlik: '12345678910',
      telefon: '0532 111 1120', email: 'canan.kilic@hastane.com', poliklinikId: 8,
      poliklinikAdi: 'Ortopedi ve Travmatoloji', uzmanlikAlani: 'Ortopedi',
      deneyimYil: 11, aktif: true,
      diploma: [
        { tip: 'Lisans', universite: 'Ankara Üniversitesi', bolum: 'Tıp Fakültesi', yil: 2004 },
        { tip: 'Uzmanlik', universite: 'Ankara Üniversitesi', bolum: 'Ortopedi ve Travmatoloji', yil: 2009 }
      ],
      calismaSaatleri: [
        { gun: Gun.PAZARTESI, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.SALI, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.CARSAMBA, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.PERSEMBE, baslangic: '08:00', bitis: '16:00', aktif: true },
        { gun: Gun.CUMA, baslangic: '08:00', bitis: '16:00', aktif: true }
      ]
    }
  ];

  constructor() { }

  getPoliklinikler(): Observable<Poliklinik[]> {
    return of(POLIKLINIKLER).pipe(delay(300));
  }

  getPoliklinikById(id: number): Observable<Poliklinik | undefined> {
    const poliklinik = POLIKLINIKLER.find(p => p.id === id);
    return of(poliklinik).pipe(delay(200));
  }

  getDoktorlar(): Observable<Doktor[]> {
    return of(this.doktorlar).pipe(delay(300));
  }

  getDoktorlarByPoliklinik(poliklinikId: number): Observable<Doktor[]> {
    const doktorlar = this.doktorlar.filter(d => d.poliklinikId === poliklinikId && d.aktif);
    return of(doktorlar).pipe(delay(300));
  }

  getDoktorById(id: number): Observable<Doktor | undefined> {
    const doktor = this.doktorlar.find(d => d.id === id);
    return of(doktor).pipe(delay(200));
  }

  doktorAra(arama: string): Observable<Doktor[]> {
    const aramaTerimi = arama.toLowerCase();
    const bulunanDoktorlar = this.doktorlar.filter(d => 
      (d.ad + ' ' + d.soyad).toLowerCase().includes(aramaTerimi) ||
      d.uzmanlikAlani.toLowerCase().includes(aramaTerimi) ||
      d.poliklinikAdi.toLowerCase().includes(aramaTerimi)
    );
    return of(bulunanDoktorlar).pipe(delay(400));
  }

  // Randevu slot'ları oluştur
  getMusaitRandevuSlotlari(doktorId: number, tarih: Date): Observable<RandevuSlot[]> {
    const doktor = this.doktorlar.find(d => d.id === doktorId);
    if (!doktor) {
      return of([]);
    }

    const gunAdi = this.getGunAdi(tarih);
    const calismaSaati = doktor.calismaSaatleri.find(cs => cs.gun === gunAdi && cs.aktif);
    
    if (!calismaSaati) {
      return of([]);
    }

    const slotlar: RandevuSlot[] = [];
    const baslangic = calismaSaati.baslangic;
    const bitis = calismaSaati.bitis;
    
    // 30 dakikalık slotlar oluştur
    let currentTime = this.timeToMinutes(baslangic);
    const endTime = this.timeToMinutes(bitis);
    
    while (currentTime < endTime) {
      const saat = this.minutesToTime(currentTime);
      slotlar.push({
        tarih: tarih,
        saat: saat,
        doktorId: doktor.id,
        doktorAdi: `${doktor.unvan} ${doktor.ad} ${doktor.soyad}`,
        poliklinikId: doktor.poliklinikId,
        poliklinikAdi: doktor.poliklinikAdi,
        musait: Math.random() > 0.3 // %70 müsait
      });
      currentTime += 30; // 30 dakika ekle
    }

    return of(slotlar).pipe(delay(400));
  }

  randevuAl(randevu: YeniRandevu): Observable<boolean> {
    // Mock randevu alma işlemi
    console.log('Yeni randevu:', randevu);
    return of(true).pipe(delay(500));
  }

  // Yardımcı metodlar
  private getGunAdi(tarih: Date): Gun {
    const gunlar = [Gun.PAZAR, Gun.PAZARTESI, Gun.SALI, Gun.CARSAMBA, Gun.PERSEMBE, Gun.CUMA, Gun.CUMARTESI];
    return gunlar[tarih.getDay()];
  }

  private timeToMinutes(time: string): number {
    const [saat, dakika] = time.split(':').map(Number);
    return saat * 60 + dakika;
  }

  private minutesToTime(minutes: number): string {
    const saat = Math.floor(minutes / 60);
    const dakika = minutes % 60;
    return `${saat.toString().padStart(2, '0')}:${dakika.toString().padStart(2, '0')}`;
  }
}

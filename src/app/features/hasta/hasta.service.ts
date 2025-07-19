import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Hasta } from '../../models/hasta.model';

@Injectable({
  providedIn: 'root'
})
export class HastaService {
  private hastalarSubject = new BehaviorSubject<Hasta[]>([]);
  public hastalar$ = this.hastalarSubject.asObservable();

  // Mock hasta verileri
  private mockHastalar: Hasta[] = [
    {
      id: '1',
      tcKimlik: '11111111111',
      tcKimlikNo: '11111111111',
      ad: 'Ahmet',
      soyad: 'Yılmaz',
      dogumTarihi: new Date('1985-05-15'),
      cinsiyet: 'Erkek',
      telefon: '5551234567',
      email: 'ahmet.yilmaz@email.com',
      adres: 'Atatürk Mah. Cumhuriyet Cad. No:15 Ankara',
      kanGrubu: 'A+',
      tcNo: '11111111111',
      dogumYeri: 'Ankara',
      babaAdi: 'Mehmet',
      anaAdi: 'Fatma',
      meslek: 'Mühendis',
      medeniDurum: 'Evli',
      uyruk: 'TC',
      kayitTarihi: new Date('2023-01-15'),
      sonGuncelleme: new Date('2024-12-15'),
      aktif: true,
      notlar: 'Düzenli kontrol hastası',
      acilKisi: {
        ad: 'Zeynep Yılmaz',
        telefon: '5559876543',
        yakinlik: 'Eş'
      },
      sigortaBilgileri: {
        sigortaTuru: 'SGK',
        sigortaNo: 'SGK123456789',
        aktif: true
      }
    },
    {
      id: '2',
      tcKimlik: '22222222222',
      tcKimlikNo: '22222222222',
      ad: 'Ayşe',
      soyad: 'Demir',
      dogumTarihi: new Date('1990-08-22'),
      cinsiyet: 'Kadın',
      telefon: '5557654321',
      email: 'ayse.demir@email.com',
      adres: 'Kızılay Mah. İnönü Cad. No:28 Ankara',
      kanGrubu: 'B+',
      tcNo: '22222222222',
      dogumYeri: 'İstanbul',
      babaAdi: 'Ali',
      anaAdi: 'Meryem',
      meslek: 'Öğretmen',
      medeniDurum: 'Bekar',
      uyruk: 'TC',
      kayitTarihi: new Date('2023-03-20'),
      sonGuncelleme: new Date('2024-11-10'),
      aktif: true,
      notlar: 'Kronik hastalık takibi',
      acilKisi: {
        ad: 'Meryem Demir',
        telefon: '5553216549',
        yakinlik: 'Anne'
      },
      sigortaBilgileri: {
        sigortaTuru: 'Özel Sigorta',
        sigortaNo: 'AXA987654321',
        aktif: true
      }
    },
    {
      id: '3',
      tcKimlik: '33333333333',
      tcKimlikNo: '33333333333',
      ad: 'Mehmet',
      soyad: 'Kaya',
      dogumTarihi: new Date('1975-12-05'),
      cinsiyet: 'Erkek',
      telefon: '5554567890',
      email: 'mehmet.kaya@email.com',
      adres: 'Çankaya Mah. Atatürk Bulvarı No:45 Ankara',
      kanGrubu: 'O+',
      tcNo: '33333333333',
      dogumYeri: 'Konya',
      babaAdi: 'Hasan',
      anaAdi: 'Emine',
      meslek: 'Doktor',
      medeniDurum: 'Evli',
      uyruk: 'TC',
      kayitTarihi: new Date('2022-11-08'),
      sonGuncelleme: new Date('2024-12-01'),
      aktif: true,
      notlar: 'VIP hasta - öncelikli muayene',
      acilKisi: {
        ad: 'Hatice Kaya',
        telefon: '5552345678',
        yakinlik: 'Eş'
      },
      sigortaBilgileri: {
        sigortaTuru: 'SGK',
        sigortaNo: 'SGK456789123',
        aktif: true
      }
    },
    {
      id: '4',
      tcKimlik: '44444444444',
      tcKimlikNo: '44444444444',
      ad: 'Fatma',
      soyad: 'Özdemir',
      dogumTarihi: new Date('1995-03-18'),
      cinsiyet: 'Kadın',
      telefon: '5558901234',
      email: 'fatma.ozdemir@email.com',
      adres: 'Etimesgut Mah. Eskişehir Yolu No:12 Ankara',
      kanGrubu: 'AB+',
      tcNo: '44444444444',
      dogumYeri: 'Bursa',
      babaAdi: 'Osman',
      anaAdi: 'Ayşe',
      meslek: 'Hemşire',
      medeniDurum: 'Bekar',
      uyruk: 'TC',
      kayitTarihi: new Date('2024-01-12'),
      sonGuncelleme: new Date('2024-12-12'),
      aktif: true,
      notlar: 'Sağlık çalışanı - indirimli muayene',
      acilKisi: {
        ad: 'Osman Özdemir',
        telefon: '5556789012',
        yakinlik: 'Baba'
      },
      sigortaBilgileri: {
        sigortaTuru: 'SGK',
        sigortaNo: 'SGK789123456',
        aktif: true
      }
    },
    {
      id: '5',
      tcKimlik: '55555555555',
      tcKimlikNo: '55555555555',
      ad: 'Can',
      soyad: 'Arslan',
      dogumTarihi: new Date('2010-07-25'),
      cinsiyet: 'Erkek',
      telefon: '5559012345',
      email: '',
      adres: 'Sincan Mah. Bahçeli Evler No:8 Ankara',
      kanGrubu: 'A-',
      tcNo: '55555555555',
      dogumYeri: 'Ankara',
      babaAdi: 'Kemal',
      anaAdi: 'Sevgi',
      meslek: 'Öğrenci',
      medeniDurum: 'Bekar',
      uyruk: 'TC',
      kayitTarihi: new Date('2024-06-20'),
      sonGuncelleme: new Date('2024-12-08'),
      aktif: true,
      notlar: 'Pediatrik hasta - ebeveyn izni gerekli',
      acilKisi: {
        ad: 'Sevgi Arslan',
        telefon: '5555678901',
        yakinlik: 'Anne'
      },
      sigortaBilgileri: {
        sigortaTuru: 'SGK',
        sigortaNo: 'SGK321654987',
        aktif: true
      }
    }
  ];

  constructor() {
    this.hastalarSubject.next(this.mockHastalar);
  }

  // Tüm hastaları getir
  getTumHastalar(): Observable<Hasta[]> {
    return of(this.mockHastalar);
  }

  // Hasta ID'ye göre getir
  getHastaById(id: string): Observable<Hasta | undefined> {
    const hasta = this.mockHastalar.find(h => h.id === id);
    return of(hasta);
  }

  // TC Kimlik No'ya göre hasta getir
  getHastaByTcNo(tcNo: string): Observable<Hasta | undefined> {
    const hasta = this.mockHastalar.find(h => h.tcKimlik === tcNo || h.tcKimlikNo === tcNo);
    return of(hasta);
  }

  // Hasta arama (ad, soyad, tc no)
  aramaYap(aranacakMetin: string): Observable<Hasta[]> {
    const arananKelime = aranacakMetin.toLowerCase().trim();
    
    if (!arananKelime) {
      return of(this.mockHastalar);
    }

    const filtrelenmisHastalar = this.mockHastalar.filter(hasta => 
      hasta.ad.toLowerCase().includes(arananKelime) ||
      hasta.soyad.toLowerCase().includes(arananKelime) ||
      hasta.tcKimlik.includes(arananKelime) ||
      (hasta.tcKimlikNo && hasta.tcKimlikNo.includes(arananKelime)) ||
      (hasta.telefon && hasta.telefon.includes(arananKelime)) ||
      (hasta.email && hasta.email.toLowerCase().includes(arananKelime))
    );

    return of(filtrelenmisHastalar);
  }

  // Yeni hasta kaydet
  hastaKaydet(hasta: Partial<Hasta>): Observable<Hasta> {
    const yeniHasta: Hasta = {
      id: (this.mockHastalar.length + 1).toString(),
      tcKimlik: hasta.tcKimlik || hasta.tcKimlikNo || '',
      tcKimlikNo: hasta.tcKimlik || hasta.tcKimlikNo || '',
      ad: hasta.ad!,
      soyad: hasta.soyad!,
      dogumTarihi: hasta.dogumTarihi!,
      cinsiyet: hasta.cinsiyet!,
      telefon: hasta.telefon!,
      email: hasta.email || '',
      adres: hasta.adres!,
      kanGrubu: hasta.kanGrubu!,
      tcNo: hasta.tcKimlik || hasta.tcKimlikNo!,
      dogumYeri: (hasta as any).dogumYeri || '',
      babaAdi: (hasta as any).babaAdi || '',
      anaAdi: (hasta as any).anaAdi || '',
      meslek: (hasta as any).meslek || '',
      medeniDurum: (hasta as any).medeniDurum || 'Bekar',
      uyruk: (hasta as any).uyruk || 'TC',
      kayitTarihi: new Date(),
      sonGuncelleme: new Date(),
      aktif: true,
      notlar: (hasta as any).notlar || '',
      acilKisi: (hasta as any).acilKisi || { ad: '', telefon: '', yakinlik: '' },
      sigortaBilgileri: (hasta as any).sigortaBilgileri || { 
        sigortaTuru: 'SGK', 
        sigortaNo: '', 
        aktif: true 
      }
    };

    this.mockHastalar.unshift(yeniHasta);
    this.hastalarSubject.next(this.mockHastalar);
    
    return of(yeniHasta);
  }

  // Hasta güncelle
  hastaGuncelle(id: string, guncellenmisHasta: Partial<Hasta>): Observable<Hasta | null> {
    const index = this.mockHastalar.findIndex(h => h.id === id);
    
    if (index === -1) {
      return of(null);
    }

    this.mockHastalar[index] = {
      ...this.mockHastalar[index],
      ...guncellenmisHasta,
      sonGuncelleme: new Date()
    };

    this.hastalarSubject.next(this.mockHastalar);
    return of(this.mockHastalar[index]);
  }

  // Hasta sil (soft delete)
  hastaSil(id: string): Observable<boolean> {
    const index = this.mockHastalar.findIndex(h => h.id === id);
    
    if (index === -1) {
      return of(false);
    }

    this.mockHastalar[index].aktif = false;
    this.mockHastalar[index].sonGuncelleme = new Date();
    
    this.hastalarSubject.next(this.mockHastalar);
    return of(true);
  }

  // TC Kimlik No doğrulama
  tcKimlikNoKontrol(tcNo: string): boolean {
    // Basit TC Kimlik No doğrulama
    if (tcNo.length !== 11) return false;
    if (!/^\d+$/.test(tcNo)) return false;
    if (tcNo[0] === '0') return false;
    
    // TC Kimlik No algoritması
    const tc = tcNo.split('').map(Number);
    const odds = tc[0] + tc[2] + tc[4] + tc[6] + tc[8];
    const evens = tc[1] + tc[3] + tc[5] + tc[7];
    
    const check1 = (odds * 7 - evens) % 10;
    const check2 = (odds + evens + tc[9]) % 10;
    
    return tc[9] === check1 && tc[10] === check2;
  }

  // İstatistikler
  getHastaIstatistikleri(): Observable<any> {
    const toplamHasta = this.mockHastalar.length;
    const aktifHasta = this.mockHastalar.filter(h => h.aktif).length;
    const erkekHasta = this.mockHastalar.filter(h => h.cinsiyet === 'Erkek').length;
    const kadinHasta = this.mockHastalar.filter(h => h.cinsiyet === 'Kadın').length;
    
    const buAyKayitlar = this.mockHastalar.filter(h => {
      const bugün = new Date();
      if (!h.kayitTarihi) return false;
      const kayitTarihi = new Date(h.kayitTarihi);
      return kayitTarihi.getMonth() === bugün.getMonth() && 
             kayitTarihi.getFullYear() === bugün.getFullYear();
    }).length;

    return of({
      toplamHasta,
      aktifHasta,
      erkekHasta,
      kadinHasta,
      buAyKayitlar,
      kanGrubuDagilimi: this.getKanGrubuDagilimi(),
      yasDagilimi: this.getYasDagilimi()
    });
  }

  private getKanGrubuDagilimi(): any {
    const kanGruplari = this.mockHastalar.reduce((acc, hasta) => {
      if (hasta.kanGrubu) {
        acc[hasta.kanGrubu] = (acc[hasta.kanGrubu] || 0) + 1;
      }
      return acc;
    }, {} as any);
    
    return kanGruplari;
  }

  private getYasDagilimi(): any {
    const bugun = new Date();
    const yasDagilimi = {
      '0-18': 0,
      '19-35': 0,
      '36-50': 0,
      '51-65': 0,
      '65+': 0
    };

    this.mockHastalar.forEach(hasta => {
      const yas = bugun.getFullYear() - hasta.dogumTarihi.getFullYear();
      
      if (yas <= 18) yasDagilimi['0-18']++;
      else if (yas <= 35) yasDagilimi['19-35']++;
      else if (yas <= 50) yasDagilimi['36-50']++;
      else if (yas <= 65) yasDagilimi['51-65']++;
      else yasDagilimi['65+']++;
    });

    return yasDagilimi;
  }
}

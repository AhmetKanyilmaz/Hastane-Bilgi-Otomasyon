import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Randevu, Muayene, Istem } from '../../models/muayene.model';
import { Hasta } from '../../models/hasta.model';

@Injectable({
  providedIn: 'root'
})
export class PoliklinikService {
  
  // Mock data
  private mockHastalar: Hasta[] = [
    {
      id: '1',
      tcKimlik: '12345678901',
      ad: 'Ahmet',
      soyad: 'Yılmaz',
      dogumTarihi: new Date('1985-03-15'),
      cinsiyet: 'Erkek',
      telefon: '0532 123 45 67',
      email: 'ahmet.yilmaz@email.com',
      sigorta: { tip: 'SGK' },
      kanGrubu: 'A+',
      alerjiler: ['Penisilin'],
      kronikHastaliklar: ['Hipertansiyon'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      tcKimlik: '98765432109',
      ad: 'Fatma',
      soyad: 'Demir',
      dogumTarihi: new Date('1990-07-22'),
      cinsiyet: 'Kadın',
      telefon: '0533 987 65 43',
      email: 'fatma.demir@email.com',
      sigorta: { tip: 'Özel', sirketAdi: 'Acıbadem Sigorta' },
      kanGrubu: 'B+',
      alerjiler: [],
      kronikHastaliklar: [],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      tcKimlik: '11223344556',
      ad: 'Mehmet',
      soyad: 'Kaya',
      dogumTarihi: new Date('1975-12-03'),
      cinsiyet: 'Erkek',
      telefon: '0534 111 22 33',
      sigorta: { tip: 'SGK' },
      kanGrubu: 'O+',
      alerjiler: ['Polen'],
      kronikHastaliklar: ['Diyabet'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private mockRandevular: Randevu[] = [
    {
      id: '1',
      hastaId: '1',
      hasta: {
        ad: 'Ahmet',
        soyad: 'Yılmaz',
        tcKimlik: '12345678901',
        telefon: '0532 123 45 67'
      },
      doktorId: '1',
      doktor: {
        ad: 'Dr. Mehmet',
        soyad: 'Özkan',
        uzmanlik: 'İç Hastalıkları'
      },
      tarih: new Date(),
      saat: '09:00',
      durum: 'Bekliyor',
      tip: 'Kontrol',
      departman: 'Dahiliye',
      oda: '101',
      createdAt: new Date()
    },
    {
      id: '2',
      hastaId: '2',
      hasta: {
        ad: 'Fatma',
        soyad: 'Demir',
        tcKimlik: '98765432109',
        telefon: '0533 987 65 43'
      },
      doktorId: '1',
      doktor: {
        ad: 'Dr. Mehmet',
        soyad: 'Özkan',
        uzmanlik: 'İç Hastalıkları'
      },
      tarih: new Date(),
      saat: '09:30',
      durum: 'Bekliyor',
      tip: 'İlk Muayene',
      departman: 'Dahiliye',
      oda: '101',
      createdAt: new Date()
    },
    {
      id: '3',
      hastaId: '3',
      hasta: {
        ad: 'Mehmet',
        soyad: 'Kaya',
        tcKimlik: '11223344556',
        telefon: '0534 111 22 33'
      },
      doktorId: '1',
      doktor: {
        ad: 'Dr. Mehmet',
        soyad: 'Özkan',
        uzmanlik: 'İç Hastalıkları'
      },
      tarih: new Date(),
      saat: '10:00',
      durum: 'Tamamlandı',
      tip: 'Kontrol',
      departman: 'Dahiliye',
      oda: '101',
      createdAt: new Date()
    }
  ];

  private selectedPatientSubject = new BehaviorSubject<Hasta | null>(null);
  public selectedPatient$ = this.selectedPatientSubject.asObservable();

  constructor() {}

  getBugununRandevulari(): Observable<Randevu[]> {
    return of(this.mockRandevular);
  }

  getHastaDetay(hastaId: string): Observable<Hasta | null> {
    const hasta = this.mockHastalar.find(h => h.id === hastaId);
    return of(hasta || null);
  }

  selectPatient(hasta: Hasta): void {
    this.selectedPatientSubject.next(hasta);
  }

  getMuayeneTarihi(hastaId: string): Observable<any[]> {
    // Mock muayene geçmişi
    const mockGecmis = [
      {
        id: '1',
        tarih: new Date('2024-01-15'),
        doktor: 'Dr. Mehmet Özkan',
        tani: 'Hipertansiyon kontrolü',
        tedavi: 'İlaç tedavisi devam',
        notlar: 'Hasta genel durumu iyi'
      },
      {
        id: '2',
        tarih: new Date('2023-12-10'),
        doktor: 'Dr. Mehmet Özkan',
        tani: 'Rutin kontrol',
        tedavi: 'Diyet önerileri',
        notlar: 'Kan basıncı normal seviyede'
      }
    ];
    return of(mockGecmis);
  }

  getLabSonuclari(hastaId: string): Observable<any[]> {
    // Mock lab sonuçları
    const mockSonuclar = [
      {
        id: '1',
        testAdi: 'Tam Kan Sayımı',
        tarih: new Date('2024-01-10'),
        durum: 'Tamamlandı',
        sonuclar: {
          'Hemoglobin': '14.2 g/dL',
          'Hematokrit': '%42.1',
          'Lökosit': '7200/mm³'
        }
      },
      {
        id: '2',
        testAdi: 'Biyokimya Paneli',
        tarih: new Date('2024-01-10'),
        durum: 'Tamamlandı',
        sonuclar: {
          'Glukoz': '95 mg/dL',
          'Kreatinin': '0.9 mg/dL',
          'ALT': '28 U/L'
        }
      }
    ];
    return of(mockSonuclar);
  }

  createIstem(istem: Partial<Istem>): Observable<Istem> {
    const newIstem: Istem = {
      id: Date.now().toString(),
      tip: istem.tip || 'Laboratuvar',
      kategori: istem.kategori || '',
      testAdi: istem.testAdi || '',
      aciklama: istem.aciklama,
      acilDurum: istem.acilDurum || false,
      durum: 'Bekliyor',
      istenmeTarihi: new Date(),
      doktorNotu: istem.doktorNotu
    };
    
    // Burada normalde API'ye gönderilecek
    console.log('Yeni istem oluşturuldu:', newIstem);
    
    return of(newIstem);
  }

  saveMuayene(muayene: Partial<Muayene>): Observable<Muayene> {
    const newMuayene: Muayene = {
      id: Date.now().toString(),
      randevuId: muayene.randevuId || '',
      hastaId: muayene.hastaId || '',
      doktorId: '1', // Current doctor
      tarih: new Date(),
      sikayet: muayene.sikayet || '',
      fizikMuayene: muayene.fizikMuayene || '',
      tani: muayene.tani || [],
      tedavi: muayene.tedavi || '',
      ilaclar: muayene.ilaclar || [],
      istemler: muayene.istemler || [],
      kontrolTarihi: muayene.kontrolTarihi,
      notlar: muayene.notlar,
      durum: 'Tamamlandı'
    };

    console.log('Muayene kaydedildi:', newMuayene);
    return of(newMuayene);
  }

  updateRandevuDurum(randevuId: string, durum: string): Observable<boolean> {
    const randevu = this.mockRandevular.find(r => r.id === randevuId);
    if (randevu) {
      randevu.durum = durum as any;
      return of(true);
    }
    return of(false);
  }
}

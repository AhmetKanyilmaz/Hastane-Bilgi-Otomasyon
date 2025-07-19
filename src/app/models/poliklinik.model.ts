export interface Poliklinik {
  id: number;
  ad: string;
  kod: string;
  aciklama?: string;
  aktif: boolean;
  kategori: PoliklinikKategori;
  renk: string; // UI'da kullanılacak tema rengi
}

export interface Doktor {
  id: number;
  ad: string;
  soyad: string;
  unvan: string; // Prof. Dr., Doç. Dr., Dr., Uzm. Dr.
  tcKimlik: string;
  telefon: string;
  email: string;
  poliklinikId: number;
  poliklinikAdi: string;
  uzmanlikAlani: string;
  diploma: DiplomaDetay[];
  deneyimYil: number;
  aktif: boolean;
  calismaSaatleri: CalismaSaati[];
  fotograf?: string;
  ozgecmis?: string;
}

export interface DiplomaDetay {
  tip: 'Lisans' | 'Yuksek Lisans' | 'Doktora' | 'Uzmanlik' | 'Yan Dal';
  universite: string;
  bolum: string;
  yil: number;
}

export interface CalismaSaati {
  gun: Gun;
  baslangic: string; // HH:mm formatında
  bitis: string; // HH:mm formatında
  aktif: boolean;
}

export interface RandevuSlot {
  tarih: Date;
  saat: string;
  doktorId: number;
  doktorAdi: string;
  poliklinikId: number;
  poliklinikAdi: string;
  musait: boolean;
  randevuId?: number;
}

export interface YeniRandevu {
  hastaId: number;
  doktorId: number;
  poliklinikId: number;
  tarih: Date;
  saat: string;
  sikayet?: string;
  notlar?: string;
  oncelik: RandevuOncelik;
}

export enum PoliklinikKategori {
  DAHILI = 'Dahili Tıp',
  CERRAHI = 'Cerrahi',
  COCUK = 'Çocuk Sağlığı',
  KADIN = 'Kadın Sağlığı',
  OZEL = 'Özel Dal',
  ACIL = 'Acil Servis'
}

export enum Gun {
  PAZARTESI = 'Pazartesi',
  SALI = 'Salı',
  CARSAMBA = 'Çarşamba',
  PERSEMBE = 'Perşembe',
  CUMA = 'Cuma',
  CUMARTESI = 'Cumartesi',
  PAZAR = 'Pazar'
}

export enum RandevuOncelik {
  NORMAL = 'Normal',
  ACIL = 'Acil',
  KONTROL = 'Kontrol'
}

// Poliklinik listesi
export const POLIKLINIKLER: Poliklinik[] = [
  {
    id: 1,
    ad: 'Dahiliye (İç Hastalıkları)',
    kod: 'DAH',
    aciklama: 'Yetişkin hastalarda iç organ hastalıklarının tanı ve tedavisi',
    aktif: true,
    kategori: PoliklinikKategori.DAHILI,
    renk: '#1976d2'
  },
  {
    id: 2,
    ad: 'Kardiyoloji (Kalp ve Damar Hastalıkları)',
    kod: 'KAR',
    aciklama: 'Kalp ve damar hastalıklarının tanı ve tedavisi',
    aktif: true,
    kategori: PoliklinikKategori.DAHILI,
    renk: '#d32f2f'
  },
  {
    id: 3,
    ad: 'Gastroenteroloji (Sindirim Sistemi Hastalıkları)',
    kod: 'GAS',
    aciklama: 'Mide, bağırsak ve sindirim sistemi hastalıkları',
    aktif: true,
    kategori: PoliklinikKategori.DAHILI,
    renk: '#388e3c'
  },
  {
    id: 4,
    ad: 'Kadın Hastalıkları ve Doğum',
    kod: 'KAD',
    aciklama: 'Kadın sağlığı, gebelik takibi ve doğum hizmetleri',
    aktif: true,
    kategori: PoliklinikKategori.KADIN,
    renk: '#e91e63'
  },
  {
    id: 5,
    ad: 'Çocuk Sağlığı ve Hastalıkları (Pediatri)',
    kod: 'PED',
    aciklama: '0-18 yaş arası çocukların sağlık hizmetleri',
    aktif: true,
    kategori: PoliklinikKategori.COCUK,
    renk: '#ff9800'
  },
  {
    id: 6,
    ad: 'Kulak Burun Boğaz (KBB)',
    kod: 'KBB',
    aciklama: 'Kulak, burun, boğaz hastalıklarının tanı ve tedavisi',
    aktif: true,
    kategori: PoliklinikKategori.OZEL,
    renk: '#9c27b0'
  },
  {
    id: 7,
    ad: 'Göz Hastalıkları (Oftalmoloji)',
    kod: 'GOZ',
    aciklama: 'Göz hastalıkları ve görme bozukluklarının tedavisi',
    aktif: true,
    kategori: PoliklinikKategori.OZEL,
    renk: '#00bcd4'
  },
  {
    id: 8,
    ad: 'Ortopedi ve Travmatoloji',
    kod: 'ORT',
    aciklama: 'Kemik, eklem ve kas iskelet sistemi hastalıkları',
    aktif: true,
    kategori: PoliklinikKategori.CERRAHI,
    renk: '#795548'
  },
  {
    id: 9,
    ad: 'Nöroloji (Sinir Sistemi Hastalıkları)',
    kod: 'NEU',
    aciklama: 'Beyin, omurilik ve sinir sistemi hastalıkları',
    aktif: true,
    kategori: PoliklinikKategori.DAHILI,
    renk: '#607d8b'
  },
  {
    id: 10,
    ad: 'Dermatoloji (Cildiye)',
    kod: 'DER',
    aciklama: 'Cilt, saç ve tırnak hastalıklarının tedavisi',
    aktif: true,
    kategori: PoliklinikKategori.OZEL,
    renk: '#ff5722'
  },
  {
    id: 11,
    ad: 'Psikiyatri',
    kod: 'PSI',
    aciklama: 'Ruh sağlığı ve psikolojik hastalıkların tedavisi',
    aktif: true,
    kategori: PoliklinikKategori.OZEL,
    renk: '#673ab7'
  },
  {
    id: 12,
    ad: 'Üroloji (İdrar Yolları ve Erkek Sağlığı)',
    kod: 'URO',
    aciklama: 'İdrar yolları ve erkek üreme sistemi hastalıkları',
    aktif: true,
    kategori: PoliklinikKategori.CERRAHI,
    renk: '#3f51b5'
  },
  {
    id: 13,
    ad: 'Fiziksel Tıp ve Rehabilitasyon',
    kod: 'FTR',
    aciklama: 'Fizik tedavi ve rehabilitasyon hizmetleri',
    aktif: true,
    kategori: PoliklinikKategori.OZEL,
    renk: '#4caf50'
  },
  {
    id: 14,
    ad: 'Endokrinoloji ve Metabolizma Hastalıkları',
    kod: 'END',
    aciklama: 'Hormon ve metabolizma hastalıklarının tedavisi',
    aktif: true,
    kategori: PoliklinikKategori.DAHILI,
    renk: '#ff9800'
  },
  {
    id: 15,
    ad: 'Hematoloji (Kan Hastalıkları)',
    kod: 'HEM',
    aciklama: 'Kan hastalıkları ve kan kanserleri',
    aktif: true,
    kategori: PoliklinikKategori.DAHILI,
    renk: '#f44336'
  },
  {
    id: 16,
    ad: 'Onkoloji (Kanser Tedavisi)',
    kod: 'ONK',
    aciklama: 'Kanser hastalıklarının tanı ve tedavisi',
    aktif: true,
    kategori: PoliklinikKategori.OZEL,
    renk: '#e91e63'
  },
  {
    id: 17,
    ad: 'Göğüs Hastalıkları',
    kod: 'GOP',
    aciklama: 'Akciğer ve solunum sistemi hastalıkları',
    aktif: true,
    kategori: PoliklinikKategori.DAHILI,
    renk: '#00bcd4'
  },
  {
    id: 18,
    ad: 'Enfeksiyon Hastalıkları ve Klinik Mikrobiyoloji',
    kod: 'ENF',
    aciklama: 'Bulaşıcı hastalıklar ve enfeksiyon tedavisi',
    aktif: true,
    kategori: PoliklinikKategori.DAHILI,
    renk: '#ff5722'
  },
  {
    id: 19,
    ad: 'Ruh Sağlığı ve Psikoterapi',
    kod: 'RSP',
    aciklama: 'Psikoterapi ve ruh sağlığı hizmetleri',
    aktif: true,
    kategori: PoliklinikKategori.OZEL,
    renk: '#9c27b0'
  },
  {
    id: 20,
    ad: 'Allerji ve İmmünoloji',
    kod: 'ALL',
    aciklama: 'Alerji hastalıkları ve bağışıklık sistemi',
    aktif: true,
    kategori: PoliklinikKategori.DAHILI,
    renk: '#4caf50'
  },
  {
    id: 21,
    ad: 'Plastik, Rekonstrüktif ve Estetik Cerrahi',
    kod: 'PLA',
    aciklama: 'Plastik cerrahi ve estetik operasyonlar',
    aktif: true,
    kategori: PoliklinikKategori.CERRAHI,
    renk: '#e91e63'
  },
  {
    id: 22,
    ad: 'Nefroloji (Böbrek Hastalıkları)',
    kod: 'NEF',
    aciklama: 'Böbrek hastalıkları ve diyaliz hizmetleri',
    aktif: true,
    kategori: PoliklinikKategori.DAHILI,
    renk: '#00bcd4'
  },
  {
    id: 23,
    ad: 'Romatoloji',
    kod: 'ROM',
    aciklama: 'Eklem, kas ve bağ dokusu hastalıkları',
    aktif: true,
    kategori: PoliklinikKategori.DAHILI,
    renk: '#795548'
  },
  {
    id: 24,
    ad: 'Acil Servis Polikliniği',
    kod: 'ACL',
    aciklama: '7/24 acil sağlık hizmetleri',
    aktif: true,
    kategori: PoliklinikKategori.ACIL,
    renk: '#f44336'
  },
  {
    id: 25,
    ad: 'Aile Hekimliği',
    kod: 'AHE',
    aciklama: 'Birinci basamak sağlık hizmetleri',
    aktif: true,
    kategori: PoliklinikKategori.DAHILI,
    renk: '#4caf50'
  },
  {
    id: 26,
    ad: 'Geriatri (Yaşlı Sağlığı)',
    kod: 'GER',
    aciklama: '65+ yaş sağlık hizmetleri ve yaşlı bakımı',
    aktif: true,
    kategori: PoliklinikKategori.OZEL,
    renk: '#607d8b'
  },
  {
    id: 27,
    ad: 'Göğüs Cerrahisi',
    kod: 'GOC',
    aciklama: 'Akciğer ve göğüs bölgesi cerrahisi',
    aktif: true,
    kategori: PoliklinikKategori.CERRAHI,
    renk: '#3f51b5'
  },
  {
    id: 28,
    ad: 'Genel Cerrahi',
    kod: 'GEC',
    aciklama: 'Genel cerrahi operasyonları',
    aktif: true,
    kategori: PoliklinikKategori.CERRAHI,
    renk: '#ff9800'
  },
  {
    id: 29,
    ad: 'Çocuk Cerrahisi',
    kod: 'COC',
    aciklama: 'Çocuklarda cerrahi müdahaleler',
    aktif: true,
    kategori: PoliklinikKategori.CERRAHI,
    renk: '#ff5722'
  },
  {
    id: 30,
    ad: 'Kalp ve Damar Cerrahisi',
    kod: 'KDC',
    aciklama: 'Kalp ve damar cerrahi operasyonları',
    aktif: true,
    kategori: PoliklinikKategori.CERRAHI,
    renk: '#d32f2f'
  }
];

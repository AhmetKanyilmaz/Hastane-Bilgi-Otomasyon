export interface RadyolojiIstek {
  id: string;
  hastaId: string;
  hastaAdi: string;
  hastaTcKimlik: string;
  doktorId: string;
  doktorAdi: string;
  poliklinikAdi: string;
  istekTarihi: Date;
  istekSaati: string;
  tetkikTuru: RadyolojiTetkikTuru;
  tetkikAdi: string;
  klinikBilgi: string;
  onTani: string;
  aciklama?: string;
  oncelik: RadyolojiOncelik;
  durum: RadyolojiDurum;
  cekimTarihi?: Date;
  cekimSaati?: string;
  teknisyenId?: string;
  teknisyenAdi?: string;
  raporTarihi?: Date;
  raporlayanDoktorId?: string;
  raporlayanDoktor?: string;
  rapor?: RadyolojiRapor;
  goruntular?: RadyolojiGoruntu[];
  maliyet?: number;
  odemeYontem?: 'Nakit' | 'Kredi Kartı' | 'Sigorta' | 'Havale';
  odemeDurum?: 'Bekliyor' | 'Ödendi' | 'Kısmi' | 'İptal';
}

export interface RadyolojiRapor {
  id: string;
  istekId: string;
  raporTarihi: Date;
  raporlayanDoktorId: string;
  raporlayanDoktor: string;
  bulgu: string;
  sonuc: string;
  oneri?: string;
  kritikBulgu: boolean;
  acilDurum: boolean;
  karsilastirma?: string;
  teknikBilgi?: TeknikBilgi;
  onayDurum: 'Taslak' | 'Onaylandı' | 'Revizyon Gerekli';
  onayTarihi?: Date;
  elektronikImza?: string;
}

export interface TeknikBilgi {
  cihazBilgi: string;
  parametreler: string;
  kontrastMadde?: boolean;
  kontrastTuru?: string;
  radyasyonDoz?: string;
  kaliteNotu?: string;
}

export interface RadyolojiGoruntu {
  id: string;
  istekId: string;
  dosyaAdi: string;
  dosyaYolu: string;
  dosyaBoyut: number;
  format: 'DICOM' | 'JPEG' | 'PNG' | 'PDF';
  aciklama?: string;
  yuklemeTarihi: Date;
  siraNu: number;
}

export interface RadyolojiPersonel {
  id: string;
  ad: string;
  soyad: string;
  unvan: string;
  uzmanlik: RadyolojiUzmanlik[];
  aktif: boolean;
  telefon: string;
  email: string;
  vardiyaBilgi?: VardiyaBilgi[];
}

export interface VardiyaBilgi {
  gun: string;
  baslangic: string;
  bitis: string;
  aktif: boolean;
}

export interface RadyolojiCihaz {
  id: string;
  ad: string;
  marka: string;
  model: string;
  seriNo: string;
  tip: RadyolojiTetkikTuru;
  lokasyon: string;
  durum: CihazDurum;
  sonBakimTarihi?: Date;
  sonKalibrasyon?: Date;
  aktif: boolean;
}

export interface RadyolojiRandevu {
  id: string;
  hastaId: string;
  hastaAdi: string;
  tetkikTuru: RadyolojiTetkikTuru;
  tarih: Date;
  saat: string;
  cihazId: string;
  teknisyenId: string;
  hazirlikTalimati?: string;
  durum: RandevuDurum;
  notlar?: string;
}

export interface RadyolojiIstatistik {
  gunlukTetkikSayisi: number;
  bekleyenIstek: number;
  tamamlananIstek: number;
  kritikBulgu: number;
  gelirToplami: number;
  cihazKullanimi: CihazKullanim[];
  populerTetkikler: PopulerTetkik[];
}

export interface CihazKullanim {
  cihazAdi: string;
  kullanim: number;
  kapasite: number;
}

export interface PopulerTetkik {
  tetkikAdi: string;
  sayi: number;
}

export enum RadyolojiTetkikTuru {
  DIREKT_GRAFI = 'Direkt Grafi',
  BT = 'Bilgisayarlı Tomografi (BT)',
  MR = 'Manyetik Rezonans (MR)',
  ULTRASON = 'Ultrasonografi',
  MAMOGRAFI = 'Mamografi',
  ANJIOGRAFI = 'Anjiografi',
  FLOROSKOPI = 'Floroskopi',
  KEMIK_YOĞUNLUĞU = 'Kemik Yoğunluğu (DEXA)',
  SINTIGRAFI = 'Sintigrafi',
  PET_BT = 'PET-BT',
  MR_ANJIOGRAFI = 'MR Anjiografi',
  BT_ANJIOGRAFI = 'BT Anjiografi'
}

export enum RadyolojiOncelik {
  NORMAL = 'Normal',
  ACIL = 'Acil',
  ÇOK_ACIL = 'Çok Acil',
  STAT = 'STAT'
}

export enum RadyolojiDurum {
  ISTEK_VERILDI = 'İstek Verildi',
  RANDEVU_VERILDI = 'Randevu Verildi',
  HASTA_CAGRILDI = 'Hasta Çağrıldı',
  CEKIM_DEVAM_EDIYOR = 'Çekim Devam Ediyor',
  CEKIM_TAMAMLANDI = 'Çekim Tamamlandı',
  RAPOR_YAZILIYOR = 'Rapor Yazılıyor',
  RAPOR_TAMAMLANDI = 'Rapor Tamamlandı',
  TESLIM_EDILDI = 'Teslim Edildi',
  IPTAL = 'İptal'
}

export enum RadyolojiUzmanlik {
  GENEL_RADYOLOJI = 'Genel Radyoloji',
  TORAKS_RADYOLOJI = 'Toraks Radyolojisi',
  KARDIYOVASKULER = 'Kardiyovasküler Radyoloji',
  NORORADYOLOJI = 'Nöroradyoloji',
  MUSKULOSKELETAL = 'Muskuloskeletal Radyoloji',
  ABDOMINAL = 'Abdominal Radyoloji',
  PEDIATRIK = 'Pediatrik Radyoloji',
  GIRISIMSEL = 'Girişimsel Radyoloji',
  MEME_RADYOLOJI = 'Meme Radyolojisi',
  NUKLEER_TIP = 'Nükleer Tıp'
}

export enum CihazDurum {
  AKTIF = 'Aktif',
  BAKIM = 'Bakımda',
  ARIZALI = 'Arızalı',
  KALIB_BEKLIYOR = 'Kalibrasyon Bekliyor',
  PASIF = 'Pasif'
}

export enum RandevuDurum {
  BEKLIYOR = 'Bekliyor',
  ONAYLANDI = 'Onaylandı',
  HASTA_GELDI = 'Hasta Geldi',
  TAMAMLANDI = 'Tamamlandı',
  IPTAL = 'İptal',
  ERTELENDI = 'Ertelendi'
}

// Tetkik türlerine göre hazırlık talimatları
export const TETKIK_HAZIRLIK_TALIMATLARI: { [key in RadyolojiTetkikTuru]: string } = {
  [RadyolojiTetkikTuru.DIREKT_GRAFI]: 'Metal eşyalarınızı çıkarınız.',
  [RadyolojiTetkikTuru.BT]: 'Çekim öncesi 4 saat aç gelmeniz gerekmektedir. Metal eşyalarınızı çıkarınız.',
  [RadyolojiTetkikTuru.MR]: 'Metal eşyalarınızı çıkarınız. Pacemaker varsa mutlaka bildiriniz.',
  [RadyolojiTetkikTuru.ULTRASON]: 'Karın bölgesi için 6-8 saat aç gelmeniz gerekmektedir.',
  [RadyolojiTetkikTuru.MAMOGRAFI]: 'Üst vücut kıyafetlerinizi çıkarmanız gerekecektir.',
  [RadyolojiTetkikTuru.ANJIOGRAFI]: 'Çekim öncesi 8 saat aç gelmeniz gerekmektedir.',
  [RadyolojiTetkikTuru.FLOROSKOPI]: 'Metal eşyalarınızı çıkarınız.',
  [RadyolojiTetkikTuru.KEMIK_YOĞUNLUĞU]: 'Normal kıyafetlerinizle gelebilirsiniz.',
  [RadyolojiTetkikTuru.SINTIGRAFI]: 'Çekim öncesi özel hazırlık gerekebilir.',
  [RadyolojiTetkikTuru.PET_BT]: 'Çekim öncesi 6 saat aç gelmeniz gerekmektedir.',
  [RadyolojiTetkikTuru.MR_ANJIOGRAFI]: 'Metal eşyalarınızı çıkarınız. Pacemaker varsa mutlaka bildiriniz.',
  [RadyolojiTetkikTuru.BT_ANJIOGRAFI]: 'Çekim öncesi 4 saat aç gelmeniz gerekmektedir.'
};

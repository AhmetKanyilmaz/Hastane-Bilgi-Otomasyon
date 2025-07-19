export interface Randevu {
  id: string;
  hastaId: string;
  hasta: {
    ad: string;
    soyad: string;
    tcKimlik: string;
    telefon?: string;
  };
  doktorId: string;
  doktor: {
    ad: string;
    soyad: string;
    uzmanlik: string;
  };
  tarih: Date;
  saat: string;
  durum: 'Bekliyor' | 'Başladı' | 'Tamamlandı' | 'İptal' | 'Gecikti';
  tip: 'İlk Muayene' | 'Kontrol' | 'Acil' | 'Konsültasyon';
  not?: string;
  departman: string;
  oda?: string;
  createdAt: Date;
}

export interface Muayene {
  id: string;
  randevuId: string;
  hastaId: string;
  doktorId: string;
  tarih: Date;
  sikayet: string;
  fizikMuayene: string;
  tani: string[];
  tedavi: string;
  ilaclar: Ilac[];
  istemler: Istem[];
  kontrolTarihi?: Date;
  notlar?: string;
  durum: 'Devam Ediyor' | 'Tamamlandı';
}

export interface Ilac {
  id: string;
  adi: string;
  doz: string;
  kullanim: string;
  sure: string;
  not?: string;
}

export interface Istem {
  id: string;
  tip: 'Laboratuvar' | 'Radyoloji' | 'Konsültasyon';
  kategori: string;
  testAdi: string;
  aciklama?: string;
  acilDurum: boolean;
  durum: 'Bekliyor' | 'İşlemde' | 'Tamamlandı' | 'Raporlandı';
  istenmeTarihi: Date;
  sonucTarihi?: Date;
  sonuc?: any;
  doktorNotu?: string;
}

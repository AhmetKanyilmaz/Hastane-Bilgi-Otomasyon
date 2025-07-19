export interface Randevu {
  id: string;
  hastaId: string;
  hastaTcKimlik: string;
  hastaAdi: string;
  hastaSoyadi: string;
  doktorId: string;
  doktorAdi: string;
  poliklinikId: string;
  poliklinikAdi: string;
  randevuTarihi: Date;
  randevuSaati: string;
  durum: 'Bekliyor' | 'Devam Ediyor' | 'Tamamlandı' | 'İptal' | 'Geldi' | 'Gelmedi';
  randevuTuru: 'İlk Muayene' | 'Kontrol' | 'Acil';
  oncelik: 'Düşük' | 'Normal' | 'Yüksek' | 'Acil';
  notlar?: string;
  sikayet?: string;
  olusturmaTarihi: Date;
  guncellemeTarihi?: Date;
  telefonRandevu?: boolean;
  onlineRandevu?: boolean;
}

export interface Muayene {
  id: string;
  randevuId: string;
  hastaId: string;
  hastaTcKimlik: string;
  hastaAdi: string;
  hastaSoyadi: string;
  doktorId: string;
  doktorAdi: string;
  poliklinikId: string;
  poliklinikAdi: string;
  muayeneTarihi: Date;
  muayeneSaati: string;
  sikayet: string;
  anamnez?: string;
  fizikMuayene?: string;
  tani?: string;
  tedavi?: string;
  receteler?: Recete[];
  tahliller?: TahlilIstegi[];
  notlar?: string;
  kontrol?: {
    tarihi?: Date;
    aciklama?: string;
  };
  durum: 'Devam Ediyor' | 'Tamamlandı';
  olusturmaTarihi: Date;
  guncellemeTarihi?: Date;
}

export interface Recete {
  id: string;
  ilacAdi: string;
  doz: string;
  kullanim: string;
  miktar: number;
  aciklama?: string;
}

export interface TahlilIstegi {
  id: string;
  tahlilTuru: string;
  aciklama?: string;
  acil: boolean;
}

export interface Poliklinik {
  id: string;
  adi: string;
  kod: string;
  aciklama?: string;
  aktif: boolean;
  doktorlar: PoliklinikDoktor[];
}

export interface PoliklinikDoktor {
  id: string;
  doktorId: string;
  doktorAdi: string;
  uzmanlik: string;
  calismaSaatleri: CalismaSaati[];
  aktif: boolean;
}

export interface CalismaSaati {
  gun: string;
  baslangic: string;
  bitis: string;
  randevuSuresi: number; // dakika
}

export interface RandevuSlot {
  tarih: Date;
  saat: string;
  musait: boolean;
  doktorId: string;
  doktorAdi: string;
}

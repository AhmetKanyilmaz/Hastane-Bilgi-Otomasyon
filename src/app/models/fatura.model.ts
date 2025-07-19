export interface FaturaItem {
  id: string;
  kod: string;
  ad: string;
  miktar: number;
  birimFiyat: number;
  toplam: number;
  kategori: 'Muayene' | 'Test' | 'İlaç' | 'Ameliyat' | 'Diğer';
}

export interface Fatura {
  id: string;
  faturaNo: string;
  hastaId: string;
  hasta: {
    ad: string;
    soyad: string;
    tcKimlik: string;
  };
  tarih: Date;
  durum: 'Bekliyor' | 'Ödendi' | 'Kısmen Ödendi' | 'İptal';
  items: FaturaItem[];
  toplamTutar: number;
  odenentTutar: number;
  kalanTutar: number;
  sigorta: {
    tip: 'SGK' | 'Özel' | 'Yok';
    orani: number;
    tutari: number;
  };
  odemeTipi?: 'Nakit' | 'Kredi Kartı' | 'Banka Transferi' | 'Sigorta';
  notlar?: string;
}

export interface SGKBildirim {
  id: string;
  faturaId: string;
  bildirimTarihi: Date;
  durum: 'Bekliyor' | 'Gönderildi' | 'Onaylandı' | 'Reddedildi';
  tutari: number;
  aciklama?: string;
}

export interface MaliRapor {
  tarih: Date;
  gunlukGelir: number;
  sgkGelir: number;
  ozelSigortaGelir: number;
  nakitGelir: number;
  toplamFatura: number;
  odenenFatura: number;
  bekleyenFatura: number;
}

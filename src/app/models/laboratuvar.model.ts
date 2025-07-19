export interface LabSonuc {
  id: string;
  istemId: string;
  hastaId: string;
  testAdi: string;
  kategori: string;
  ornekTarihi: Date;
  sonucTarihi: Date;
  sonuclar: LabDeger[];
  doktorYorumu?: string;
  laborantId: string;
  laborant: string;
  durum: 'İşlemde' | 'Onay Bekliyor' | 'Onaylandı' | 'Revize Gerekli';
  kritikDegerler?: string[];
  referansAraligi?: string;
}

export interface LabDeger {
  parametre: string;
  deger: string | number;
  birim: string;
  referansMin?: number;
  referansMax?: number;
  durum: 'Normal' | 'Yüksek' | 'Düşük' | 'Kritik';
  not?: string;
}

export interface LabIslem {
  id: string;
  istemId: string;
  hastaId: string;
  hasta: {
    ad: string;
    soyad: string;
    tcKimlik: string;
    yas: number;
    cinsiyet: string;
  };
  testAdi: string;
  kategori: string;
  istenmeTarihi: Date;
  doktor: string;
  departman: string;
  durum: 'Bekliyor' | 'Örnek Alındı' | 'İşlemde' | 'Tamamlandı' | 'Onaylandı';
  oncelik: 'Normal' | 'Acil' | 'Çok Acil';
  ornekTipi: string;
  barkod?: string;
  notlar?: string;
}

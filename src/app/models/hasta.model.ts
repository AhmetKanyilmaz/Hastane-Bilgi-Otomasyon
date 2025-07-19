export interface Hasta {
  id: string;
  tcKimlik: string;
  tcKimlikNo?: string; // Backward compatibility
  ad: string;
  soyad: string;
  dogumTarihi: Date;
  cinsiyet: 'Erkek' | 'Kadın';
  telefon?: string;
  email?: string;
  adres?: string | Adres; // Hem string hem object destekleyelim
  sigorta?: SigortaBilgisi;
  kanGrubu?: string;
  alerjiler?: string[];
  kronikHastaliklar?: string[];
  acilDurumIletisim?: AcilDurumIletisim;
  createdAt?: Date;
  updatedAt?: Date;
  
  // Resimde görülen ek alanlar
  tcNo?: string;
  dogumYeri?: string;
  babaAdi?: string;
  anaAdi?: string;
  meslek?: string;
  medeniDurum?: 'Evli' | 'Bekar' | 'Dul' | 'Boşanmış';
  uyruk?: string;
  kayitTarihi?: Date;
  sonGuncelleme?: Date;
  aktif?: boolean;
  notlar?: string;
  acilKisi?: AcilKisi;
  sigortaBilgileri?: SigortaDetay;
  resim?: string; // Hasta fotoğrafı
}

export interface Adres {
  il: string;
  ilce: string;
  mahalle: string;
  sokak: string;
  binaNo: string;
  daireNo?: string;
  postaKodu?: string;
}

export interface SigortaBilgisi {
  tip: 'SGK' | 'Özel' | 'Yok';
  sirketAdi?: string;
  policeNo?: string;
  gecerlilikTarihi?: Date;
}

export interface AcilDurumIletisim {
  ad: string;
  soyad: string;
  yakinlik: string;
  telefon: string;
}

export interface AcilKisi {
  ad: string;
  telefon: string;
  yakinlik: string;
}

export interface SigortaDetay {
  sigortaTuru: string;
  sigortaNo: string;
  aktif: boolean;
  gecerlilikTarihi?: Date;
  poliçeNo?: string;
}

export interface HastaTarihi {
  id: string;
  hastaId: string;
  tarih: Date;
  tip: 'Muayene' | 'Tahlil' | 'Ameliyat' | 'Kontrol';
  doktorId: string;
  doktorAdi: string;
  departman: string;
  durum: 'Bekliyor' | 'Devam Ediyor' | 'Tamamlandı' | 'İptal';
  notlar?: string;
  sonuclar?: any;
}

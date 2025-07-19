# 🏥 Hastane Bilgi Otomasyon Sistemi

Angular 18 ile geliştirilmiş modern hastane yönetim sistemi. Material Design bileşenleri ve responsive tasarım ile kullanıcı dostu bir deneyim sunar.

## 🚀 Özellikler

### 📋 Modüller
- **🩺 Hasta İşlemleri** - Hasta kayıt, arama, kabul ve taburcu işlemleri
- **🏥 Poliklinik** - Randevu sistemi, doktor programları ve muayene ekranları
- **🧪 Laboratuvar** - Test talepleri, sonuç girişi ve laborant ekranı
- **📱 Radyoloji** - Görüntüleme talepleri ve PACS sistemi
- **💰 Mali İşler** - Faturalama, tahsilat ve mali raporlar
- **👥 İnsan Kaynakları** - Personel yönetimi ve vardiya planlama
- **📦 Stok Yönetimi** - Envanter takibi ve tedarikçi yönetimi
- **📊 Raporlama** - Detaylı analiz ve performans raporları

### 🎨 Teknik Özellikler
- **Angular 18** - Modern frontend framework
- **Material Design** - Google Material bileşenleri
- **TypeScript** - Tip güvenliği
- **Responsive** - Mobil uyumlu tasarım
- **Modüler Yapı** - Bakımı kolay kod organizasyonu

## 🛠️ Kurulum

### Gereksinimler
- Node.js (v18+)
- Angular CLI (v18+)

### Proje Kurulumu

```bash
# Repoyu klonlayın
git clone https://github.com/AhmetKanyilmaz/Hastane-Bilgi-Otomasyon.git

# Proje dizinine gidin
cd Hastane-Bilgi-Otomasyon

# Bağımlılıkları yükleyin
npm install
```

## 🏃‍♂️ Çalıştırma

### Geliştirme Sunucusu

```bash
ng serve
```

Tarayıcınızda `http://localhost:4200/` adresine gidin. Kaynak dosyalarını değiştirdiğinizde uygulama otomatik olarak yeniden yüklenir.

### Üretim Build

```bash
ng build
```

Build dosyaları `dist/` klasöründe oluşturulur.

## 🧪 Test

### Unit Testler

```bash
ng test
```

### End-to-End Testler

```bash
ng e2e
```

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── components/          # Ortak bileşenler
│   │   ├── layout/          # Layout bileşenleri (sidebar, navbar)
│   │   └── auth/            # Kimlik doğrulama
│   ├── features/            # Modül bileşenleri
│   │   ├── laboratuvar/     # Laboratuvar modülü
│   │   ├── poliklinik/      # Poliklinik modülü
│   │   ├── hasta/           # Hasta işlemleri
│   │   └── ...              # Diğer modüller
│   ├── models/              # TypeScript modelleri
│   ├── services/            # Angular servisler
│   └── styles.scss          # Global stiller
```

## 🤝 Katkıda Bulunma

1. Bu repoyu fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Ahmet Emirhan Kanyılmaz - [@AhmetKanyilmaz](https://github.com/AhmetKanyilmaz)

Proje Linki: [https://github.com/AhmetKanyilmaz/Hastane-Bilgi-Otomasyon](https://github.com/AhmetKanyilmaz/Hastane-Bilgi-Otomasyon)

# 🏥 Hastane Bilgi Otomasyon Sistemi

Modern hastane yönetim sistemi ile sağlık hizmetlerini dijitalleştirin! Angular 18 ve Material Design bileşenleri kullanılarak geliştirilmiş, kullanıcı dostu ve responsive tasarıma sahip kapsamlı bir çözüm.

## 📖 Uygulama Hakkında

Bu proje, hastanelerin günlük operasyonlarını yönetmek için tasarlanmış eksiksiz bir bilgi otomasyon sistemidir. Hasta kabul işlemlerinden laboratuvar test sonuçlarına, poliklinik randevularından mali işlemlere kadar hastane süreçlerinin tamamını dijital ortamda yönetmenizi sağlar.

### 🎯 Temel Amaç
- Hastane süreçlerinin dijitalleştirilmesi
- Kağıt tabanlı işlemlerin minimize edilmesi  
- Veri güvenliği ve erişim kontrolü
- Kullanıcı dostu modern arayüz
- Mobil uyumlu responsive tasarım

### 👥 Hedef Kullanıcılar
- **Hastane Yöneticileri** - Genel sistem yönetimi ve raporlama
- **Doktorlar** - Hasta muayene ve tedavi takibi
- **Hemşireler** - Hasta bakım süreçleri
- **Laborantlar** - Test sonuçları ve numune takibi
- **Mali Personel** - Faturalama ve tahsilat işlemleri
- **İK Personeli** - Personel yönetimi ve vardiya planlama

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

## 🛠️ Kurulum Rehberi

### ⚡ Sistem Gereksinimleri
- **Node.js** v18.0 veya üzeri
- **npm** v9.0 veya üzeri
- **Angular CLI** v18.0 veya üzeri
- **Git** (projeyi klonlamak için)

### 📥 Kurulum Adımları

#### 1. Node.js Kurulumu
```bash
# Node.js versiyonunu kontrol edin
node --version
npm --version

# Eğer yüklü değilse nodejs.org'dan indirin
```

#### 2. Angular CLI Kurulumu
```bash
# Angular CLI'yi global olarak yükleyin
npm install -g @angular/cli

# Kurulumu doğrulayın
ng version
```

#### 3. Projeyi Klonlama
```bash
# GitHub'dan projeyi klonlayın
git clone https://github.com/AhmetKanyilmaz/Hastane-Bilgi-Otomasyon.git

# Proje dizinine gidin
cd Hastane-Bilgi-Otomasyon
```

#### 4. Bağımlılıkları Yükleme
```bash
# NPM paketlerini yükleyin
npm install

# Material Design bağımlılıklarını kontrol edin
npm list @angular/material
```

#### 5. İlk Çalıştırma
```bash
# Geliştirme sunucusunu başlatın
ng serve

# Alternatif olarak farklı port kullanın
ng serve --port 4201
```

#### 6. Tarayıcıda Görüntüleme
- Ana sayfa: `http://localhost:4200/`
- Geliştirici araçları ile responsive tasarımı test edin

### 🚨 Sorun Giderme

#### Node Modules Sorunu
```bash
# node_modules klasörünü temizleyin
rm -rf node_modules package-lock.json
npm install
```

#### Port Sorunu
```bash
# Farklı port kullanın
ng serve --port 4201
```

#### Build Sorunu
```bash
# Cache'i temizleyin
npm cache clean --force
ng build --configuration production
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

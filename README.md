# Sanat Portfolio Sitesi

Resim öğretmeni için hazırlanmış profesyonel portfolio sitesi.

## 🎨 Özellikler

- **Modern Tasarım**: Glassmorphism efektleri ve gradyan renkler
- **Responsive**: Mobil ve masaüstü uyumlu
- **Firebase Entegrasyonu**: Cloud Firestore ile veri depolama
- **Base64 Resim Depolama**: Resimleri base64 formatında saklar
- **Admin Panel**: Güvenli eser yönetimi
- **Drag & Drop**: Kolay resim yükleme

## 🔧 Kurulum

### 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com)'a gidin
2. "Yeni Proje Oluştur" butonuna tıklayın
3. Proje adını girin (örn: "portfolio-sitesi")
4. Google Analytics'i etkinleştirin (isteğe bağlı)
5. Proje oluşturulduktan sonra "Firestore Database" bölümüne gidin
6. "Veritabanı oluştur" butonuna tıklayın
7. "Test modunda başla" seçeneğini seçin

### 2. Firebase Yapılandırması

1. Firebase proje ayarlarından "Web App" ekleyin
2. Firebase config bilgilerini kopyalayın
3. `index.html` dosyasındaki Firebase config bölümünü güncelleyin:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC...",
    authDomain: "portfolio-sitesi.firebaseapp.com",
    projectId: "portfolio-sitesi",
    storageBucket: "portfolio-sitesi.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

### 3. Firestore Güvenlik Kuralları

Firebase Console'da Firestore > Rules bölümüne gidin ve şu kuralları ekleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /artworks/{document} {
      allow read: if true;
      allow write: if request.auth != null; // Üretim için daha güvenli
    }
  }
}
```

**Geliştirme aşamasında geçici olarak:**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## 🚀 Canlıya Alma

### Firebase Hosting ile:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Netlify ile:
1. portfolio klasörünü zip'leyin
2. Netlify.com'da "Deploy" butonuna tıklayın
3. Zip dosyasını sürükleyin

### Vercel ile:
1. GitHub'a yükleyin
2. Vercel.com'da projeyi import edin

## 🔐 Güvenlik

### Admin Şifresi Değiştirme
`index.html` dosyasında şifrenizi değiştirin:
```javascript
const ADMIN_PASSWORD = "yeni_sifreniz_123";
```

### Üretim Güvenliği
- Firebase Authentication kullanın
- Firestore kurallarını sıkılaştırın
- HTTPS kullanın
- Admin şifresini environment variable olarak saklayın

## 📱 Kullanım

### Admin Panel
1. Sağ üst köşedeki "Admin" butonuna tıklayın
2. Şifre: `admin123` (değiştirmeyi unutmayın!)
3. "Yeni Eser Ekle" ile resim yükleyin
4. "Eserleri Yönet" ile mevcut eserleri düzenleyin

### Eser Yükleme
- Desteklenen formatlar: JPG, PNG, JPEG
- Maksimum dosya boyutu: 10MB önerilir
- Kategoriler: Yağlı Boya, Akrilik, Suluboya, Karakalem, Pastel, Dijital, Karışık Teknik

## 🎨 Özelleştirme

### Renk Değişimi
CSS'de gradient renklerini değiştirin:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Başlık Değişimi
HTML'de başlık ve alt başlığı değiştirin:
```html
<h1>Sanat Portfolio</h1>
<p class="subtitle">Renklerin ve Hayallerin Buluştuğu Yer</p>
```

## 📂 Dosya Yapısı

```
portfolio/
├── index.html          # Ana site dosyası
├── README.md           # Bu dosya
└── firebase.json       # Firebase yapılandırması (opsiyonel)
```

## 🐛 Sorun Giderme

### Firebase Bağlantı Hatası
- Firebase config bilgilerini kontrol edin
- Firestore kurallarını kontrol edin
- Tarayıcı konsolu hatalarını kontrol edin

### Resim Yüklenememe
- Dosya boyutunu kontrol edin
- Dosya formatını kontrol edin
- İnternet bağlantısını kontrol edin

### Admin Panel Açılmama
- Şifreyi kontrol edin
- Tarayıcı cache'ini temizleyin
- Konsol hatalarını kontrol edin

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Tarayıcı konsolu hatalarını kontrol edin
2. Firebase Console'da hata loglarını kontrol edin
3. README dosyasını tekrar okuyun

## 📜 Lisans

Bu proje kişisel kullanım içindir. Ticari kullanım için geliştirici ile iletişime geçin.

---

**Not**: Bu site mobil uyumlu olarak tasarlanmıştır ve tüm modern tarayıcılarda çalışır.
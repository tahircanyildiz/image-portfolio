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



### Üretim Güvenliği
- Firebase Authentication kullanın
- Firestore kurallarını sıkılaştırın
- HTTPS kullanın
- Admin şifresini environment variable olarak saklayın

## 📱 Kullanım

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


## 📜 Lisans

Bu proje kişisel kullanım içindir. Ticari kullanım için geliştirici ile iletişime geçin.

---

**Not**: Bu site mobil uyumlu olarak tasarlanmıştır ve tüm modern tarayıcılarda çalışır.

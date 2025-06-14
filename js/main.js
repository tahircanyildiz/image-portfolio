// Sanat Portfolio - Ana JavaScript Dosyası

// Global değişkenler
let isAdminLoggedIn = false;

// Sayfa yüklendiğinde çalışacak fonksiyon
window.addEventListener('load', () => {
    loadArtworks();
    setupDragAndDrop();
});

// Admin panel toggle
function toggleAdmin() {
    const panel = document.getElementById('adminPanel');
    panel.classList.toggle('active');

    if (!panel.classList.contains('active')) {
        adminLogout();
    }
}

// Admin giriş fonksiyonu
function adminLogin() {
    const password = document.getElementById('adminPassword').value;

    if (password === window.ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('uploadForm').style.display = 'block';
        document.getElementById('adminPassword').value = '';
    } else {
        alert('Hatalı şifre!');
    }
}

// Admin çıkış fonksiyonu
function adminLogout() {
    isAdminLoggedIn = false;
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('uploadForm').style.display = 'none';
    document.getElementById('artworkList').style.display = 'none';
    clearForm();
}

// Resim önizleme fonksiyonu
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('imagePreview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Drag & Drop kurulumu
function setupDragAndDrop() {
    const fileUpload = document.querySelector('.file-upload');

    fileUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUpload.classList.add('dragover');
    });

    fileUpload.addEventListener('dragleave', () => {
        fileUpload.classList.remove('dragover');
    });

    fileUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUpload.classList.remove('dragover');

        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            document.getElementById('fileInput').files = files;
            previewImage({ target: { files: files } });
        }
    });
}

// Eser yükleme fonksiyonu
async function uploadArtwork() {
    if (!isAdminLoggedIn) {
        alert('Admin girişi yapmanız gerekiyor!');
        return;
    }

    const fileInput = document.getElementById('fileInput');
    const title = document.getElementById('artworkTitle').value.trim();
    const description = document.getElementById('artworkDescription').value.trim();
    const category = document.getElementById('artworkCategory').value;

    if (!fileInput.files[0] || !title) {
        alert('Lütfen resim ve eser adı giriniz!');
        return;
    }

    const loading = document.getElementById('loading');
    loading.classList.add('active');

    try {
        // Resmi base64'e çevir
        const base64Image = await fileToBase64(fileInput.files[0]);

        // Firestore'a kaydet
        await window.db.collection('artworks').add({
            title: title,
            description: description,
            category: category,
            imageBase64: base64Image,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            timestamp: Date.now()
        });

        alert('Eser başarıyla yüklendi!');
        clearForm();
        loadArtworks();

    } catch (error) {
        console.error('Yükleme hatası:', error);
        alert('Eser yüklenirken bir hata oluştu!');
    } finally {
        loading.classList.remove('active');
    }
}

// Dosyayı Base64'e çevirme fonksiyonu
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Eserleri yükleme fonksiyonu
async function loadArtworks() {
    try {
        const snapshot = await window.db.collection('artworks')
            .orderBy('timestamp', 'desc')
            .get();

        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';

        if (snapshot.empty) {
            gallery.innerHTML = `
                <div class="empty-gallery">
                    <h3>Henüz eser eklenmemiş</h3>
                    <p>Admin panelinden eserlerinizi ekleyerek galeriyi oluşturabilirsiniz.</p>
                </div>
            `;
            return;
        }

        snapshot.forEach(doc => {
            const artwork = doc.data();
            const artworkCard = createArtworkCard(artwork, doc.id);
            gallery.appendChild(artworkCard);
        });

    } catch (error) {
        console.error('Eserler yüklenirken hata:', error);
    }
}

// Eser kartı oluşturma fonksiyonu
function createArtworkCard(artwork, id) {
    const card = document.createElement('div');
    card.className = 'artwork-card';

    const date = artwork.createdAt ?
        artwork.createdAt.toDate().toLocaleDateString('tr-TR') :
        new Date().toLocaleDateString('tr-TR');

    card.innerHTML = `
        <img src="${artwork.imageBase64}" alt="${artwork.title}" class="artwork-img">
        <div class="artwork-info">
            <h3 class="artwork-title">${artwork.title}</h3>
            <p class="artwork-description">${artwork.description || ''}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="artwork-date">${artwork.category} • ${date}</span>
            </div>
        </div>
    `;

    return card;
}

// Eser listesini gösterme fonksiyonu
async function showArtworkList() {
    document.getElementById('uploadForm').style.display = 'none';
    document.getElementById('artworkList').style.display = 'block';

    try {
        const snapshot = await window.db.collection('artworks')
            .orderBy('timestamp', 'desc')
            .get();

        const container = document.getElementById('adminArtworks');
        container.innerHTML = '';

        snapshot.forEach(doc => {
            const artwork = doc.data();
            const artworkDiv = document.createElement('div');
            artworkDiv.className = 'admin-artwork';

            artworkDiv.innerHTML = `
                <img src="${artwork.imageBase64}" alt="${artwork.title}">
                <div class="admin-artwork-info">
                    <h4>${artwork.title}</h4>
                    <p>${artwork.category}</p>
                    <p style="font-size: 14px; color: #666;">${artwork.description || 'Açıklama yok'}</p>
                </div>
                <button class="btn btn-danger" onclick="deleteArtwork('${doc.id}')">Sil</button>
            `;

            container.appendChild(artworkDiv);
        });

    } catch (error) {
        console.error('Eserler yüklenirken hata:', error);
    }
}

// Eser silme fonksiyonu
async function deleteArtwork(id) {
    if (!confirm('Bu eseri silmek istediğinizden emin misiniz?')) {
        return;
    }

    try {
        await window.db.collection('artworks').doc(id).delete();
        alert('Eser başarıyla silindi!');
        showArtworkList();
        loadArtworks();
    } catch (error) {
        console.error('Silme hatası:', error);
        alert('Eser silinirken bir hata oluştu!');
    }
}

// Yükleme formunu gösterme fonksiyonu
function showUploadForm() {
    document.getElementById('artworkList').style.display = 'none';
    document.getElementById('uploadForm').style.display = 'block';
}

// Formu temizleme fonksiyonu
function clearForm() {
    document.getElementById('fileInput').value = '';
    document.getElementById('artworkTitle').value = '';
    document.getElementById('artworkDescription').value = '';
    document.getElementById('artworkCategory').value = 'Yağlı Boya';
    document.getElementById('imagePreview').style.display = 'none';
}

// Global fonksiyonları window nesnesine bağla
window.toggleAdmin = toggleAdmin;
window.adminLogin = adminLogin;
window.adminLogout = adminLogout;
window.previewImage = previewImage;
window.uploadArtwork = uploadArtwork;
window.showArtworkList = showArtworkList;
window.deleteArtwork = deleteArtwork;
window.showUploadForm = showUploadForm;
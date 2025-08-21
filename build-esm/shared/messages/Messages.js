export const messages = {
    // ================= COMMON =================
    common: {
        not_found: "Kullanıcı bulunamadı",
        server_error: "⚠️ Sunucuya bağlanılamadı.",
        action_success: "✅ İşlem başarılı",
        action_error: "❌ İşlem başarısız",
    },
    // ================= BACKEND =================
    db: {
        created: (dbName) => `✅ Veritabanı '${dbName}' yoksa oluşturuldu.`,
        tables_created: "✅ Tablolar başarıyla oluşturuldu",
        error: "❌ Veritabanı kurulurken hata:",
    },
    get: {
        contacts_error: "Kullanıcılar alınamadı",
    },
    post: {
        create_success: "Kayıt başarılı",
        create_error: "Kayıt eklenemedi",
    },
    put: {
        update_success: "Kullanıcı güncellendi",
        update_conflict: "Bu e-posta başka kullanıcıda kayıtlı",
        update_error: "Güncelleme başarısız",
    },
    delete: {
        delete_success: "Kullanıcı silindi",
        delete_error: "Silme hatası",
    },
    http: {
        endpoint_not_found: "Böyle bir endpoint yok",
        method_not_found: "Böyle bir Methoda izin verilmiyor",
        not_found: "404 Not Found",
    },
    // ================= FRONTEND =================
    contact: {
        first_name_required: "Adınızı giriniz!",
        last_name_required: "Soyadınızı giriniz!",
        email_required: "Email adresinizi giriniz!",
        email_invalid: "Geçerli bir email giriniz!",
        message_required: "Lütfen mesajınızı yazınız!",
        send_success: (msg) => `Mesaj başarıyla gönderildi! ✉️\n${msg}`,
        send_error: (err) => `❌ Hata: ${err}`,
    },
    feedback: {
        title: "Sizden Gelenler",
        delete_success: "🗑️ Başarıyla silindi",
        delete_error: "🗑️ Silme Hatası",
        update_success: "✅ Güncelleme başarılı",
        update_error: (err) => `❌ Güncelleme hatası: ${err}`,
        no_messages: "Henüz mesaj yok.",
        placeholder_first_name: "İsim",
        placeholder_last_name: "Soyisim",
        placeholder_email: "E-posta",
        send_button: "Gönder",
        new_message_button: "Yeni Mesaj Gönder",
    },
};
//# sourceMappingURL=Messages.js.map
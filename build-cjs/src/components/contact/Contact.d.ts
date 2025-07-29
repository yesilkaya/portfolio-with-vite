/**
 * @file ContactForm.tsx
 * @description Kullanıcıların ad, soyad, email ve mesaj bilgilerini girerek iletişim kurabileceği form bileşeni.
 * Form `antd` kütüphanesi ile oluşturulmuş olup, başarılı gönderim sonrası form temizlenir.
 */
import React from "react";
/**
 * `ContactForm` bileşeni, kullanıcıdan iletişim bilgilerini alıp
 * belirtilen API endpoint'ine (http://localhost:3000/api/contact) POST isteği gönderen bir formdur.
 *
 * Özellikler:
 * - Tüm alanlar zorunludur.
 * - Email alanı geçerli formatta olmalıdır.
 * - Gönderim başarılıysa form sıfırlanır ve kullanıcıya bilgi verilir.
 * - Hata durumunda kullanıcı bilgilendirilir.
 *
 * @component
 * @returns {JSX.Element} İletişim formunu içeren React bileşeni.
 */
export declare const ContactForm: React.FC;

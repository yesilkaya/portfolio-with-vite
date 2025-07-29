/**
 * Education data for the portfolio.
 * This file contains the dates, titles, and descriptions of each educational experience
 * 
 * @module educationData
 */
 
 /** 
 * @interface EducationItem
 * @property {string} date - The date range of the education experience.
 * @property {string} title - The title of the educational experience (e.g., degree, institution).
 * @property {string} description - A brief description of the educational experience, including key learnings and skills acquired.
 * * @constant {EducationItem[]} educationData - An array of education items, each representing a distinct educational experience.
 * * @example
 * import { educationData } from './educationData';
 * * educationData.forEach(item => {
 * console.log(`${item.date}: ${item.title} - ${item.description}`);
 * });
 */

export interface EducationItem {
  date: string;
  title: string;
  description: string;
}

export const educationData: EducationItem[] = [
  {
    date: "2008 - 2013",
    title: "Üniversite",
    description:
      "Lisans eğitimimi Kocaeli Üniversitesi Elektronik ve Haberleşme Mühendisliği bölümünde tamamladım. Bu süreçte temel mühendislik prensiplerinin yanı sıra yazılım, sistem tasarımı ve iletişim teknolojileri alanlarında derinlemesine bilgi edindim. Teknolojiye olan ilgim bu dönemde yazılıma yöneldi ve Flutter ile mobil uygulama geliştirmeye başladım. Ardından Node.js ve TypeScript gibi modern backend teknolojileriyle full-stack geliştirme yolculuğuma adım attım.",
  },
  {
    date: "2015 - 2022",
    title: "İEA",
    description:
      "İstanbul Elektronik Anahtar firması bünyesinde 8 yıl boyunca gömülü sistemler üzerinde yazılım geliştirdim. Gerçek zamanlı sistemler, donanım-yazılım entegrasyonu ve mikrodenetleyici programlama alanlarında derinlemesine tecrübe kazandım. Son 2 yılda ise Flutter ile mobil uygulama geliştirme görevini üstlendim. Kullanıcı dostu, performans odaklı mobil çözümler geliştirerek şirketin dijital dönüşüm süreçlerine aktif katkı sağladım.",
  },
  {
    date: "2022 - ∞",
    title: "Eşarj",
    description:
      "Aralık 2022’den beri Eşarj bünyesinde Flutter Developer olarak görev almaktayım. Mobil uygulama geliştirme alanındaki uzmanlığımı, backend teknolojileri üzerinde çalışarak full-stack yetkinliklerle genişletme aşamasındayım. Projelere uçtan uca katkı sağlamak ve şirketin teknolojik hedeflerine değer katmak amacıyla sürekli öğrenme ve gelişim odaklı çalışmalar yürütmekteyim.",
  },
];

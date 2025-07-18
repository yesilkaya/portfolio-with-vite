export interface NavbarItem {
  key: string;
  id: string;
  label: string;
  content: string;
  type: "scroll" | "route";
  route?: string; // type "route" ise route zorunlu, "scroll" ise yok
}

export const navbar: NavbarItem[] = [
  {
    key: "1",
    id: "home",
    label: "Anasayfa",
    content: "Burası Anasayfa. Hoş geldiniz!",
    type: "scroll",
  },
  {
    key: "2",
    id: "education",
    label: "Eğitim",
    content:
      "Eğitim sayfasına hoş geldiniz. Burada eğitimler hakkında bilgi bulabilirsiniz.",
    type: "scroll",
  },
  {
    key: "3",
    id: "services",
    label: "Hizmetler",
    content: "Hizmetlerimiz hakkında detaylı bilgiye buradan ulaşabilirsiniz.",
    type: "scroll",
  },
  {
    key: "4",
    id: "contact",
    label: "Bana Ulaş",
    content: "Bizimle iletişime geçmek için bu sayfayı kullanabilirsiniz.",
    type: "scroll",
  },
  {
    key: "5",
    id: "projects",
    label: "Projeler",
    content: "Projelerimiz burada listelenmiştir. İnceleyebilirsiniz.",
    type: "route",
    route: "/projects",
  },
  {
    key: "6",
    id: "fullstack",
    label: "Öğrenim Çizelgesi",
    content: "",
    type: "route",
    route: "/fullstack",
  },
  {
    key: "7",
    id: "crud",
    label: "Crud",
    content: "",
    type: "route",
    route: "/crud",
  },
];

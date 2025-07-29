/**
 * Navigation bar items for the website.
 * Each item has an ID, label, type, and optionally a route.
 *
 * @module navbar
 */
/**
  * @constant {NavbarItem[]} navbar - An array of navbar items
 */
export const navbar = [
    {
        key: "1",
        id: "home",
        label: "Anasayfa",
        type: "scroll",
    },
    {
        key: "2",
        id: "education",
        label: "Eğitim",
        type: "scroll",
    },
    {
        key: "3",
        id: "services",
        label: "Hizmetler",
        type: "scroll",
    },
    {
        key: "4",
        id: "contact",
        label: "Bana Ulaş",
        type: "scroll",
    },
    {
        key: "5",
        id: "projects",
        label: "Projeler",
        type: "route",
        route: "/projects",
    },
    {
        key: "6",
        id: "crud",
        label: "Crud",
        type: "route",
        route: "/crud",
    },
];
//# sourceMappingURL=navbar.js.map
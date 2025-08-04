/**
 * Navigation bar items for the website.
 * Each item has an ID, label, type, and optionally a route.
 *
 * @module navbar
 */

/**
 * Represents a single navigation item.
 * 
 * @interface NavbarItem
 * @property {string} key - Unique key for the navbar item.
 * @property {string} id - ID used for scrolling or routing.
 * @property {string} label - Text shown in the navbar.
 * @property {string} content - Content shown for the section.
 * @property {"scroll" | "route"} type - Type of navigation ("scroll" for page section, "route" for page).
 * @property {string} [route] - URL route if type is "route".
 */

/**
 * List of navbar items.
 * 
 * @constant {NavbarItem[]}
 */

export interface NavbarItem {
  key: string;
  id: string;
  label: string;
  type: "scroll" | "route";
  route?: string;
}
/**
  * @constant {NavbarItem[]} navbar - An array of navbar items
 */
export const navbar: NavbarItem[] = [
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
  {
    key: "7",
    id: "feedback",
    label: "Feedback",
    type: "route",
    route: "/feedback",
  },
];

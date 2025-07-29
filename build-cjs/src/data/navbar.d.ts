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
export declare const navbar: NavbarItem[];

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
export declare const educationData: EducationItem[];

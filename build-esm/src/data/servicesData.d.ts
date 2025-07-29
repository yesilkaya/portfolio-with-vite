/**
 * This file contains the services data for the portfolio.
 * * @module servicesData
 */
/**
 * Represents a service offered in the portfolio.
 * @interface Service
 * @property {string} title - The title of the service.
 * @property {string} description - A brief description of the service.
 */
export interface Service {
    title: string;
    description: string;
}
/**
 * An array of services in the portfolio.
 * @constant {Service[]} services
 */
export declare const services: Service[];

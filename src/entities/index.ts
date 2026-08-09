/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: contentitems
 * Interface for ContentItems
 */
export interface ContentItems {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  fullContent?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType datetime */
  publishDate?: Date | string;
  /** @wixFieldType text */
  author?: string;
}

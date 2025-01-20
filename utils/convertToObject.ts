import { IProperty } from '@/models/Property';

/**
 * Converts a Mongoose lean document into a serializable IProperty object.
 *
 * @param leanDocument - The Mongoose lean document to be converted.
 * @returns IProperty object or null if input is invalid.
 */
export function convertToSerializeableObject(leanDocument: any): IProperty | null {
  if (!leanDocument || typeof leanDocument !== 'object') return null;

  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key]?.toJSON && leanDocument[key]?.toString) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }

  return leanDocument as IProperty;
}

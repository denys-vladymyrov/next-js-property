import { IProperty } from '@/models/Property';
import { IMessage } from "@/models/Message";

export function convertToSerializeableObject(leanDocument: any): IProperty | IMessage | null {
  if (!leanDocument || typeof leanDocument !== 'object') return null;

  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key]?.toJSON && leanDocument[key]?.toString) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }

  return leanDocument as IProperty;
}


export function convertToSerializeableObjectGen<T extends { [key: string]: any }>(leanDocument: T): T | null {
  if (!leanDocument || typeof leanDocument !== 'object') return null;

  for (const key of Object.keys(leanDocument)) {
    const value = leanDocument[key];

    if (value && typeof value.toJSON === 'function' && typeof value.toString === 'function') {
      (leanDocument as { [key: string]: any })[key] = value.toString();
    }
  }

  return leanDocument;
}

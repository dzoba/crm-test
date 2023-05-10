import { Contact } from './types/Contact';

export interface Schema {
  contacts: Contact;
}

export type Database = {
  schema: Schema;
}

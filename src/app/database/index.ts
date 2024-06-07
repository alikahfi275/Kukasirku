import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './schema';
import Product from './model/Product';

const adapter = new SQLiteAdapter({
    schema: mySchema,
});

export const database = new Database({
    adapter,
    modelClasses: [Product],
    actionsEnabled: true,
});

// database/schema.ts
import { appSchema, tableSchema } from '@nozbe/watermelondb/Schema';

export const mySchema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'products',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'price', type: 'number' },
                { name: 'description', type: 'string', isOptional: true },
                { name: 'imageUrl', type: 'string', isOptional: true },
            ],
        }),
    ],
});

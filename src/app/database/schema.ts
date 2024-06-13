import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'products',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'price', type: 'number' },
                { name: 'description', type: 'string' },
                { name: 'imageUrl', type: 'string' },
            ],
        }),
        tableSchema({
            name: 'checkouts',
            columns: [
                { name: 'order_id', type: 'string' },
                { name: 'total_price', type: 'number' },
                { name: 'date', type: 'number' },
            ],
        }),
        tableSchema({
            name: 'checkout_items',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'price', type: 'number' },
                { name: 'quantity', type: 'number' },
                { name: 'checkout_id', type: 'string', isIndexed: true },
            ],
        }),
    ],
});

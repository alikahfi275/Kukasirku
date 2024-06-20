import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './schema';
import Product from './model/Product';
import Checkout from './model/Checkout';
import CheckoutItem from './model/CheckoutItem';
import StoreProfile from './model/StoreProfile';


const adapter = new SQLiteAdapter({
    schema: mySchema,
});

export const database = new Database({
    adapter,
    modelClasses: [Product, Checkout, CheckoutItem, StoreProfile],
    actionsEnabled: true,
});

// services/ProductService.ts
import { database } from '../../../app/database';
import Checkout from '../../../app/database/model/Checkout';
import CheckoutItem from '../../../app/database/model/CheckoutItem';
import { Q } from '@nozbe/watermelondb';


export const getAllCheckouts = async (): Promise<Checkout[]> => {
    try {
        const checkouts = await database
            .get<Checkout>('checkouts')
            .query()
            .fetch();

        const sortedCheckouts = checkouts.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime(); // Descending order
        });

        return sortedCheckouts;
    } catch (error) {
        console.error('Error fetching checkouts:', error);
        throw error;
    }
};

export const getCheckoutItemsByCheckoutId = async (
    checkoutId: string,
): Promise<CheckoutItem[]> => {
    try {
        // if (!checkoutId) {
        //     throw new Error('Checkout ID is required');
        // }
        const items = await database
            .get<CheckoutItem>('checkout_items')
            .query(Q.where('checkout_id', checkoutId))
            .fetch();

        return items;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        } else {
            throw new Error('Unknown error occurred');
        }
    }
};








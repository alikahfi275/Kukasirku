import { Q } from '@nozbe/watermelondb';
import { database } from '../../../app/database';
import Checkout from '../../../app/database/model/Checkout';
import CheckoutItem from '../../../app/database/model/CheckoutItem';

interface MonthlySummary {
    productCount: number;
    totalPrice: number;
}

export const getCheckoutsByMonth = async (month: number): Promise<MonthlySummary> => {
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), month, 1).getTime();
        const lastDayOfMonth = new Date(currentDate.getFullYear(), month + 1, 0).getTime();

        const checkouts = await database
            .get<Checkout>('checkouts')
            .query(
                Q.where('date', Q.between(firstDayOfMonth, lastDayOfMonth))
            )
            .fetch();

        let productCount = 0;
        let totalPrice = 0;

        for (const checkout of checkouts) {
            const checkoutItems = await database
                .get<CheckoutItem>('checkout_items')
                .query(Q.where('checkout_id', checkout.id))
                .fetch();

            productCount += checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
            totalPrice += checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }

        return {
            productCount,
            totalPrice,
        };
    } catch (error) {
        console.error('Error fetching checkouts by month:', error);
        return {
            productCount: 0,
            totalPrice: 0,
        };
    }
};
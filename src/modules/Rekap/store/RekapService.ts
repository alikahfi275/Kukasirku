import { Q } from '@nozbe/watermelondb';
import { database } from '../../../app/database';
import Checkout from '../../../app/database/model/Checkout';
import CheckoutItem from '../../../app/database/model/CheckoutItem';

interface ItemSummary {
    count: number;
    totalPrice: number;
}

interface MonthlySummary {
    productCount: number;
    totalPrice: number;
    itemSummaries: Record<string, ItemSummary>;
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
        const itemSummaries: Record<string, ItemSummary> = {};

        for (const checkout of checkouts) {
            const checkoutItems = await database
                .get<CheckoutItem>('checkout_items')
                .query(Q.where('checkout_id', checkout.id))
                .fetch();

            for (const item of checkoutItems) {
                if (!itemSummaries[item.name]) {
                    itemSummaries[item.name] = { count: 0, totalPrice: 0 };
                }

                itemSummaries[item.name].count += item.quantity;
                itemSummaries[item.name].totalPrice += item.price * item.quantity;

                productCount += item.quantity;
                totalPrice += item.price * item.quantity;
            }
        }

        return {
            productCount,
            totalPrice,
            itemSummaries,
        };
    } catch (error) {
        return {
            productCount: 0,
            totalPrice: 0,
            itemSummaries: {},
        };
    }
};

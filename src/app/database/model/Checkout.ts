import { Model } from '@nozbe/watermelondb';
import { field, date, children } from '@nozbe/watermelondb/decorators';
import CheckoutItem from './CheckoutItem';

class Checkout extends Model {
    static table = 'checkouts';

    @field('order_id') orderId!: string;
    @field('total_price') totalPrice!: number;
    @date('date') date!: Date;
    @children('checkout_items') items!: CheckoutItem[];
}

export default Checkout;

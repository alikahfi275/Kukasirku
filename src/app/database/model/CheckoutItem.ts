import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';
import Checkout from './Checkout';

class CheckoutItem extends Model {
    static table = 'checkout_items';

    @field('name') name!: string;
    @field('price') price!: number;
    @field('quantity') quantity!: number;
    @relation('checkouts', 'checkout_id') checkout!: Checkout;
}

export default CheckoutItem;

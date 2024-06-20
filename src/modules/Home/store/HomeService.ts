import { database } from '../../../app/database';
import Product from '../../../app/database/model/Product';
import Checkout from '../../../app/database/model/Checkout';
import CheckoutItem from '../../../app/database/model/CheckoutItem';
import { useCartStore } from '../../../modules/Home/store/useHomeStore';
import { generateRandomOrderId } from '../../../property/helpers/Helpers';
import { AlertSuccsess } from '../../../components/molecules/CSweetAlert';

export const handleCheckout = async () => {
    const { cart, clearCart } = useCartStore.getState();

    if (cart.length === 0) {
        console.warn('Cart is empty, cannot proceed with checkout.');
        return;
    }

    try {
        await database.write(async () => {
            const orderId = generateRandomOrderId();
            const totalPrice = cart.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0,
            );
            const date = new Date();

            // Create a new checkout
            const newCheckout = await database
                .get<Checkout>('checkouts')
                .create(checkout => {
                    checkout.orderId = orderId;
                    checkout.totalPrice = totalPrice;
                    checkout.date = date;
                });

            // Create checkout items
            for (const item of cart) {
                await database
                    .get<CheckoutItem>('checkout_items')
                    .create(checkoutItem => {
                        checkoutItem.name = item.name;
                        checkoutItem.price = item.price;
                        checkoutItem.quantity = item.quantity;
                        checkoutItem.checkout.set(newCheckout);
                    });
            }
        });
        AlertSuccsess('Checkout Berhasil');

        clearCart(); // Clear the cart after successful checkout
    } catch (error) {
        console.error('Error during checkout:', error);
    }
};

export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        return await database.get<Product>('products').find(id);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        return await database.get<Product>('products').query().fetch();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};




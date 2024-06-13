// services/ProductService.ts
import {database} from '../../app/database';
import Product from '../../app/database/model/Product';
import Checkout from '../../app/database/model/Checkout';
import CheckoutItem from '../../app/database/model/CheckoutItem';
import {useCartStore} from '../../modules/Home/store/useHomeStore';
import {Q} from '@nozbe/watermelondb';
import {generateRandomOrderId} from '../../property/helpers/Helpers';
import {AlertSuccsess} from './CSweetAlert';

export const handleCheckout = async () => {
  const {cart, clearCart} = useCartStore.getState();

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
export const getAllCheckouts = async (): Promise<Checkout[]> => {
  try {
    const checkouts = await database.get<Checkout>('checkouts').query().fetch();
    return checkouts;
  } catch (error) {
    console.error('Error fetching checkouts:', error);
    throw error;
  }
};

export const getCheckoutItemsByCheckoutId = async (
  checkoutId: string,
): Promise<CheckoutItem[]> => {
  try {
    if (!checkoutId) {
      throw new Error('Checkout ID is required');
    }
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

export const createProduct = async (
  name: string,
  price: number,
  description: string,
  imageUrl: string,
): Promise<void> => {
  try {
    await database.write(async () => {
      await database.get<Product>('products').create(product => {
        product.name = name;
        product.price = price;
        product.description = description;
        product.imageUrl = imageUrl;
      });
    });
  } catch (error) {
    console.error('Error creating product:', error);
    throw error; // Rethrow the error for handling by the caller
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

export const updateProduct = async (
  id: string,
  name: string,
  price: number,
  description: string,
  imageUrl: string,
): Promise<void> => {
  try {
    const product = await database.get<Product>('products').find(id);
    await database.write(async () => {
      await product.update(prod => {
        prod.name = name;
        prod.price = price;
        prod.description = description;
        prod.imageUrl = imageUrl;
      });
    });
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const product = await database.get<Product>('products').find(id);
    await database.write(async () => {
      await product.destroyPermanently();
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

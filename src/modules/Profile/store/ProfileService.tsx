import {database} from '../../../app/database';
import Product from '../../../app/database/model/Product';
import StoreProfile from '../../../app/database/model/StoreProfile';
import {AlertError} from '../../../components';

export const getStoreProfile = async (): Promise<StoreProfile | null> => {
  try {
    const profiles = await database
      .get<StoreProfile>('store_profiles')
      .query()
      .fetch();
    return profiles.length > 0 ? profiles[0] : null;
  } catch (error) {
    console.error('Error fetching store profile:', error);
    return null;
  }
};

export const createStoreProfile = async (
  photoUrl: string,
  storeName: string,
  storePhone: string,
  storeAddress: string,
): Promise<void> => {
  try {
    await database.write(async () => {
      await database.get<StoreProfile>('store_profiles').create(profile => {
        profile.photoUrl = photoUrl;
        profile.storeName = storeName;
        profile.storePhone = storePhone;
        profile.storeAddress = storeAddress;
      });
    });
  } catch (error) {
    AlertError('Gagal membuat data profil');
  }
};

export const updateStoreProfile = async (
  id: string,
  photoUrl: string,
  storeName: string,
  storePhone: string,
  storeAddress: string,
): Promise<void> => {
  try {
    const profile = await database.get<StoreProfile>('store_profiles').find(id);
    if (profile) {
      await database.write(async () => {
        await profile.update(prof => {
          prof.photoUrl = photoUrl;
          prof.storeName = storeName;
          prof.storePhone = storePhone;
          prof.storeAddress = storeAddress;
        });
      });
    }
  } catch (error) {}
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

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    return await database.get<Product>('products').query().fetch();
  } catch (error) {
    console.error('Error fetching products:', error);
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

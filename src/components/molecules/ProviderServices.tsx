// services/ProductService.ts
import {database} from '../../app/database';
import Product from '../../app/database/model/Product';

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

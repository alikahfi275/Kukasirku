// database/model/Product.ts
import { Model } from '@nozbe/watermelondb';
import { field, text } from '@nozbe/watermelondb/decorators';

class Product extends Model {
    static table = 'products';

    @field('name') name!: string;
    @field('price') price!: number;
    @text('description') description!: string;
    @field('imageUrl') imageUrl!: string;
}

export default Product;
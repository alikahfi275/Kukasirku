// app/database/model/StoreProfile.ts
import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class StoreProfile extends Model {
    static table = 'store_profiles';

    @field('photo_url') photoUrl;
    @field('store_name') storeName;
    @field('store_phone') storePhone;
    @field('store_address') storeAddress;
}

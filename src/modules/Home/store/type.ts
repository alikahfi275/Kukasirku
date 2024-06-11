export interface Product {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
}
export interface HomeProps {
    filteredProducts: Product[];

}

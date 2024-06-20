export interface Product {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
}
export interface HomeComponentProps {
    filteredProducts: Product[];

}

export interface DetailProductComponentProps {
    item: any;
}


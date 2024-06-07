export interface AddProductContainerProps {
    id?: string;
    initialName?: string;
    initialPrice?: string;
    initialDescription?: string;
    initialImageUrl?: string;
    onSubmit: () => void;
}

export interface AddProductComponentProps {
    openFile: () => void;
    handleSubmit: () => Promise<void>;
    fotoProduct: string;
    name: string;
    price: number;
    description: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setPrice: React.Dispatch<React.SetStateAction<number>>;
    setDescription: React.Dispatch<React.SetStateAction<string>>;


}

export interface EditDetailProductProps {
    onSubmit: (product: {
        name: string;
        price: number;
        description: string;
        imageUrl: string;
    }) => void;
    openFile: () => void;
    changeFotoProduct: (imageUri: string) => void;
    handleUpdate: (
        id: string,
        name: string,
        price: number,
        description: string,
        imageUrl: string,
    ) => void;
}

export type RootStackParamList = {
    EditDetailProduct: {
        item: {
            id: string;
            name: string;
            price: string;
            description: string;
            imageUrl: string;
        };
    };
};

export interface EditDetailContainerProps {
    onSubmit: () => void;
    changeFotoProduct: (imageUri: string) => void;
}

export interface Item {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
}

export interface EditProductContainerProps {
    products: Item[];
}


export interface itemDeleteProduct {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    description: string;
}

export interface DeleteProductComponentProps {
    products: itemDeleteProduct[];
}
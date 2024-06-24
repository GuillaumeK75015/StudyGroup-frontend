export interface Category {
    id: string;
    name: string;
}

export type CategoryCreateInput = Omit<Category, "id">

export type CategoryCreateInputWithIsActive = 
Omit<Category, "id"> & { 
    isActive: boolean;
};
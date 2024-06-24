import { Category } from "./category";

export interface Event {
    id: string;
    title: string;
    content: string;
    createdDate: Date;
    category: Category;
}

export type EventCreateInput = Omit<Event, "id" | "createdDate" | "category"  > & {
    categoryId: string
}
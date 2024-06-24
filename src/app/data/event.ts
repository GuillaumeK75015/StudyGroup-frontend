import { Category } from "./category";

export interface Event {
    id: string;
    title: string;
    content: string;
    createdDate: Date;
    dateTime: Date;
    category: Category;
}

export type EventCreateInput = Omit<Event, "id" | "dateTime" | "category"  > & {
    categoryId: string
}

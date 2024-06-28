import { Category } from "./category";

export interface Review {
    rating: number;
    review: string;
    reviewerName: string;
}

export interface Event {
    id: string;
    title: string;
    content: string;
    createdDate: Date;
    dateTime: Date;
    category: Category;
    location: string;
    creatorName: string;
    lastModifiedBy?: string;
    participants: string[];
    reviews: Review[];
}

export type EventCreateInput = Omit<Event, "id" | "dateTime" | "category" | "reviews"> & {
    categoryId: string;
    dateTime: string;
};

//inventrory data and type
export interface InventoryItem{
    id: string;
    name: string;
    quantity: number;
    price: number;
}

//DTO
export type createItemRequest = Omit<InventoryItem, "id">;
export type updateItemRequest = Partial<createItemRequest>;

export interface ApiResponse <T> {
    success: boolean;
    data?: T;
    error?: string;
}


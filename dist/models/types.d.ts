export interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}
export type createItemRequest = Omit<InventoryItem, "id">;
export type updateItemRequest = Partial<createItemRequest>;
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
//# sourceMappingURL=types.d.ts.map
import type { InventoryRepository } from "../repository/inventory.repo.js";
import type { createItemRequest, updateItemRequest, ApiResponse, InventoryItem } from "../models/types.js";
export declare class InventoryService {
    private repo;
    constructor(repo: InventoryRepository);
    addItem(item: createItemRequest): Promise<ApiResponse<InventoryItem>>;
    getAll(): Promise<ApiResponse<InventoryItem[]>>;
    updateStock(id: string, qtyChange: number): Promise<ApiResponse<InventoryItem>>;
    getById(id: string): Promise<ApiResponse<InventoryItem>>;
    updateItem(id: string, updates: updateItemRequest): Promise<ApiResponse<InventoryItem>>;
    removeItem(id: string): Promise<ApiResponse<string>>;
}
//# sourceMappingURL=inventory.services.d.ts.map
import type { InventoryItem, createItemRequest, updateItemRequest } from "../models/types.js";
export interface InventoryRepository {
    create(item: createItemRequest): Promise<InventoryItem>;
    findAll(): Promise<InventoryItem[]>;
    findById(id: string): Promise<InventoryItem | null>;
    update(id: string, updates: updateItemRequest): Promise<InventoryItem | null>;
    delete(id: string): Promise<boolean>;
}
export declare class InMemoryInventoryRepository implements InventoryRepository {
    private db;
    private wait;
    create(item: createItemRequest): Promise<InventoryItem>;
    findAll(): Promise<InventoryItem[]>;
    findById(id: string): Promise<InventoryItem | null>;
    update(id: string, updates: updateItemRequest): Promise<InventoryItem | null>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=inventory.repo.d.ts.map
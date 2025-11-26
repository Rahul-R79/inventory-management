import type { InventoryRepository } from "../repository/inventory.repo.js";
import type {
    createItemRequest,
    updateItemRequest,
    ApiResponse,
    InventoryItem,
} from "../models/types.js";

export class InventoryService {
    constructor(private repo: InventoryRepository) {}

    async addItem(
        item: createItemRequest
    ): Promise<ApiResponse<InventoryItem>> {
        if (item.price < 0) {
            return { success: false, error: "Price cannot be negative" };
        }

        const data = await this.repo.create(item);
        return { success: true, data };
    }

    async getAll(): Promise<ApiResponse<InventoryItem[]>> {
        const data = await this.repo.findAll();
        return { success: true, data };
    }

    async updateStock(
        id: string,
        qtyChange: number
    ): Promise<ApiResponse<InventoryItem>> {
        const item = await this.repo.findById(id);

        if (!item) {
            return { success: false, error: "Item not found" };
        }

        const newQty = item.quantity + qtyChange;
        if (newQty < 0) {
            return {
                success: false,
                error: `Insufficient stock. Current Stock: ${item.quantity}`,
            };
        }

        const updated = await this.repo.update(id, { quantity: newQty });
        return { success: true, data: updated! };
    }

    async getById(id: string): Promise<ApiResponse<InventoryItem>> {
        const item = await this.repo.findById(id);

        if (!item) {
            return { success: false, error: "Item not found" };
        }

        return { success: true, data: item };
    }

    async updateItem(
        id: string,
        updates: updateItemRequest
    ): Promise<ApiResponse<InventoryItem>> {
        if (updates.price !== undefined && updates.price < 0) {
            return { success: false, error: "Price cannot be negative" };
        }

        if (updates.quantity !== undefined && updates.quantity < 0) {
            return { success: false, error: "Quantity cannot be negative" };
        }

        const updated = await this.repo.update(id, updates);

        if (!updated) {
            return { success: false, error: "Item not found" };
        }

        return { success: true, data: updated };
    }

    async removeItem(id: string): Promise<ApiResponse<string>> {
        const item = await this.repo.findById(id);
        if (!item) {
            return { success: false, error: "Item not found" };
        }

        await this.repo.delete(id);
        return { success: true, data: "Item deleted" };
    }
}

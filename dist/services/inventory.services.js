export class InventoryService {
    constructor(repo) {
        this.repo = repo;
    }
    async addItem(item) {
        if (item.price < 0) {
            return { success: false, error: "Price cannot be negative" };
        }
        const data = await this.repo.create(item);
        return { success: true, data };
    }
    async getAll() {
        const data = await this.repo.findAll();
        return { success: true, data };
    }
    async updateStock(id, qtyChange) {
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
        return { success: true, data: updated };
    }
    async getById(id) {
        const item = await this.repo.findById(id);
        if (!item) {
            return { success: false, error: "Item not found" };
        }
        return { success: true, data: item };
    }
    async updateItem(id, updates) {
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
    async removeItem(id) {
        const item = await this.repo.findById(id);
        if (!item) {
            return { success: false, error: "Item not found" };
        }
        await this.repo.delete(id);
        return { success: true, data: "Item deleted" };
    }
}
//# sourceMappingURL=inventory.services.js.map
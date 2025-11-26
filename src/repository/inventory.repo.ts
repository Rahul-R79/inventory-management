import type {
    InventoryItem,
    createItemRequest,
    updateItemRequest,
} from "../models/types.js";

export interface InventoryRepository {
    create(item: createItemRequest): Promise<InventoryItem>;
    findAll(): Promise<InventoryItem[]>;
    findById(id: string): Promise<InventoryItem | null>;
    update(
        id: string,
        updates: updateItemRequest
    ): Promise<InventoryItem | null>;
    delete(id: string): Promise<boolean>;
}

export class InMemoryInventoryRepository implements InventoryRepository {
    private db: InventoryItem[] = [];

    private async wait(): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, 300));
    }

    async create(item: createItemRequest): Promise<InventoryItem> {
        await this.wait();
        const newItem: InventoryItem = {
            id: Math.floor(Math.random() * 10000).toString(),
            ...item,
        };
        this.db.push(newItem);
        return newItem;
    }

    async findAll(): Promise<InventoryItem[]> {
        await this.wait();
        return [...this.db];
    }

    async findById(id: string): Promise<InventoryItem | null> {
        await this.wait();
        return this.db.find((i) => i.id === id) || null;
    }

    async update(
        id: string,
        updates: updateItemRequest
    ): Promise<InventoryItem | null> {
        await this.wait();
        const index = this.db.findIndex((i) => i.id === id);
        if (index === -1) return null;

        const currentItem = this.db[index];
        if (!currentItem) return null;

        this.db[index] = { ...currentItem, ...updates };
        return this.db[index];
    }

    async delete(id: string): Promise<boolean> {
        await this.wait();
        const initialLen = this.db.length;
        this.db = this.db.filter((i) => i.id !== id);
        return this.db.length !== initialLen;
    }
}

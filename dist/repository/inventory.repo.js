export class InMemoryInventoryRepository {
    constructor() {
        this.db = [];
    }
    async wait() {
        return new Promise((resolve) => setTimeout(resolve, 300));
    }
    async create(item) {
        await this.wait();
        const newItem = {
            id: Math.floor(Math.random() * 10000).toString(),
            ...item,
        };
        this.db.push(newItem);
        return newItem;
    }
    async findAll() {
        await this.wait();
        return [...this.db];
    }
    async findById(id) {
        await this.wait();
        return this.db.find((i) => i.id === id) || null;
    }
    async update(id, updates) {
        await this.wait();
        const index = this.db.findIndex((i) => i.id === id);
        if (index === -1)
            return null;
        const currentItem = this.db[index];
        if (!currentItem)
            return null;
        this.db[index] = { ...currentItem, ...updates };
        return this.db[index];
    }
    async delete(id) {
        await this.wait();
        const initialLen = this.db.length;
        this.db = this.db.filter((i) => i.id !== id);
        return this.db.length !== initialLen;
    }
}
//# sourceMappingURL=inventory.repo.js.map
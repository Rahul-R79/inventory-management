import readline from "readline";
import { InMemoryInventoryRepository } from "./repository/inventory.repo.js";
import { InventoryService } from "./services/inventory.services.js";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function question(query) {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
}
const repository = new InMemoryInventoryRepository();
const service = new InventoryService(repository);
async function showMenu() {
    console.log("INVENTORY MANAGEMENT SYSTEM");
    console.log("1. Add New Item");
    console.log("2. View All Items");
    console.log("3. Search Item by ID");
    console.log("4. Update Item Details");
    console.log("5. Update Stock Quantity");
    console.log("6. Delete Item");
    console.log("7. Exit");
}
async function addItem() {
    var _a, _b, _c, _d;
    console.log("\n ADD NEW ITEM");
    const name = await question("Enter item name: ");
    const priceInput = await question("Enter price: ");
    const quantityInput = await question("Enter quantity: ");
    const price = parseFloat(priceInput);
    const quantity = parseInt(quantityInput);
    if (isNaN(price) || isNaN(quantity)) {
        console.log("Invalid input! Price and quantity must be numbers.");
        return;
    }
    const result = await service.addItem({ name, price, quantity });
    if (result.success) {
        console.log('Item added successfully!');
        console.log(`ID: ${(_a = result.data) === null || _a === void 0 ? void 0 : _a.id}`);
        console.log(`Name: ${(_b = result.data) === null || _b === void 0 ? void 0 : _b.name}`);
        console.log(`Price: ${(_c = result.data) === null || _c === void 0 ? void 0 : _c.price}`);
        console.log(`Quantity: ${(_d = result.data) === null || _d === void 0 ? void 0 : _d.quantity}`);
    }
    else {
        console.log(`Error: ${result.error}`);
    }
}
async function viewAllItems() {
    console.log("\n ALL INVENTORY ITEMS");
    const result = await service.getAll();
    if (result.success && result.data && result.data.length > 0) {
        console.table(result.data);
        console.log(`\n Total Items: ${result.data.length}`);
    }
    else {
        console.log("No items in inventory.");
    }
}
async function searchById() {
    console.log("\n SEARCH ITEM BY ID");
    const id = await question("Enter item ID: ");
    const result = await service.getById(id);
    if (result.success && result.data) {
        console.log("Item Found:");
        console.log(`ID: ${result.data.id}`);
        console.log(`Name: ${result.data.name}`);
        console.log(`Price: ${result.data.price}`);
        console.log(`Quantity: ${result.data.quantity}`);
    }
    else {
        console.log(`${result.error}`);
    }
}
async function updateItem() {
    var _a, _b, _c, _d, _e, _f;
    console.log("\n UPDATE ITEM DETAILS");
    const id = await question("Enter item ID to update: ");
    const existing = await service.getById(id);
    if (!existing.success) {
        console.log(`${existing.error}`);
        return;
    }
    console.log("\n Current Details:");
    console.log(`Name: ${(_a = existing.data) === null || _a === void 0 ? void 0 : _a.name}`);
    console.log(`Price: ${(_b = existing.data) === null || _b === void 0 ? void 0 : _b.price}`);
    console.log(`Quantity: ${(_c = existing.data) === null || _c === void 0 ? void 0 : _c.quantity}`);
    console.log("\n Leave blank to keep current value");
    const name = await question("New name: ");
    const priceInput = await question("New price: ");
    const quantityInput = await question("New quantity: ");
    const updates = {};
    if (name.trim())
        updates.name = name;
    if (priceInput.trim()) {
        const price = parseFloat(priceInput);
        if (!isNaN(price))
            updates.price = price;
    }
    if (quantityInput.trim()) {
        const quantity = parseInt(quantityInput);
        if (!isNaN(quantity))
            updates.quantity = quantity;
    }
    if (Object.keys(updates).length === 0) {
        console.log("! No changes made.");
        return;
    }
    const result = await service.updateItem(id, updates);
    if (result.success) {
        console.log("\ Item updated successfully!");
        console.log(`Name: ${(_d = result.data) === null || _d === void 0 ? void 0 : _d.name}`);
        console.log(`Price: $${(_e = result.data) === null || _e === void 0 ? void 0 : _e.price}`);
        console.log(`Quantity: ${(_f = result.data) === null || _f === void 0 ? void 0 : _f.quantity}`);
    }
    else {
        console.log(`Error: ${result.error}`);
    }
}
async function updateStock() {
    var _a, _b, _c;
    console.log("\n UPDATE STOCK QUANTITY");
    const id = await question("Enter item ID: ");
    const existing = await service.getById(id);
    if (!existing.success) {
        console.log(`${existing.error}`);
        return;
    }
    console.log(`\n Current Stock: ${(_a = existing.data) === null || _a === void 0 ? void 0 : _a.quantity}`);
    const changeInput = await question("Enter change (+10 to add, -5 to remove): ");
    const change = parseInt(changeInput);
    if (isNaN(change)) {
        console.log("Invalid input! Must be a number.");
        return;
    }
    const result = await service.updateStock(id, change);
    if (result.success) {
        console.log(`\n Stock updated successfully!`);
        console.log(`Previous: ${(_b = existing.data) === null || _b === void 0 ? void 0 : _b.quantity}`);
        console.log(`Change: ${change > 0 ? "+" : ""}${change}`);
        console.log(`New Stock: ${(_c = result.data) === null || _c === void 0 ? void 0 : _c.quantity}`);
    }
    else {
        console.log(`Error: ${result.error}`);
    }
}
async function deleteItem() {
    var _a, _b;
    console.log("\n DELETE ITEM");
    const id = await question("Enter item ID to delete: ");
    const existing = await service.getById(id);
    if (!existing.success) {
        console.log(`${existing.error}`);
        return;
    }
    console.log(`\n You are about to delete:`);
    console.log(`ID: ${(_a = existing.data) === null || _a === void 0 ? void 0 : _a.id}`);
    console.log(`Name: ${(_b = existing.data) === null || _b === void 0 ? void 0 : _b.name}`);
    const confirm = await question("Are you sure? (yes/no): ");
    if (confirm.toLowerCase() !== "yes") {
        console.log("Deletion cancelled.");
        return;
    }
    const result = await service.removeItem(id);
    if (result.success) {
        console.log(`\n ${result.data}`);
    }
    else {
        console.log(`Error: ${result.error}`);
    }
}
async function main() {
    let running = true;
    while (running) {
        await showMenu();
        const choice = await question("\n Enter your choice (1-7): ");
        switch (choice.trim()) {
            case "1":
                await addItem();
                break;
            case "2":
                await viewAllItems();
                break;
            case "3":
                await searchById();
                break;
            case "4":
                await updateItem();
                break;
            case "5":
                await updateStock();
                break;
            case "6":
                await deleteItem();
                break;
            case "7":
                running = false;
                break;
            default:
                console.log("Invalid choice! Please enter 1-7.");
        }
    }
    rl.close();
}
main();
//# sourceMappingURL=cli.js.map
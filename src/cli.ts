import readline from "readline";
import { InMemoryInventoryRepository } from "./repository/inventory.repo.js";
import { InventoryService } from "./services/inventory.services.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function question(query: string): Promise<string> {
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
        console.log(`ID: ${result.data?.id}`);
        console.log(`Name: ${result.data?.name}`);
        console.log(`Price: ${result.data?.price}`);
        console.log(`Quantity: ${result.data?.quantity}`);
    } else {
        console.log(`Error: ${result.error}`);
    }
}

async function viewAllItems() {
    console.log("\n ALL INVENTORY ITEMS");

    const result = await service.getAll();

    if (result.success && result.data && result.data.length > 0) {
        console.table(result.data);
        console.log(`\n Total Items: ${result.data.length}`);
    } else {
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
    } else {
        console.log(`${result.error}`);
    }
}

async function updateItem() {
    console.log("\n UPDATE ITEM DETAILS");

    const id = await question("Enter item ID to update: ");

    const existing = await service.getById(id);
    if (!existing.success) {
        console.log(`${existing.error}`);
        return;
    }

    console.log("\n Current Details:");
    console.log(`Name: ${existing.data?.name}`);
    console.log(`Price: ${existing.data?.price}`);
    console.log(`Quantity: ${existing.data?.quantity}`);

    console.log("\n Leave blank to keep current value");

    const name = await question("New name: ");
    const priceInput = await question("New price: ");
    const quantityInput = await question("New quantity: ");

    const updates: any = {};

    if (name.trim()) updates.name = name;
    if (priceInput.trim()) {
        const price = parseFloat(priceInput);
        if (!isNaN(price)) updates.price = price;
    }
    if (quantityInput.trim()) {
        const quantity = parseInt(quantityInput);
        if (!isNaN(quantity)) updates.quantity = quantity;
    }

    if (Object.keys(updates).length === 0) {
        console.log("! No changes made.");
        return;
    }

    const result = await service.updateItem(id, updates);

    if (result.success) {
        console.log("\ Item updated successfully!");
        console.log(`Name: ${result.data?.name}`);
        console.log(`Price: $${result.data?.price}`);
        console.log(`Quantity: ${result.data?.quantity}`);
    } else {
        console.log(`Error: ${result.error}`);
    }
}

async function updateStock() {
    console.log("\n UPDATE STOCK QUANTITY");

    const id = await question("Enter item ID: ");

    const existing = await service.getById(id);
    if (!existing.success) {
        console.log(`${existing.error}`);
        return;
    }

    console.log(`\n Current Stock: ${existing.data?.quantity}`);
    const changeInput = await question(
        "Enter change (+10 to add, -5 to remove): "
    );

    const change = parseInt(changeInput);
    if (isNaN(change)) {
        console.log("Invalid input! Must be a number.");
        return;
    }

    const result = await service.updateStock(id, change);

    if (result.success) {
        console.log(`\n Stock updated successfully!`);
        console.log(`Previous: ${existing.data?.quantity}`);
        console.log(`Change: ${change > 0 ? "+" : ""}${change}`);
        console.log(`New Stock: ${result.data?.quantity}`);
    } else {
        console.log(`Error: ${result.error}`);
    }
}

async function deleteItem() {
    console.log("\n DELETE ITEM");

    const id = await question("Enter item ID to delete: ");

    const existing = await service.getById(id);
    if (!existing.success) {
        console.log(`${existing.error}`);
        return;
    }

    console.log(`\n You are about to delete:`);
    console.log(`ID: ${existing.data?.id}`);
    console.log(`Name: ${existing.data?.name}`);

    const confirm = await question("Are you sure? (yes/no): ");

    if (confirm.toLowerCase() !== "yes") {
        console.log("Deletion cancelled.");
        return;
    }

    const result = await service.removeItem(id);

    if (result.success) {
        console.log(`\n ${result.data}`);
    } else {
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

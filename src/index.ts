import { InMemoryInventoryRepository } from "./repository/inventory.repo.js";
import { InventoryService } from "./services/inventory.services.js";

async function main() {
    // 1. Setup Dependencies
    const repository = new InMemoryInventoryRepository();
    const services = new InventoryService(repository);

    // 2. Add Data
    console.log("\n1. Adding Laptop...");
    const laptopRes = await services.addItem({
        name: "Lenova",
        price: 1500,
        quantity: 10,
    });
    console.log(
        laptopRes.success
            ? `Created ID: ${laptopRes.data?.id}`
            : laptopRes.error
    );

    const laptopId = laptopRes.data?.id;

    // 3. View Data
    console.log("\n2. Fetching All Items...");
    const allItems = await services.getAll();
    console.table(allItems.data);

    // 4. Modify Data
    if (laptopId) {
        console.log("\n3. Selling 3 Laptops...");
        const sellRes = await services.updateStock(laptopId, -3);
        console.log(
            sellRes.success
                ? `New Stock: ${sellRes.data?.quantity}`
                : sellRes.error
        );

        console.log("\n4. Trying to sell 50 Laptops! its failed.");
        const failRes = await services.updateStock(laptopId, -50);
        console.log(failRes.success ? "Sold" : `Error: ${failRes.error}`);

        // 5. Delete Data
        console.log("\n5. Deleting the laptop...");
        const deleteRes = await services.removeItem(laptopId);
        console.log(deleteRes.success ? deleteRes.data : deleteRes.error);
    }
}

main();

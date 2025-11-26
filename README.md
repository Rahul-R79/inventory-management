# 📦 Inventory Management System

A TypeScript-based inventory management system with full CRUD operations and **interactive CLI**.

## ✨ Features

✅ **CREATE** - Add new inventory items  
✅ **READ** - Fetch all items or get by ID  
✅ **UPDATE** - Update item details or stock quantity  
✅ **DELETE** - Remove items from inventory  
✅ **Interactive CLI** - Manage inventory through console menus

## 🚀 How to Run

### **Interactive Mode** (Recommended)
Run the interactive CLI to add, edit, delete, and view items through a menu:

```bash
npm run dev
```

This will show you a menu like this:
```
========================================
📦 INVENTORY MANAGEMENT SYSTEM
========================================
1. ➕ Add New Item
2. 📋 View All Items
3. 🔍 Search Item by ID
4. ✏️  Update Item Details
5. 📊 Update Stock Quantity
6. 🗑️  Delete Item
7. 🚪 Exit
========================================
```

### **Demo Mode**
Run the pre-programmed demo to see all CRUD operations:

```bash
npm start
```

This runs a demo script that automatically creates, reads, updates, and deletes items.

## 📋 Interactive CLI Operations

### 1. ➕ **Add New Item**
- Enter item name, price, and quantity
- System generates a unique ID automatically
- Validates that price and quantity are valid numbers

### 2. 📋 **View All Items**
- Displays all inventory items in a table format
- Shows ID, name, price, and quantity for each item
- Displays total count of items

### 3. 🔍 **Search Item by ID**
- Enter an item ID to view its details
- Shows complete information if found
- Error message if item doesn't exist

### 4. ✏️  **Update Item Details**
- Enter item ID to update
- Shows current values
- Update name, price, and/or quantity
- Leave fields blank to keep current values
- Validates price and quantity are non-negative

### 5. 📊 **Update Stock Quantity**
- Enter item ID
- Shows current stock level
- Add stock with positive numbers (+10)
- Remove stock with negative numbers (-5)
- Prevents stock from going below zero

### 6. 🗑️  **Delete Item**
- Enter item ID to delete
- Shows item details for confirmation
- Type "yes" to confirm deletion
- Permanently removes item from inventory

### 7. 🚪 **Exit**
- Closes the application

## 💻 Usage Examples

### Adding an Item
```
Enter item name: Laptop
Enter price: $1500
Enter quantity: 10

✅ Item added successfully!
   ID: 5320
   Name: Laptop
   Price: $1500
   Quantity: 10
```

### Updating Stock
```
Enter item ID: 5320
📦 Current Stock: 10
Enter change (+10 to add, -5 to remove): -3

✅ Stock updated successfully!
   Previous: 10
   Change: -3
   New Stock: 7
```

### Viewing All Items
```
┌─────────┬────────┬──────────────────┬───────┬──────────┐
│ (index) │   id   │       name       │ price │ quantity │
├─────────┼────────┼──────────────────┼───────┼──────────┤
│    0    │ '5320' │     'Laptop'     │ 1500  │    7     │
│    1    │ '8942' │     'Mouse'      │  99   │    25    │
└─────────┴────────┴──────────────────┴───────┴──────────┘

Total Items: 2
```

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run interactive CLI mode |
| `npm start` | Run demo mode |
| `npm run build` | Compile TypeScript to JavaScript |

## 📁 Project Structure

```
src/
├── cli.ts                        # Interactive CLI application
├── index.ts                      # Demo script
├── models/
│   └── types.ts                  # TypeScript types & interfaces
├── repository/
│   └── inventory.repo.ts         # Data access layer (in-memory DB)
└── services/
    └── inventory.services.ts     # Business logic layer
```

## 🏗️ Architecture

The project follows a **layered architecture**:

1. **Repository Layer** (`inventory.repo.ts`)
   - Handles data storage and retrieval
   - Uses in-memory array as database
   - Implements CRUD operations

2. **Service Layer** (`inventory.services.ts`)
   - Contains business logic
   - Validates input data
   - Handles error cases
   - Returns standardized API responses

3. **Application Layer** (`cli.ts` / `index.ts`)
   - User interface (CLI or demo)
   - Calls service methods
   - Displays results to user

## 🔧 Technologies Used

- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment
- **ES Modules** - Modern module system
- **Readline** - Interactive console input

## 📝 Notes

- Data is stored **in-memory** and will be lost when the application closes
- IDs are randomly generated 4-digit numbers
- Stock cannot go below zero
- Prices and quantities must be non-negative

## 🎯 Next Steps

To make this production-ready, consider:
- [ ] Add persistent storage (database)
- [ ] Add authentication and authorization
- [ ] Create a REST API
- [ ] Build a web interface
- [ ] Add unit tests
- [ ] Implement logging

---

**Enjoy managing your inventory! 📦✨**

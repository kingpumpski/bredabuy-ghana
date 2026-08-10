export const PERMISSIONS = {
  // Products
  PRODUCTS_READ: "products.read",
  PRODUCTS_CREATE: "products.create",
  PRODUCTS_UPDATE: "products.update",
  PRODUCTS_DELETE: "products.delete",
  PRODUCTS_APPROVE: "products.approve",

  // Categories
  CATEGORIES_READ: "categories.read",
  CATEGORIES_CREATE: "categories.create",
  CATEGORIES_UPDATE: "categories.update",
  CATEGORIES_DELETE: "categories.delete",

  // Orders
  ORDERS_READ: "orders.read",
  ORDERS_CREATE: "orders.create",
  ORDERS_UPDATE: "orders.update",
  ORDERS_CANCEL: "orders.cancel",
  ORDERS_REFUND: "orders.refund",

  // Customers
  CUSTOMERS_READ: "customers.read",
  CUSTOMERS_CREATE: "customers.create",
  CUSTOMERS_UPDATE: "customers.update",
  CUSTOMERS_DELETE: "customers.delete",

  // Inventory
  INVENTORY_READ: "inventory.read",
  INVENTORY_CREATE: "inventory.create",
  INVENTORY_UPDATE: "inventory.update",
  INVENTORY_ADJUST: "inventory.adjust",
  INVENTORY_TRANSFER: "inventory.transfer",

  // Warehouse
  WAREHOUSE_READ: "warehouse.read",
  WAREHOUSE_RECEIVE: "warehouse.receive",
  WAREHOUSE_PICK: "warehouse.pick",
  WAREHOUSE_PACK: "warehouse.pack",
  WAREHOUSE_TRANSFER: "warehouse.transfer",

  // Sellers
  SELLERS_READ: "sellers.read",
  SELLERS_CREATE: "sellers.create",
  SELLERS_UPDATE: "sellers.update",
  SELLERS_APPROVE: "sellers.approve",
  SELLERS_SUSPEND: "sellers.suspend",

  // Finance
  FINANCE_READ: "finance.read",
  FINANCE_CREATE: "finance.create",
  FINANCE_UPDATE: "finance.update",
  FINANCE_APPROVE: "finance.approve",
  FINANCE_REFUND: "finance.refund",

  // Logistics
  LOGISTICS_READ: "logistics.read",
  LOGISTICS_ASSIGN: "logistics.assign",
  LOGISTICS_UPDATE: "logistics.update",
  LOGISTICS_MANAGE_DRIVERS: "logistics.manage_drivers",

  // Marketing
  MARKETING_READ: "marketing.read",
  MARKETING_CREATE: "marketing.create",
  MARKETING_UPDATE: "marketing.update",
  MARKETING_DELETE: "marketing.delete",

  // Users
  USERS_READ: "users.read",
  USERS_CREATE: "users.create",
  USERS_UPDATE: "users.update",
  USERS_DELETE: "users.delete",
  USERS_MANAGE_ROLES: "users.manage_roles",

  // Reports
  REPORTS_READ: "reports.read",
  REPORTS_EXPORT: "reports.export",

  // Settings
  SETTINGS_READ: "settings.read",
  SETTINGS_UPDATE: "settings.update",

  // CMS
  CMS_READ: "cms.read",
  CMS_CREATE: "cms.create",
  CMS_UPDATE: "cms.update",
  CMS_DELETE: "cms.delete",
} as const;

export type Permission =
  (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

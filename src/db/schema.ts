import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  description: text("description").notNull().default(""),
  image: text("image").notNull().default(""),
  sort: integer("sort").notNull().default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  sku: varchar("sku", { length: 60 }).notNull().unique(),
  name: varchar("name", { length: 220 }).notNull(),
  brand: varchar("brand", { length: 80 }).notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  description: text("description").notNull().default(""),
  price: integer("price").notNull(),
  oldPrice: integer("old_price"),
  stock: integer("stock").notNull().default(0),
  image: text("image").notNull(),
  images: jsonb("images").$type<string[]>().notNull().default([]),
  specs: jsonb("specs").$type<Record<string, string>>().notNull().default({}),
  compatibility: jsonb("compatibility").$type<string[]>().notNull().default([]),
  makes: text("makes").array().notNull().default([] as unknown as string[]),
  isFeatured: boolean("is_featured").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  author: varchar("author", { length: 120 }).notNull(),
  rating: integer("rating").notNull(),
  text: text("text").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 24 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  email: varchar("email", { length: 120 }),
  deliveryMethod: varchar("delivery_method", { length: 24 }).notNull(),
  address: text("address"),
  comment: text("comment"),
  payment: varchar("payment", { length: 24 }).notNull().default("cash"),
  subtotal: integer("subtotal").notNull(),
  delivery: integer("delivery").notNull().default(0),
  total: integer("total").notNull(),
  status: varchar("status", { length: 24 }).notNull().default("new"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id"),
  name: varchar("name", { length: 220 }).notNull(),
  sku: varchar("sku", { length: 60 }).notNull().default(""),
  price: integer("price").notNull(),
  qty: integer("qty").notNull(),
  image: text("image").notNull().default(""),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description").notNull().default(""),
  priceFrom: integer("price_from").notNull().default(0),
  free: boolean("free").notNull().default(false),
  durationMin: integer("duration_min"),
  icon: varchar("icon", { length: 60 }).notNull().default("Wrench"),
  sort: integer("sort").notNull().default(0),
});

export const serviceRequests = pgTable("service_requests", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  car: varchar("car", { length: 160 }),
  serviceId: integer("service_id"),
  vin: varchar("vin", { length: 32 }),
  message: text("message"),
  source: varchar("source", { length: 24 }).notNull().default("booking"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Service = typeof services.$inferSelect;

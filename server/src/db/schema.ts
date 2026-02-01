import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { desc, relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: text("id").primaryKey(), //use clerk id
    email: text("email").notNull().unique(),
    name: text("name"),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const products = pgTable("products", {
    id: uuid("id").primaryKey().defaultRandom(),
    title : text("title").notNull(),
    description : text("description").notNull(),
    imageUrl : text("image_url").notNull(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const comments = pgTable("comments", {
    id: uuid("id").primaryKey().defaultRandom(),
    content: text("content").notNull(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    productId: uuid("product_id").notNull().references(() => products.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    
});


// Define relations

// Users relation : A user can have manyb products and comments
// many() means one user can have many multiple records in the related table

export const userRelations = relations(users, ({ many }) => ({
    products: many(products), //one user -> many products
    comments: many(comments), //one user -> many comments
}));

// Products relation : A product belongs to one user and can have many comments

export const productsRelations = relations(products, ({ one, many }) => ({
    //fields: foreign key fields in this table
    //references: primary key fields in the related table
    user: one(users, {fields: [products.userId], references: [users.id]}), //one product -> one user
    comments: many(comments), //one product -> many comments
}));

// Comments relation : A comment belongs to one user and one product

export const commentsRelations = relations(comments, ({ one }) => ({
    user: one(users, {fields: [comments.userId], references: [users.id]}), //one comment -> one user
    product: one(products, {fields: [comments.productId], references: [products.id]}), //one comment -> one product
}));

//type inferences
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
const { text, pgTable, timestamp, serial } = require("drizzle-orm/pg-core");

const LeadTabel = pgTable("leads", {
  id: serial("id").primaryKey().notNull(),
  email: text("email").notNull(),
  description: text("description").default("This is a default description"),
  createdAt: timestamp("created_at").defaultNow(),
});

module.exports.LeadTabel = LeadTabel;
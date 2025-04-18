/**
 * Database seed script for Noevo
 *
 * This script clears the database and populates it with seed data from seed-data.ts
 * Run this script with: npm run seed-db
 */

import { PrismaClient } from "@prisma/client";
import { seedData, seedTagSettings } from "../lib/seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  try {
    // Clear existing data - delete in proper order to respect foreign key constraints
    console.log("Clearing existing data...");

    // Delete note shares first
    await prisma.noteShare.deleteMany();
    console.log("- Cleared note shares");

    // Delete notes
    await prisma.note.deleteMany();
    console.log("- Cleared notes");

    // Delete folders
    await prisma.folder.deleteMany();
    console.log("- Cleared folders");

    // Delete tag settings
    await prisma.tagSetting.deleteMany();
    console.log("- Cleared tag settings");

    // Now seed with fresh data
    console.log("\nAdding seed data...");

    // First create folders
    for (const [id, node] of Object.entries(seedData.treeData)) {
      if (node.type === "folder") {
        await prisma.folder.create({
          data: {
            id: node.id,
            name: node.name,
            parentId: node.parentId,
            // We'll add a test user ID - in a real app we'd use the authenticated user's ID
            userId: "test-user-id",
          },
        });
      }
    }
    console.log("- Created folders");

    // Then create notes
    for (const [id, node] of Object.entries(seedData.treeData)) {
      if (node.type === "note") {
        await prisma.note.create({
          data: {
            id: node.id,
            name: node.name,
            content: node.content,
            parentId: node.parentId,
            tags: node.tags,
            creationDate: new Date(node.creationDate),
            isPublic: node.isPublic || false,
            // We'll add a test user ID - in a real app we'd use the authenticated user's ID
            userId: "test-user-id",
          },
        });
      }
    }
    console.log("- Created notes");

    // Finally seed tag settings
    for (const tagSetting of seedTagSettings) {
      await prisma.tagSetting.create({
        data: {
          name: tagSetting.name,
          color: tagSetting.color,
          userId: "test-user-id",
        },
      });
    }
    console.log("- Created tag settings");

    console.log("\nDatabase seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

import { Prisma } from "@prisma/client";
import { db } from "../src/server/db";

async function seed() {
  try {
    console.log("Seeding database...");
    // Clear existing data
    await db.productImage.deleteMany();
    await db.productVariant.deleteMany();
    await db.product.deleteMany();
    await db.category.deleteMany();

    console.log("Database cleared.");

    console.log(
      "Seeding categories, products, product variants, and product images...",
    );
    const categories = await db.category.createMany({
      data: [
        {
          id: 1,
          name: "Headphones",
          slug: "headphones",
        },
        {
          id: 2,
          name: "Wireless Earbuds",
          slug: "wireless-earbuds",
        },
        {
          id: 3,
          name: "Accessories",
          slug: "accessories",
        },
        {
          id: 4,
          name: "Smartwatches",
          slug: "smartwatches",
        },
        {
          id: 5,
          name: "Cameras",
          slug: "cameras",
        },
        {
          id: 6,
          name: "Monitors",
          slug: "monitors",
        },
      ],
    });

    const products = await db.product.createMany({
      data: [
        {
          id: 1,
          name: "Over ear Headphones",
          description:
            "Over ear headphones with noise cancellation and high sound quality.",
          price: 199.99,
          slug: "over-ear-headphones",
          sku: "OEH-001",
          currency: "GBP",
          stock: 50,
          categoryId: 1,
        },
        {
          id: 2,
          name: "Gaming Mouse - Black",
          description:
            "High precision gaming mouse with customizable RGB lighting.",
          price: 49.99,
          slug: "gaming-mouse-black",
          sku: "GM-BLK-001",
          currency: "GBP",
          stock: 100,
          categoryId: 3,
        },
        {
          id: 3,
          name: "Wireless Earbuds - Black",
          description:
            "Wireless earbuds with touch controls and long battery life.",
          price: 129.99,
          slug: "wireless-earbuds-black",
          sku: "WE-BLK-001",
          currency: "GBP",
          stock: 75,
          categoryId: 2,
        },
        {
          id: 4,
          name: "Wireless charging pad",
          description:
            "Fast wireless charging pad compatible with all Qi-enabled devices.",
          price: 29.99,
          slug: "wireless-charging-pad",
          sku: "WCP-BLK-001",
          currency: "GBP",
          stock: 200,
          categoryId: 3,
        },
        {
          id: 5,
          name: "Smartwatch - Silver",
          description:
            "Smartwatch with fitness tracking, heart rate monitor, and GPS.",
          price: 249.99,
          slug: "smartwatch-silver",
          sku: "SW-SLV-001",
          currency: "GBP",
          stock: 30,
          categoryId: 4,
        },
        {
          id: 6,
          name: "Pro Monitor - 32 inch",
          description:
            "32 inch 4K monitor with HDR support and ultra-thin bezels.",
          price: 499.99,
          slug: "pro-monitor-32-inch",
          sku: "PM-32-001",
          currency: "GBP",
          stock: 20,
          categoryId: 6,
        },
        {
          id: 7,
          name: "DSLR Camera",
          description:
            "High-resolution DSLR camera with interchangeable lenses and 4K video recording.",
          price: 899.99,
          slug: "dslr-camera",
          sku: "DSLR-001",
          currency: "GBP",
          stock: 15,
          categoryId: 5,
        },
      ],
    });

    const productVariants = await db.productVariant.createMany({
      data: [
        {
          id: 1,
          productId: 1,
          name: "Over ear Headphones - Black",
          price: 199.99,
          sku: "OEH-001-BLK",
          currency: "GBP",
          stock: 50,
        },
        {
          id: 2,
          productId: 1,
          name: "Over ear Headphones - White",
          price: 189.99,
          sku: "OEH-001-WHT",
          currency: "GBP",
          stock: 20,
        },
      ],
    });

    const productImages = await db.productImage.createMany({
      data: [
        {
          id: 1,
          productId: 1,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/overear-headphones-8jJaXSAxrAP4Oogu5HTSmqGZv4BF4r.jpg",
          altText: "Over ear headphones - Black",
        },
        {
          id: 2,
          productId: 2,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/mouse-c2NsbCVHIOGhzDW2M526RtANPGMuU4.jpg",
          altText: "Gaming mouse - Black",
        },
        {
          id: 3,
          productId: 3,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/earbuds-nyoiE8cRatVVU2kaoDagmwBY4rllnY.jpg",
          altText: "Wireless earbuds - Black",
        },
        {
          id: 4,
          productId: 4,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/wireless-charger-f2noZUwEF95BcmhaU4SkPIIIZhMU7w.jpg",
          altText: "Wireless charging pad",
        },
        {
          id: 5,
          productId: 5,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/smartwatch-BINnVDgSIFBlkQuzzY9CcvWZ4kYs57.jpg",
          altText: "Smartwatch - Silver",
        },
        {
          id: 6,
          productId: 6,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/monitor-iENXW0bbeXycEjaWKCcvvOSl7maKOo.jpg",
          altText: "Pro Monitor - 32 inch",
        },
        {
          id: 7,
          productId: 7,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/camera-DReg2atT30oBVvhYT9EJCURCIp4cD1.jpg",
          altText: "DSLR Camera",
        },
        {
          id: 8,
          productId: 1,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/headphones-white-iGR9iXythwL0Y21c5T8wKqrEmfuiCp.jpg",
          altText: "Over ear headphones - White",
        },
      ],
    });

    console.log("Seeding completed successfully.");
    console.log(
      `Inserted ${categories.count} categories, ${products.count} products, ${productVariants.count} product variants, and ${productImages.count} product images.`,
    );
    console.log("Database seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();

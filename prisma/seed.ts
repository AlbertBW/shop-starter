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

    function randomDate() {
      const start = new Date(2020, 0, 1);
      const end = new Date();
      return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime()),
      );
    }

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
          createdAt: randomDate(),
          sold: 12,
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
          createdAt: randomDate(),
          sold: 0,
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
          createdAt: randomDate(),
          sold: 4,
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
          createdAt: randomDate(),
          sold: 20,
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
          createdAt: randomDate(),
          sold: 4,
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
          createdAt: randomDate(),
          sold: 25,
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
          createdAt: randomDate(),
          sold: 23,
        },
        {
          id: 8,
          name: "Bluetooth Speaker",
          description:
            "Portable Bluetooth speaker with deep bass and long battery life.",
          price: 79.99,
          slug: "bluetooth-speaker",
          sku: "BS-001",
          currency: "GBP",
          stock: 60,
          categoryId: 3,
          createdAt: randomDate(),
          sold: 9,
        },
        {
          id: 9,
          name: "Action Camera",
          description:
            "Compact action camera with 4K recording and waterproof design.",
          price: 299.99,
          slug: "action-camera",
          sku: "AC-001",
          currency: "GBP",
          stock: 25,
          categoryId: 5,
          createdAt: randomDate(),
          sold: 54,
        },
        {
          id: 10,
          name: "Laptop Stand",
          description:
            "Ergonomic laptop stand with adjustable height and angle.",
          price: 39.99,
          slug: "laptop-stand",
          sku: "LS-001",
          currency: "GBP",
          stock: 150,
          categoryId: 3,
          createdAt: randomDate(),
          sold: 27,
        },
        {
          id: 11,
          name: "Wireless Keyboard",
          description:
            "Slim wireless keyboard with quiet keys and long battery life.",
          price: 59.99,
          slug: "wireless-keyboard",
          sku: "WK-001",
          currency: "GBP",
          stock: 80,
          categoryId: 3,
          createdAt: randomDate(),
          sold: 1,
        },
        {
          id: 12,
          name: "Fitness Tracker",
          description:
            "Fitness tracker with heart rate monitor and sleep tracking.",
          price: 99.99,
          slug: "fitness-tracker",
          sku: "FT-001",
          currency: "GBP",
          stock: 40,
          categoryId: 4,
          createdAt: randomDate(),
          sold: 2,
        },
        {
          id: 13,
          name: "Magnetic Wallet",
          description:
            "Magnetic wallet with RFID blocking technology and slim design.",
          price: 19.99,
          slug: "magnetic-wallet",
          sku: "MW-001",
          currency: "GBP",
          stock: 200,
          categoryId: 3,
          createdAt: randomDate(),
          sold: 32,
        },
        {
          id: 14,
          name: "Portable Power Bank",
          description:
            "High capacity portable power bank with fast charging support.",
          price: 39.99,
          slug: "portable-power-bank",
          sku: "PPB-001",
          currency: "GBP",
          stock: 120,
          categoryId: 3,
          createdAt: randomDate(),
          sold: 52,
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
          sold: 5,
        },
        {
          id: 2,
          productId: 1,
          name: "Over ear Headphones - White",
          price: 189.99,
          sku: "OEH-001-WHT",
          currency: "GBP",
          stock: 20,
          sold: 7,
        },
        {
          id: 3,
          productId: 11,
          name: "Cherry MX Brown",
          price: 59.99,
          sku: "WK-001-BRN",
          currency: "GBP",
          stock: 80,
          sold: 0,
        },
        {
          id: 4,
          productId: 11,
          name: "Cherry MX Blue",
          price: 64.99,
          sku: "WK-001-BLU",
          currency: "GBP",
          stock: 50,
          sold: 1,
        },
        {
          id: 5,
          productId: 11,
          name: "Cherry MX Red",
          price: 59.99,
          sku: "WK-001-RED",
          currency: "GBP",
          stock: 30,
          sold: 0,
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
        {
          id: 9,
          productId: 8,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/bt-speaker-nsNhSIFEQnJJtH6HS7h9jV1S6O1cGr.jpg",
          altText: "Bluetooth Speaker",
        },
        {
          id: 10,
          productId: 9,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/action-cam-1LvQm1RmnvR9zbhgmv1w6eG5TCqXA5.jpg",
          altText: "Action Camera",
        },
        {
          id: 11,
          productId: 10,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/laptop-stand-ym7ThXidEuxV8OvQpM45k8DiiKsb0H.jpg",
          altText: "Laptop Stand",
        },
        {
          id: 12,
          productId: 11,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/keyboard-iAW7hvss14TQoABjPKadYbmcy7qaG5.jpg",
          altText: "Wireless Keyboard",
        },
        {
          id: 13,
          productId: 12,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/fit-watch-jaKk0SFHCS8gboTaIST98iU5IWFgQs.jpg",
          altText: "Fitness Tracker",
        },
        {
          id: 14,
          productId: 13,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/wallet-anOOCEtqjosia599TbocK7heRGiR8K.jpg",
          altText: "Magnetic Wallet",
        },
        {
          id: 15,
          productId: 14,
          imageUrl:
            "https://c4kzitkhtxdwhtej.public.blob.vercel-storage.com/power-bank-Dh4AEboQKtPCvBmzXcs8gNBnyktfvd.jpg",
          altText: "Portable Power Bank",
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

await seed();

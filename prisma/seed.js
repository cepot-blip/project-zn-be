const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const categoryData = [
  { category_name: "berita" },
  { category_name: "teknologi" },
  { category_name: "olahraga" },
  { category_name: "wisata" },
  { category_name: "lifestyle" },
  { category_name: "hiburan" },
];

async function seed() {
  try {
    const category = await prisma.category.createMany({
      data: categoryData,
      skipDuplicates: true,
    });
    console.log(`Success seed ${category.count} categories.`);
  } catch (e) {
    console.error("Error seeding data:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

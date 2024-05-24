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
    const existingCategories = await prisma.category.findMany();
    const existingCategoryNames = existingCategories.map(
      (cat) => cat.category_name
    );

    const newCategories = categoryData.filter(
      (cat) => !existingCategoryNames.includes(cat.category_name)
    );

    if (newCategories.length > 0) {
      const result = await prisma.category.createMany({
        data: newCategories,
        skipDuplicates: true,
      });
      console.log(`Success seed ${result.count} categories.`);
    } else {
      console.log("No new categories to add.");
    }
  } catch (e) {
    console.error("Error seeding data:", e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice Johnson",
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      email: "bob@example.com",
      name: "Bob Smith",
    },
  })

  // Create sample posts
  await prisma.post.upsert({
    where: { id: "post-1" },
    update: {},
    create: {
      id: "post-1",
      title: "Getting Started with Prisma",
      content: "Prisma is a next-generation ORM that makes working with databases easy.",
      published: true,
      authorId: user1.id,
    },
  })

  await prisma.post.upsert({
    where: { id: "post-2" },
    update: {},
    create: {
      id: "post-2",
      title: "Building with Next.js",
      content: "Next.js provides a great developer experience for building React applications.",
      published: false,
      authorId: user2.id,
    },
  })

  console.log("Database seeded successfully!")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

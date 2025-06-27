import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    })
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content, authorId, published = false } = body

    if (!title || !authorId) {
      return NextResponse.json({ error: "Title and authorId are required" }, { status: 400 })
    }

    // Check if author exists
    const author = await prisma.user.findUnique({
      where: { id: authorId }
    })

    if (!author) {
      return NextResponse.json({ error: "Author not found" }, { status: 404 })
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId,
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

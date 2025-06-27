import { prisma } from "@/lib/db"

export const dynamic = "force-dynamic"
export const revalidate = 0

async function getUsers() {
  try {
    return await prisma.user.findMany({
      include: {
        posts: true,
      },
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

async function getPosts() {
  try {
    return await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return []
  }
}

export default async function Home() {
  const [users, posts] = await Promise.all([getUsers(), getPosts()])

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Aplicação Prisma + TypeScript + Vercel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Users ({users.length})</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg">{user.name || "Anonymous"}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {user.posts.length} post{user.posts.length !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Posts ({posts.length})</h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  {post.published && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Published</span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-2">by {post.author.name || post.author.email}</p>
                {post.content && <p className="text-gray-700 text-sm">{post.content}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

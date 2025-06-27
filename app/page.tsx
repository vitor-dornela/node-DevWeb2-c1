"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

interface User {
  id: string
  email: string
  name: string | null
  createdAt: string
  updatedAt: string
  posts: Post[]
}

interface Post {
  id: string
  title: string
  content: string | null
  published: boolean
  authorId: string
  author: User
  createdAt: string
  updatedAt: string
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("users")

  // Form states
  const [userForm, setUserForm] = useState({ name: "", email: "" })
  const [postForm, setPostForm] = useState({ title: "", content: "", authorId: "", published: false })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [usersRes, postsRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/posts")
      ])
      
      if (usersRes.ok) {
        const usersData = await usersRes.json()
        setUsers(usersData)
      }
      
      if (postsRes.ok) {
        const postsData = await postsRes.json()
        setPosts(postsData)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Falha ao carregar dados")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userForm.name || !userForm.email) {
      toast.error("Por favor, preencha todos os campos")
      return
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userForm)
      })

      if (response.ok) {
        const newUser = await response.json()
        setUsers([...users, newUser])
        setUserForm({ name: "", email: "" })
        toast.success("Usuário criado com sucesso!")
      } else {
        toast.error("Falha ao criar usuário")
      }
    } catch (error) {
      console.error("Error creating user:", error)
      toast.error("Falha ao criar usuário")
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!postForm.title || !postForm.authorId) {
      toast.error("Por favor, preencha todos os campos obrigatórios")
      return
    }

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postForm)
      })

      if (response.ok) {
        const newPost = await response.json()
        setPosts([...posts, newPost])
        setPostForm({ title: "", content: "", authorId: "", published: false })
        toast.success("Post criado com sucesso!")
      } else {
        toast.error("Falha ao criar post")
      }
    } catch (error) {
      console.error("Error creating post:", error)
      toast.error("Falha ao criar post")
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE"
      })

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId))
        setPosts(posts.filter(post => post.authorId !== userId))
        toast.success("Usuário excluído com sucesso!")
      } else {
        toast.error("Falha ao excluir usuário")
      }
    } catch (error) {
      console.error("Error deleting user:", error)
      toast.error("Falha ao excluir usuário")
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE"
      })

      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId))
        toast.success("Post excluído com sucesso!")
      } else {
        toast.error("Falha ao excluir post")
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      toast.error("Falha ao excluir post")
    }
  }

  const handleTogglePostStatus = async (postId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !currentStatus })
      })

      if (response.ok) {
        setPosts(posts.map(post => 
          post.id === postId ? { ...post, published: !currentStatus } : post
        ))
        toast.success(`Post ${!currentStatus ? 'publicado' : 'despublicado'} com sucesso!`)
      } else {
        toast.error("Falha ao atualizar status do post")
      }
    } catch (error) {
      console.error("Error updating post:", error)
      toast.error("Falha ao atualizar status do post")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gerenciamento de Usuários e Posts</h1>
          <p className="text-gray-600">Crie e exclua usuários e posts</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger 
              value="users"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 data-[state=inactive]:border data-[state=inactive]:border-gray-300"
            >
              Usuários ({users.length})
            </TabsTrigger>
            <TabsTrigger 
              value="posts"
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-gray-700 data-[state=inactive]:border data-[state=inactive]:border-gray-300"
            >
              Posts ({posts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Criar Novo Usuário</CardTitle>
                <CardDescription>Adicione um novo usuário ao sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={userForm.name}
                        onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                        placeholder="Digite o nome do usuário"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userForm.email}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                        placeholder="Digite o email do usuário"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">Criar Usuário</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Usuários</CardTitle>
                <CardDescription>Todos os usuários registrados no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                {users.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Nenhum usuário encontrado</p>
                ) : (
                  <div className="space-y-4">
                    {users.map((user) => (
                      <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{user.name || "Usuário sem nome"}</h3>
                            <p className="text-gray-600">{user.email}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">
                                {user.posts.length} posts
                              </Badge>
                              <span className="text-sm text-gray-500">
                                Criado em: {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Criar Novo Post</CardTitle>
                <CardDescription>Adicione um novo post ao sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Título</Label>
                      <Input
                        id="title"
                        value={postForm.title}
                        onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                        placeholder="Digite o título do post"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="authorId">Autor</Label>
                      <select
                        id="authorId"
                        value={postForm.authorId}
                        onChange={(e) => setPostForm({ ...postForm, authorId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Selecione um autor</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name || user.email}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="content">Conteúdo</Label>
                    <textarea
                      id="content"
                      value={postForm.content || ""}
                      onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                      placeholder="Digite o conteúdo do post"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="published"
                      checked={postForm.published}
                      onChange={(e) => setPostForm({ ...postForm, published: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="published">Publicado</Label>
                  </div>
                  <Button type="submit" className="w-full">Criar Post</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lista de Posts</CardTitle>
                <CardDescription>Todos os posts no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                {posts.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">Nenhum post encontrado</p>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-lg">{post.title}</h3>
                              <Badge variant={post.published ? "default" : "secondary"}>
                                {post.published ? "Publicado" : "Rascunho"}
                              </Badge>
                            </div>
                            {post.content && (
                              <p className="text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>Por: {post.author.name || post.author.email}</span>
                              <span>Criado em: {new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleTogglePostStatus(post.id, post.published)}
                            >
                              {post.published ? "Despublicar" : "Publicar"}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

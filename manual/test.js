// Blog API Manual Endpoint List for Testing

// AUTH
// POST /auth/signup
//   { name: string, email: string, password: string }

// POST /auth/login
//   { email: string, password: string }

// POST /auth/logout
//   (no body)

// POSTS
// GET /posts?limit=10&offset=0&author=John&title=First
//   (query params: limit, offset, author, title are optional)

// POST /posts
//   Headers: Authorization: Bearer <token>
//   { title: string, content: string }

// PUT /posts/:id
//   Headers: Authorization: Bearer <token>
//   { title?: string, content?: string }

// DELETE /posts/:id
//   Headers: Authorization: Bearer <token>
//   (no body)

// COMMENTS (nested under posts)
// GET /posts/:postId/comments
//   (no body)

// POST /posts/:postId/comments
//   Headers: Authorization: Bearer <token>
//   { text: string }

// PUT /posts/:postId/comments/:commentId
//   Headers: Authorization: Bearer <token>
//   { text: string }

// DELETE /posts/:postId/comments/:commentId
//   Headers: Authorization: Bearer <token>
//   (no body) 
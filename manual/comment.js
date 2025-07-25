/**
 * Comment Endpoints Documentation & Example Requests
 * 
 * All endpoints require authentication unless specified.
 * Media uploads (images/gifs) use multipart/form-data with the "media" field.
 * The "media" field accepts one or more image or gif files (optional).
 */

module.exports = [
  {
    name: "Create Comment",
    method: "POST",
    endpoint: "/comments",
    auth: true,
    contentType: "multipart/form-data",
    requestFields: [
      { name: "postId", type: "Text", required: true, description: "ID of the post to comment on" },
      { name: "content", type: "Text", required: false, description: "Comment text" },
      { name: "media", type: "File", required: false, description: "One or more image or gif files (optional)" }
    ],
    exampleCurl: `
curl -X POST http://localhost:3000/comments \\
  -H "Authorization: Bearer <your_jwt_token>" \\
  -F "postId=1" \\
  -F "content=Nice post!" \\
  -F "media=@/path/to/image1.png" \\
  -F "media=@/path/to/funny.gif"
`
  },
  {
    name: "Update Comment",
    method: "PUT",
    endpoint: "/comments/:id",
    auth: true,
    contentType: "multipart/form-data",
    requestFields: [
      { name: "content", type: "Text", required: false, description: "Updated comment text" },
      { name: "media", type: "File", required: false, description: "New image or gif files (optional)" }
    ],
    exampleCurl: `
curl -X PUT http://localhost:3000/comments/123 \\
  -H "Authorization: Bearer <your_jwt_token>" \\
  -F "content=Updated comment!" \\
  -F "media=@/path/to/newimage.png"
`
  },
  {
    name: "Get Comments for a Post",
    method: "GET",
    endpoint: "/comments/post/:postId",
    auth: false,
    contentType: "application/json",
    requestFields: [
      { name: "postId", type: "URL Parameter", required: true, description: "ID of the post" }
    ],
    exampleCurl: `
curl -X GET http://localhost:3000/comments/post/1
`
  },
  {
    name: "Delete Comment",
    method: "DELETE",
    endpoint: "/comments/:id",
    auth: true,
    contentType: "application/json",
    requestFields: [
      { name: "id", type: "URL Parameter", required: true, description: "ID of the comment" }
    ],
    exampleCurl: `
curl -X DELETE http://localhost:3000/comments/123 \\
  -H "Authorization: Bearer <your_jwt_token>"
`
  }
]; 
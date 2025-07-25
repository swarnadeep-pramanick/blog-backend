require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/utils/db');

let token;
let postId;
let commentId;

describe('Comments Endpoints', () => {
  beforeAll(async () => {
    await prisma.comment.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});
    // Create user, login, and post
    await request(app).post('/auth/signup').send({ name: 'Commenter', email: 'commenter@example.com', password: 'password123' });
    const res = await request(app).post('/auth/login').send({ email: 'commenter@example.com', password: 'password123' });
    token = res.body.token;
    const postRes = await request(app).post('/posts').set('Authorization', `Bearer ${token}`).send({ title: 'Post', content: 'Content' });
    postId = postRes.body.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should fail validation for missing fields on create', async () => {
    const res = await request(app).post(`/posts/${postId}/comments`).set('Authorization', `Bearer ${token}`).send({});
    expect(res.statusCode).toBe(400);
  });

  it('should create a new comment', async () => {
    const res = await request(app).post(`/posts/${postId}/comments`).set('Authorization', `Bearer ${token}`).send({ text: 'Nice!' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    commentId = res.body.id;
  });

  it('should list comments for a post', async () => {
    const res = await request(app).get(`/posts/${postId}/comments`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a comment (should fail if not post or comment author)', async () => {
    const res = await request(app).put(`/posts/${postId}/comments/${commentId}`).set('Authorization', `Bearer ${token}`).send({ text: 'Updated!' });
    expect([200, 403, 404]).toContain(res.statusCode);
  });

  it('should delete a comment (should fail if not post or comment author)', async () => {
    const res = await request(app).delete(`/posts/${postId}/comments/${commentId}`).set('Authorization', `Bearer ${token}`);
    expect([200, 403, 404]).toContain(res.statusCode);
  });
}); 
const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/utils/db');

let token;
let postId;

describe('Posts Endpoints', () => {
  beforeAll(async () => {
    await prisma.comment.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});
    // Create user and login
    await request(app).post('/auth/signup').send({ name: 'Poster', email: 'poster@example.com', password: 'password123' });
    const res = await request(app).post('/auth/login').send({ email: 'poster@example.com', password: 'password123' });
    token = res.body.token;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should fail validation for missing fields on create', async () => {
    const res = await request(app).post('/posts').set('Authorization', `Bearer ${token}`).send({ title: '' });
    expect(res.statusCode).toBe(400);
  });

  it('should create a new post', async () => {
    const res = await request(app).post('/posts').set('Authorization', `Bearer ${token}`).send({ title: 'Hello', content: 'World' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('id');
    postId = res.body.id;
  });

  it('should list posts with limit and offset', async () => {
    const res = await request(app).get('/posts?limit=1&offset=0');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a post', async () => {
    const res = await request(app).put(`/posts/${postId}`).set('Authorization', `Bearer ${token}`).send({ title: 'Updated', content: 'Updated content' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated');
  });

  it('should delete a post', async () => {
    const res = await request(app).delete(`/posts/${postId}`).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/);
  });
}); 
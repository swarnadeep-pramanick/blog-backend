require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/utils/db');

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    await prisma.comment.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should fail validation for missing fields on signup', async () => {
    const res = await request(app).post('/auth/signup').send({ email: 'test@example.com' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/name/);
  });

  it('should signup a new user', async () => {
    const res = await request(app).post('/auth/signup').send({ name: 'Test', email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not allow duplicate email signup', async () => {
    const res = await request(app).post('/auth/signup').send({ name: 'Test', email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Email already exists/);
  });

  it('should fail login with wrong password', async () => {
    const res = await request(app).post('/auth/login').send({ email: 'test@example.com', password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Invalid credentials/);
  });

  it('should login with correct credentials', async () => {
    const res = await request(app).post('/auth/login').send({ email: 'test@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
}); 
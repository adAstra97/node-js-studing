import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { faker } from '@faker-js/faker';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

const main = async () => {
  const orderData = [...Array(10)].map(() => ({
    total: faker.number.float({ min: 7, max: 15657, multipleOf: 0.01 }),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    userId: 5,
    stripeInvoiceId: faker.string.alphanumeric(15),
  }));

  const productData = [...Array(10)].map(() => ({
    name: faker.commerce.productName(),
    price: faker.number.float({ min: 35, max: 1055, multipleOf: 0.01 }),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  }));

  await db.user.create({
    data: {
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      email: faker.internet.email(),
    },
  });

  for (const product of productData) {
    await db.product.create({
      data: {
        name: product.name,
        price: product.price,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
    });
  }

  for (const order of orderData) {
    await db.order.create({
      data: {
        total: order.total,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        userId: order.userId,
      },
    });
  }
};

main()
  .then(async () => {
    await db.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    await pool.end();
    process.exit(1);
  });

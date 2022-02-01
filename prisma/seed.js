const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function seed() {
  const john = await prisma.user.create({
    data: {
      username: 'test',
      // Hash for password - Testtest
      passwordHash:
        '$2b$10$BP9bL11OyucBMGWuFbFSYuA/fpu2y/jsbUpEDC545I0AlZlmoPsIu',
    },
  })

  await Promise.all(
    getPosts().map((post) => {
      const data = { userId: john.id, ...post }
      return prisma.post.create({ data })
    })
  )
}

seed()

function getPosts() {
  return [
    {
      title: 'Example Title 1',
      body: `Example Body 1`,
    },
    {
      title: 'Example Title 2',
      body: `Example Body 2`,
    },
    {
      title: 'Example Title 3',
      body: `Example Body 3`,
    },
    {
      title: 'Example Title 4',
      body: `Example Body 4`,
    },
  ]
}
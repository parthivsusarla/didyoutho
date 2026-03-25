const prisma = require('../utils/prismaClient');

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await prisma.users.create({
      data: {
        name,
        email
      }
    });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
};
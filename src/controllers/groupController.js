const prisma = require('../utils/prismaClient');

exports.createGroup = async (req, res) => {
  try {
    const { name, created_by } = req.body;

    const group = await prisma.groups.create({
      data: {
        name,
        created_by
      }
    });

    res.json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating group' });
  }
};
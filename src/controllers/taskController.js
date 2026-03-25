const prisma = require('../utils/prismaClient');

exports.createTask = async (req, res) => {
  try {
    const { title, group_id, created_by } = req.body;

    const task = await prisma.tasks.create({
      data: {
        title,
        group_id,
        created_by
      }
    });

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating task' });
  }
};

exports.getTasks = async (req, res) => {    
  try {
    const { groupId } = req.params;

    const tasks = await prisma.tasks.findMany({
      where: { group_id: groupId },
      include: {
        task_participants: true
      }
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};
const prisma = require('../utils/prismaClient');

exports.uploadProof = async (req, res) => {
  try {
    const { user_id, task_id, image_url } = req.body;

    const proof = await prisma.proofs.create({
      data: {
        user_id,
        task_id,
        image_url
      }
    });

    res.json(proof);
  } catch (err) {
    res.status(500).json({ error: 'Error uploading proof' });
  }
};
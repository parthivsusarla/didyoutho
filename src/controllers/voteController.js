const prisma = require('../utils/prismaClient');

exports.voteProof = async (req, res) => {
  try {
    const { proof_id, user_id, vote_type } = req.body;

    const vote = await prisma.proof_votes.create({
      data: {
        proof_id,
        user_id,
        vote_type
      }
    });

    // Count votes
    const votes = await prisma.proof_votes.findMany({
      where: { proof_id }
    });

    const upvotes = votes.filter(v => v.vote_type === 'upvote').length;
    const downvotes = votes.filter(v => v.vote_type === 'downvote').length;

    // Update validity
    const { updateUserProgress } = require('../services/gamificationService');
    if (upvotes > downvotes) {
      await prisma.proofs.update({
        where: { id: proof_id },
        data: { is_valid: true }
      });
    }
    if (upvotes > downvotes) {
  await prisma.proofs.update({
    where: { id: proof_id },
    data: { is_valid: true }
  });

  // 🔥 NEW: reward user
  await updateUserProgress(user_id);
}

    res.json({ vote, upvotes, downvotes });

  } catch (err) {
  console.error(err); 
  res.status(500).json({ error: err.message });
}
};
const prisma = require('../utils/prismaClient');

exports.updateUserProgress = async (user_id) => {
  // Add XP
  await prisma.users.update({
    where: { id: user_id },
    data: {
      total_xp: {
        increment: 50
      }
    }
  });

  // Update streak
  const streak = await prisma.streaks.findUnique({
    where: { user_id }
  });

  if (!streak) {
    await prisma.streaks.create({
      data: {
        user_id,
        current_streak: 1,
        longest_streak: 1
      }
    });
  } else {
    await prisma.streaks.update({
      where: { user_id },
      data: {
        current_streak: {
          increment: 1
        },
        longest_streak: Math.max(
          streak.longest_streak,
          streak.current_streak + 1
        )
      }
    });
  }
};
import { FastifyReply, FastifyRequest } from 'fastify';
import { getUserStatistics } from '@/application/services/user/user-statistics.service';
import { getUserById } from '@/application/services/user/user.service';

class UserStatisticsController {
  static async getUserStatistics(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userId = request.user.id;

      await getUserById(userId);

      const userStatistics = await getUserStatistics(userId);

      return reply.status(200).send(userStatistics);
    } catch (error) {
      throw error;
    }
  }
}

export default UserStatisticsController;

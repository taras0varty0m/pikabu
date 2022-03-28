import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LikedCommentsRepository } from './liked-comments.repository';

@Injectable()
export class EditLikedCommentsGuard implements CanActivate {
  constructor(private likedCommentsRepository: LikedCommentsRepository) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const likedComment = await this.likedCommentsRepository.findOne(
      ctx.getContext().req.params.id,
    );
    const userId = ctx.getContext().req.user.id;
    if (likedComment?.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}

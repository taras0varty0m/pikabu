import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LikedPostsRepository } from './liked-posts.repository';

@Injectable()
export class EditLikedPostsGuard implements CanActivate {
  constructor(private likedPostsRepository: LikedPostsRepository) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const likedPost = await this.likedPostsRepository.findOne(
      ctx.getContext().req.params.id,
    );
    const userId = ctx.getContext().req.user.id;
    if (likedPost?.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PostsRepository } from './posts.repository';

@Injectable()
export class EditPostsGuard implements CanActivate {
  constructor(private postsRepository: PostsRepository) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const post = await this.postsRepository.findOne(
      ctx.getContext().req.params.id,
    );
    const userId = ctx.getContext().req.user.id;
    if (post?.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}

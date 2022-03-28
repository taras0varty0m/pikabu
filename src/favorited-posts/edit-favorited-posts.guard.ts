import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FavoritedPostsRepository } from './favorited-posts.repository';

@Injectable()
export class EditFavoritedPostsGuard implements CanActivate {
  constructor(private favoritedPostsRepository: FavoritedPostsRepository) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const favoritedPost = await this.favoritedPostsRepository.findOne(
      ctx.getContext().req.params.id,
    );
    const userId = ctx.getContext().req.user.id;
    if (favoritedPost?.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}

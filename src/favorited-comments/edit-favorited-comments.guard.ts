import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FavoritedCommentsRepository } from './favorited-comments.repository';

@Injectable()
export class EditFavoritedCommentsGuard implements CanActivate {
  constructor(
    private favoritedCommentsRepository: FavoritedCommentsRepository,
  ) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const favoritedComment = await this.favoritedCommentsRepository.findOne(
      ctx.getContext().req.params.id,
    );
    const userId = ctx.getContext().req.user.id;
    if (favoritedComment?.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}

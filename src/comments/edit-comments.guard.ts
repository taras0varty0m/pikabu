import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class EditCommentsGuard implements CanActivate {
  constructor(private commentsRepository: CommentsRepository) {}
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const comment = await this.commentsRepository.findOne(
      ctx.getContext().req.params.id,
    );
    const userId = ctx.getContext().req.user.id;
    if (comment?.userId !== userId) {
      throw new ForbiddenException();
    }

    return true;
  }
}

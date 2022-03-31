import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/paginate-response.dto';
import { FavoritedCommentModel } from './favorited-comment.model';

@ObjectType()
export class PaginatedFavoritedComments extends Paginated(
  FavoritedCommentModel,
) {}

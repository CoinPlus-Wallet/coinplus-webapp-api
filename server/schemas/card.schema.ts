import { MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import { UserData } from './user.schema';

@InputType()
export class UpdateCardInput {
  @MinLength(10, { message: 'Title must be at least 10 characters long' })
  @Field(() => String, { nullable: true })
  title: string;

  @MinLength(10, { message: 'Content must be at least 10 characters long' })
  @Field(() => String, { nullable: true })
  content: string;

  @Field(() => String, { nullable: true })
  category: string;

  // @Field(() => String, { nullable: true })
  // image: string;
}

@InputType()
export class CardInput {
  @MinLength(10, { message: 'Title must be at least 10 characters long' })
  @Field(() => String)
  title: string;

  @MinLength(10, { message: 'Content must be at least 10 characters long' })
  @Field(() => String)
  content: string;

  @Field(() => String)
  category: string;

  // @Field(() => String)
  // image: string;
}

@InputType()
export class CardFilter {
  @Field(() => Number, { nullable: true, defaultValue: 1 })
  page: number;

  @Field(() => Number, { nullable: true, defaultValue: 10 })
  limit: number;
}

@ObjectType()
export class CardDataObj {
  @Field(() => String)
  readonly _id: string;

  @Field(() => String, { nullable: true })
  readonly id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  category: string;

  @Field(() => String)
  content: string;

  // @Field(() => String)
  // image: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class CardPopulatedData extends CardDataObj {
  @Field(() => UserData)
  user: UserData;
}

@ObjectType()
export class CardData extends CardDataObj {
  @Field(() => String)
  user: string;
}

@ObjectType()
export class CardResponse {
  @Field(() => String)
  status: string;

  @Field(() => CardData)
  card: CardData;
}

@ObjectType()
export class CardPopulatedResponse {
  @Field(() => String)
  status: string;

  @Field(() => CardPopulatedData)
  card: CardPopulatedData;
}

@ObjectType()
export class CardListResponse {
  @Field(() => String)
  status: string;

  @Field(() => Number)
  results: number;

  @Field(() => [CardPopulatedData])
  cards: CardPopulatedData[];
}

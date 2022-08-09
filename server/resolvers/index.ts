import UserResolver from './user.resolver';
import CardResolver from './card.resolver';

export const resolvers = [UserResolver, CardResolver] as const;

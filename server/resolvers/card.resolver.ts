import { Arg, Args, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  CardFilter,
  CardInput,
  CardListResponse,
  CardPopulatedResponse,
  CardResponse,
  UpdateCardInput,
} from '../schemas/card.schema';
import CardService from '../services/card.service';
import type { Context } from '../types/context';

@Resolver()
export default class CardResolver {
  constructor(private cardService: CardService) {
    this.cardService = new CardService();
  }

  @Mutation(() => CardResponse)
  async createCard(@Arg('input') input: CardInput, @Ctx() ctx: Context) {
    return this.cardService.createCard(input, ctx);
  }

  @Query(() => CardPopulatedResponse)
  async getCard(@Arg('id') id: string, @Ctx() ctx: Context) {
    return this.cardService.getCard(id, ctx);
  }

  @Mutation(() => CardResponse)
  async updateCard(@Arg('id') id: string, @Arg('input') input: UpdateCardInput, @Ctx() ctx: Context) {
    return this.cardService.updateCard(id, input, ctx);
  }

  @Query(() => CardListResponse)
  async getCards(@Arg('input', { nullable: true }) input: CardFilter, @Ctx() ctx: Context) {
    return this.cardService.getCards(input, ctx);
  }

  @Mutation(() => Boolean)
  async deleteCard(@Arg('id') id: string, @Ctx() ctx: Context) {
    return this.cardService.deleteCard(id, ctx);
  }
}

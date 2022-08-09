import { ValidationError } from 'apollo-server-core';
import errorHandler from '../controllers/error.controller';
import deserializeUser from '../middleware/deserializeUser';
import { CardFilter, CardInput } from '../schemas/card.schema';
import CardModel from '../models/card.model';
import { Context } from '../types/context';

export default class CardService {
  async createCard(input: Partial<CardInput>, { req, res }: Context) {
    try {
      const user = await deserializeUser(req, res);
      const card = await CardModel.create({ ...input, user: user?._id });
      return {
        status: 'success',
        card: {
          ...card.toJSON(),
          id: card?._id,
        },
      };
    } catch (error: any) {
      if (error.code === 11000) throw new ValidationError('Card with that title already exist');
      errorHandler(error);
    }
  }

  async getCard(id: string, { req, res }: Context) {
    try {
      await deserializeUser(req, res);
      const card = await CardModel.findById(id).populate('user').lean();

      if (!card) return new ValidationError('No card with that id exists');

      return {
        status: 'success',
        card,
      };
    } catch (error: any) {
      errorHandler(error);
    }
  }

  async updateCard(id: string, input: Partial<CardInput>, { req, res }: Context) {
    try {
      const user = await deserializeUser(req, res);
      const card = await CardModel.findByIdAndUpdate(
        id,
        { ...input, user: user?._id },
        {
          new: true,
          runValidators: true,
          lean: true,
        }
      );

      if (!card) return new ValidationError('No card with that id exists');
      return {
        status: 'success',
        card: {
          ...card,
          id: card?._id,
        },
      };
    } catch (error: any) {
      errorHandler(error);
    }
  }

  async getCards(input: CardFilter, { req, res }: Context) {
    try {
      const user = await deserializeUser(req, res);
      const cardsQuery = CardModel.find({ user: user?._id }).populate('user');

      // Pagination
      const page = input.page || 1;
      const limit = input.limit || 10;
      const skip = (page - 1) * limit;

      const cards = await cardsQuery.sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
      return {
        status: 'success',
        results: cards.length,
        cards,
      };
    } catch (error: any) {
      errorHandler(error);
    }
  }

  async deleteCard(id: string, { req, res }: Context) {
    try {
      await deserializeUser(req, res);
      const card = await CardModel.findByIdAndDelete(id);

      if (!card) return new ValidationError('No card with that id exists');

      return true;
    } catch (error: any) {
      errorHandler(error);
    }
  }
}

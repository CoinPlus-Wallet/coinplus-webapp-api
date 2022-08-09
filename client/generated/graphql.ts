import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CardData = {
  __typename?: 'CardData';
  _id: Scalars['String'];
  category: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: Scalars['String'];
};

export type CardFilter = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};

export type CardInput = {
  category: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
};

export type CardListResponse = {
  __typename?: 'CardListResponse';
  cards: Array<CardPopulatedData>;
  results: Scalars['Float'];
  status: Scalars['String'];
};

export type CardPopulatedData = {
  __typename?: 'CardPopulatedData';
  _id: Scalars['String'];
  category: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: UserData;
};

export type CardPopulatedResponse = {
  __typename?: 'CardPopulatedResponse';
  card: CardPopulatedData;
  status: Scalars['String'];
};

export type CardResponse = {
  __typename?: 'CardResponse';
  card: CardData;
  status: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  status: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCard: CardResponse;
  deleteCard: Scalars['Boolean'];
  loginUser: LoginResponse;
  signupUser: UserResponse;
  updateCard: CardResponse;
};


export type MutationCreateCardArgs = {
  input: CardInput;
};


export type MutationDeleteCardArgs = {
  id: Scalars['String'];
};


export type MutationLoginUserArgs = {
  input: LoginInput;
};


export type MutationSignupUserArgs = {
  input: SignUpInput;
};


export type MutationUpdateCardArgs = {
  id: Scalars['String'];
  input: UpdateCardInput;
};

export type Query = {
  __typename?: 'Query';
  getCard: CardPopulatedResponse;
  getCards: CardListResponse;
  getMe: UserResponse;
  logoutUser: Scalars['Boolean'];
  refreshAccessToken: LoginResponse;
};


export type QueryGetCardArgs = {
  id: Scalars['String'];
};


export type QueryGetCardsArgs = {
  input?: InputMaybe<CardFilter>;
};

export type SignUpInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type UpdateCardInput = {
  category?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UserData = {
  __typename?: 'UserData';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  status: Scalars['String'];
  user: UserData;
};

export type CreateCardMutationVariables = Exact<{
  input: CardInput;
}>;


export type CreateCardMutation = { __typename?: 'Mutation', createCard: { __typename?: 'CardResponse', status: string, card: { __typename?: 'CardData', id?: string | null, title: string, content: string, category: string, user: string, createdAt: any, updatedAt: any } } };

export type DeleteCardMutationVariables = Exact<{
  deleteCardId: Scalars['String'];
}>;


export type DeleteCardMutation = { __typename?: 'Mutation', deleteCard: boolean };

export type GetAllCardsQueryVariables = Exact<{
  input: CardFilter;
}>;


export type GetAllCardsQuery = { __typename?: 'Query', getCards: { __typename?: 'CardListResponse', status: string, results: number, cards: Array<{ __typename?: 'CardPopulatedData', id?: string | null, _id: string, title: string, content: string, category: string, createdAt: any, updatedAt: any, user: { __typename?: 'UserData', email: string, name: string } }> } };

export type GetCardQueryVariables = Exact<{
  getCardId: Scalars['String'];
}>;


export type GetCardQuery = { __typename?: 'Query', getCard: { __typename?: 'CardPopulatedResponse', status: string, card: { __typename?: 'CardPopulatedData', id?: string | null, title: string, content: string, category: string, updatedAt: any, user: { __typename?: 'UserData', email: string } } } };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'UserResponse', status: string, user: { __typename?: 'UserData', _id: string, id?: string | null, email: string, name: string, role: string, updatedAt: any, createdAt: any } } };

export type LoginUserMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginResponse', status: string, access_token: string } };

export type LogoutUserQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserQuery = { __typename?: 'Query', logoutUser: boolean };

export type RefreshAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type RefreshAccessTokenQuery = { __typename?: 'Query', refreshAccessToken: { __typename?: 'LoginResponse', status: string, access_token: string } };

export type SignUpUserMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpUserMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'UserResponse', status: string, user: { __typename?: 'UserData', name: string, email: string, role: string } } };

export type UpdateCardMutationVariables = Exact<{
  input: UpdateCardInput;
  updateCardId: Scalars['String'];
}>;


export type UpdateCardMutation = { __typename?: 'Mutation', updateCard: { __typename?: 'CardResponse', status: string, card: { __typename?: 'CardData', id?: string | null, title: string, content: string, category: string, createdAt: any, updatedAt: any } } };


export const CreateCardDocument = `
    mutation CreateCard($input: CardInput!) {
  createCard(input: $input) {
    status
    card {
      id
      title
      content
      category
      user
      createdAt
      updatedAt
    }
  }
}
    `;
export const useCreateCardMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateCardMutation, TError, CreateCardMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateCardMutation, TError, CreateCardMutationVariables, TContext>(
      ['CreateCard'],
      (variables?: CreateCardMutationVariables) => fetcher<CreateCardMutation, CreateCardMutationVariables>(client, CreateCardDocument, variables, headers)(),
      options
    );
export const DeleteCardDocument = `
    mutation DeleteCard($deleteCardId: String!) {
  deleteCard(id: $deleteCardId)
}
    `;
export const useDeleteCardMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteCardMutation, TError, DeleteCardMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteCardMutation, TError, DeleteCardMutationVariables, TContext>(
      ['DeleteCard'],
      (variables?: DeleteCardMutationVariables) => fetcher<DeleteCardMutation, DeleteCardMutationVariables>(client, DeleteCardDocument, variables, headers)(),
      options
    );
export const GetAllCardsDocument = `
    query GetAllCards($input: CardFilter!) {
  getCards(input: $input) {
    status
    results
    cards {
      id
      _id
      id
      title
      content
      category
      user {
        email
        name
      }
      createdAt
      updatedAt
    }
  }
}
    `;
export const useGetAllCardsQuery = <
      TData = GetAllCardsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetAllCardsQueryVariables,
      options?: UseQueryOptions<GetAllCardsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllCardsQuery, TError, TData>(
      ['GetAllCards', variables],
      fetcher<GetAllCardsQuery, GetAllCardsQueryVariables>(client, GetAllCardsDocument, variables, headers),
      options
    );
export const GetCardDocument = `
    query GetCard($getCardId: String!) {
  getCard(id: $getCardId) {
    status
    card {
      id
      title
      content
      user {
        email
      }
      category
      category
      updatedAt
    }
  }
}
    `;
export const useGetCardQuery = <
      TData = GetCardQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCardQueryVariables,
      options?: UseQueryOptions<GetCardQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCardQuery, TError, TData>(
      ['GetCard', variables],
      fetcher<GetCardQuery, GetCardQueryVariables>(client, GetCardDocument, variables, headers),
      options
    );
export const GetMeDocument = `
    query GetMe {
  getMe {
    status
    user {
      _id
      id
      email
      name
      role
      updatedAt
      createdAt
    }
  }
}
    `;
export const useGetMeQuery = <
      TData = GetMeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetMeQueryVariables,
      options?: UseQueryOptions<GetMeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetMeQuery, TError, TData>(
      variables === undefined ? ['GetMe'] : ['GetMe', variables],
      fetcher<GetMeQuery, GetMeQueryVariables>(client, GetMeDocument, variables, headers),
      options
    );
export const LoginUserDocument = `
    mutation LoginUser($input: LoginInput!) {
  loginUser(input: $input) {
    status
    access_token
  }
}
    `;
export const useLoginUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginUserMutation, TError, LoginUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginUserMutation, TError, LoginUserMutationVariables, TContext>(
      ['LoginUser'],
      (variables?: LoginUserMutationVariables) => fetcher<LoginUserMutation, LoginUserMutationVariables>(client, LoginUserDocument, variables, headers)(),
      options
    );
export const LogoutUserDocument = `
    query LogoutUser {
  logoutUser
}
    `;
export const useLogoutUserQuery = <
      TData = LogoutUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: LogoutUserQueryVariables,
      options?: UseQueryOptions<LogoutUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<LogoutUserQuery, TError, TData>(
      variables === undefined ? ['LogoutUser'] : ['LogoutUser', variables],
      fetcher<LogoutUserQuery, LogoutUserQueryVariables>(client, LogoutUserDocument, variables, headers),
      options
    );
export const RefreshAccessTokenDocument = `
    query RefreshAccessToken {
  refreshAccessToken {
    status
    access_token
  }
}
    `;
export const useRefreshAccessTokenQuery = <
      TData = RefreshAccessTokenQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: RefreshAccessTokenQueryVariables,
      options?: UseQueryOptions<RefreshAccessTokenQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<RefreshAccessTokenQuery, TError, TData>(
      variables === undefined ? ['RefreshAccessToken'] : ['RefreshAccessToken', variables],
      fetcher<RefreshAccessTokenQuery, RefreshAccessTokenQueryVariables>(client, RefreshAccessTokenDocument, variables, headers),
      options
    );
export const SignUpUserDocument = `
    mutation SignUpUser($input: SignUpInput!) {
  signupUser(input: $input) {
    status
    user {
      name
      email
      role
    }
  }
}
    `;
export const useSignUpUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SignUpUserMutation, TError, SignUpUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SignUpUserMutation, TError, SignUpUserMutationVariables, TContext>(
      ['SignUpUser'],
      (variables?: SignUpUserMutationVariables) => fetcher<SignUpUserMutation, SignUpUserMutationVariables>(client, SignUpUserDocument, variables, headers)(),
      options
    );
export const UpdateCardDocument = `
    mutation UpdateCard($input: UpdateCardInput!, $updateCardId: String!) {
  updateCard(input: $input, id: $updateCardId) {
    status
    card {
      id
      title
      content
      category
      createdAt
      updatedAt
    }
  }
}
    `;
export const useUpdateCardMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<UpdateCardMutation, TError, UpdateCardMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<UpdateCardMutation, TError, UpdateCardMutationVariables, TContext>(
      ['UpdateCard'],
      (variables?: UpdateCardMutationVariables) => fetcher<UpdateCardMutation, UpdateCardMutationVariables>(client, UpdateCardDocument, variables, headers)(),
      options
    );
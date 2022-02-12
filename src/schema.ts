import { gql } from "apollo-server"

export const typeDefs = gql`
  type Query {
    user: User
  }

  type Mutation {
    signup(credentials: AuthInput): AuthPayload!
    signin(credentials: AuthInput): AuthPayload!
    kanjiCreate(input: KanjiCreateInput): KanjiPayload!
    kanjiStatusUpdate(input: KanjiStatusUpdateInput): KanjiPayload!
    kanjiDelete(input: KanjiDeleteInput): KanjiPayload!
  }

  type User {
    id: ID!
    username: String!
    avatar: String
    list: [Kanji!]!
  }

  type Kanji {
    id: ID!
    character: String!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type UserError {
    message: String!
  }

  type KanjiError {
    message: String!
  }

  type AuthPayload {
    userErrors: [UserError!]!
    token: String
    username: String 
    avatar: String
  }

  type KanjiPayload {
    kanjiErrors: [KanjiError!]!
    kanji: Kanji
  }

  input AuthInput {
    username: String!
    password: String!
  }

  input KanjiCreateInput {
    character: String!
  }

  input KanjiDeleteInput {
    character: String!
  }

  input KanjiStatusUpdateInput {
    character: String!
    status: String!
  }

`;
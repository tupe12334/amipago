/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Group = {
  __typename?: "Group";
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type GroupUncheckedCreateInput = {
  id: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  create: Group;
};

export type MutationCreateArgs = {
  data: GroupUncheckedCreateInput;
};

export type Query = {
  __typename?: "Query";
  findFirst?: Maybe<Group>;
};

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Group = {
  __typename?: "Group";
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type GroupUncheckedCreateInput = {
  id: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  create: Group;
};

export type MutationCreateArgs = {
  data: GroupUncheckedCreateInput;
};

export type Query = {
  __typename?: "Query";
  findFirst?: Maybe<Group>;
};

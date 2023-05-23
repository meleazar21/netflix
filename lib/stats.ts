import { IStatsVariables, TypeInsertVariables } from "@/interfaces/istats-variables";
import { queryHasuraGraphQL } from "./hasura";

export const findStatByUserVideoId = async (userId: string, videoId: string, token: string) => {

  const operationsDoc = `
    query findStatByUserVideoId ($userId: String!, $videoId: String!) {
      stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
        userId
        id
        favourited
        videoId
        watched
      }
    }`;

  const response = await queryHasuraGraphQL(operationsDoc, "findStatByUserVideoId", { userId, videoId }, token)
  return response;
}

export const createStats = async (variables: TypeInsertVariables, token: string) => {
  console.log({ variables });
  const operationsDoc = `
  mutation createStat($userId: String!, $videoId: String!, $watched:Boolean!) {
    insert_stats(objects: {favourited: 1, userId: $userId, videoId: $videoId, watched: $watched}) {
      affected_rows
    }
  }
`;

  const response = await queryHasuraGraphQL(operationsDoc, "createStat", variables, token);
  return response;
}

export const updateStates = async (variables: IStatsVariables, token: string) => {
  const operationsDoc = `
  mutation updateStates ($userId: String!, $videoId: String!, $watched: Boolean!, $favourited: Int!) {
    update_stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}, _set: {watched: $watched, favourited: $favourited}) {
      affected_rows
    }
  }
`;
  const response = queryHasuraGraphQL(operationsDoc, "updateStates", variables, token);
  return response;
}

export const getWatchedStats = async (userId: string, token: string) => {

  const operationsDoc = `
  query getWatchedStats($userId: String!) {
    stats(where: {userId: {_eq: $userId}, watched: {_eq: true}}) {
      id
      userId
      videoId
    }
  }
`;
  const response = queryHasuraGraphQL(operationsDoc, "getWatchedStats", { userId }, token);
  return response;
}

export const getLikedVideos = async (userId: string, token: string) => {

  const operationsDoc = `
  query getLikedVideos($userId: String!) {
    stats(where: {userId: {_eq: $userId}, favourited: {_eq: 1}}) {
      id
      userId
      videoId
    }
  }
`;
  const response = queryHasuraGraphQL(operationsDoc, "getLikedVideos", { userId }, token);
  return response;
}
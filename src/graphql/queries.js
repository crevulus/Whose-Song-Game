/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getActivity = /* GraphQL */ `
  query GetActivity($activityId: ID!) {
    getActivity(activityId: $activityId) {
      activityId
      name
      fullName
      description
      rating
      type
      minPlayers
      maxPlayers
      minDuration
      maxDuration
      canJoinAfterStarted
    }
  }
`;
export const getActivities = /* GraphQL */ `
  query GetActivities {
    getActivities {
      items {
        activityId
        name
        fullName
        description
        rating
        type
        minPlayers
        maxPlayers
        minDuration
        maxDuration
        canJoinAfterStarted
      }
    }
  }
`;
export const getActivityInstance = /* GraphQL */ `
  query GetActivityInstance($activityInstanceId: ID!) {
    getActivityInstance(activityInstanceId: $activityInstanceId) {
      activityInstanceId
      activityId
      hostId
      createdAt
      status
      users {
        userId
        name
      }
    }
  }
`;
export const whoAmIGetActivityInstanceData = /* GraphQL */ `
  query WhoAmIGetActivityInstanceData($activityInstanceId: ID!, $userId: ID!) {
    whoAmIGetActivityInstanceData(
      activityInstanceId: $activityInstanceId
      userId: $userId
    ) {
      activityInstanceId
      phase
      assignedSelections {
        userId
        selectionText
      }
      selections {
        userId
        selectionText
      }
      found
      winnerId
      currentUserId
      currentUserGuess
    }
  }
`;
export const cahGetActivityInstanceData = /* GraphQL */ `
  query CahGetActivityInstanceData($activityInstanceId: ID!, $userId: ID!) {
    cahGetActivityInstanceData(
      activityInstanceId: $activityInstanceId
      userId: $userId
    ) {
      activityInstanceId
      phase
      czarId
      blackCard {
        cardId
        cardText
        pick
      }
      score {
        userId
        score
      }
      winningHands {
        userId
        blackCard {
          cardId
          cardText
          pick
        }
        whiteCards {
          cardId
          cardText
        }
      }
      selectedCards {
        userId
        whiteCards {
          cardId
          cardText
        }
      }
    }
  }
`;
export const cahGetWhiteCards = /* GraphQL */ `
  query CahGetWhiteCards($activityInstanceId: ID!, $userId: ID!) {
    cahGetWhiteCards(activityInstanceId: $activityInstanceId, userId: $userId) {
      userId
      whiteCards {
        cardId
        cardText
      }
    }
  }
`;

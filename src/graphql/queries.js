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
      enabled
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
        enabled
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
export const factBucketGetActivityInstanceData = /* GraphQL */ `
  query FactBucketGetActivityInstanceData(
    $activityInstanceId: ID!
    $userId: ID!
  ) {
    factBucketGetActivityInstanceData(
      activityInstanceId: $activityInstanceId
      userId: $userId
    ) {
      activityInstanceId
      phase
      facts {
        factId
        factText
        userId
      }
      score {
        userId
        score
        guessed
      }
    }
  }
`;
export const factBucketGetGuesses = /* GraphQL */ `
  query FactBucketGetGuesses($activityInstanceId: ID!, $userId: ID!) {
    factBucketGetGuesses(
      activityInstanceId: $activityInstanceId
      userId: $userId
    ) {
      activityInstanceId
      guesses {
        userId
        guesses {
          factId
          factText
          userId
        }
      }
    }
  }
`;
export const whoseSongActivityInstanceData = /* GraphQL */ `
  query WhoseSongActivityInstanceData($activityInstanceId: ID!, $userId: ID!) {
    whoseSongActivityInstanceData(
      activityInstanceId: $activityInstanceId
      userId: $userId
    ) {
      activityInstanceId
    }
  }
`;

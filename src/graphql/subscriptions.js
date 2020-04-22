/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updatedActivityInstance = /* GraphQL */ `
  subscription UpdatedActivityInstance($activityInstanceId: ID!) {
    updatedActivityInstance(activityInstanceId: $activityInstanceId) {
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
export const startedNewActivityInstance = /* GraphQL */ `
  subscription StartedNewActivityInstance($oldActivityInstanceId: ID!) {
    startedNewActivityInstance(oldActivityInstanceId: $oldActivityInstanceId) {
      oldActivityInstanceId
      newActivityInstanceId
    }
  }
`;
export const whoAmIUpdatedActivityInstanceData = /* GraphQL */ `
  subscription WhoAmIUpdatedActivityInstanceData($activityInstanceId: ID!) {
    whoAmIUpdatedActivityInstanceData(activityInstanceId: $activityInstanceId) {
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
export const cahUpdatedActivityInstanceData = /* GraphQL */ `
  subscription CahUpdatedActivityInstanceData($activityInstanceId: ID!) {
    cahUpdatedActivityInstanceData(activityInstanceId: $activityInstanceId) {
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
export const factBucketUpdatedActivityInstanceData = /* GraphQL */ `
  subscription FactBucketUpdatedActivityInstanceData($activityInstanceId: ID!) {
    factBucketUpdatedActivityInstanceData(
      activityInstanceId: $activityInstanceId
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

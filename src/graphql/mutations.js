/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createActivityInstance = /* GraphQL */ `
  mutation CreateActivityInstance(
    $activityId: ID!
    $hostId: ID!
    $hostName: String!
  ) {
    createActivityInstance(
      activityId: $activityId
      hostId: $hostId
      hostName: $hostName
    ) {
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
export const startActivityInstance = /* GraphQL */ `
  mutation StartActivityInstance($activityInstanceId: ID!) {
    startActivityInstance(activityInstanceId: $activityInstanceId) {
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
export const endActivityInstance = /* GraphQL */ `
  mutation EndActivityInstance($activityInstanceId: ID!) {
    endActivityInstance(activityInstanceId: $activityInstanceId) {
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
export const updateActivityInstanceUsers = /* GraphQL */ `
  mutation UpdateActivityInstanceUsers(
    $activityInstanceId: ID!
    $userId: String!
    $userName: String!
  ) {
    updateActivityInstanceUsers(
      activityInstanceId: $activityInstanceId
      userId: $userId
      userName: $userName
    ) {
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
export const removeUserFromActivityInstance = /* GraphQL */ `
  mutation RemoveUserFromActivityInstance(
    $activityInstanceId: ID!
    $removedUserId: String!
  ) {
    removeUserFromActivityInstance(
      activityInstanceId: $activityInstanceId
      removedUserId: $removedUserId
    ) {
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
export const startNewActivityInstance = /* GraphQL */ `
  mutation StartNewActivityInstance($oldActivityInstanceId: ID!) {
    startNewActivityInstance(oldActivityInstanceId: $oldActivityInstanceId) {
      oldActivityInstanceId
      newActivityInstanceId
    }
  }
`;
export const whoAmIUpdateActivityInstanceData = /* GraphQL */ `
  mutation WhoAmIUpdateActivityInstanceData(
    $activityInstanceId: ID!
    $userId: ID!
    $action: String!
    $selectionText: String
    $guessText: String
    $winnerId: ID
    $removeUserId: ID
    $success: String
  ) {
    whoAmIUpdateActivityInstanceData(
      activityInstanceId: $activityInstanceId
      userId: $userId
      action: $action
      selectionText: $selectionText
      guessText: $guessText
      winnerId: $winnerId
      removeUserId: $removeUserId
      success: $success
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
export const cahUpdateActivityInstanceData = /* GraphQL */ `
  mutation CahUpdateActivityInstanceData(
    $activityInstanceId: ID!
    $userId: ID!
    $action: String!
    $winningHandUserId: ID
    $winnerId: ID
    $removeUserId: ID
    $selectedCards: String
  ) {
    cahUpdateActivityInstanceData(
      activityInstanceId: $activityInstanceId
      userId: $userId
      action: $action
      winningHandUserId: $winningHandUserId
      winnerId: $winnerId
      removeUserId: $removeUserId
      selectedCards: $selectedCards
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
export const cahCreateActivityInstanceData = /* GraphQL */ `
  mutation CahCreateActivityInstanceData(
    $activityInstanceId: ID!
    $userId: ID!
  ) {
    cahCreateActivityInstanceData(
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
export const factBucketUpdateActivityInstanceData = /* GraphQL */ `
  mutation FactBucketUpdateActivityInstanceData(
    $activityInstanceId: ID!
    $userId: ID!
    $action: String!
    $factText: String
    $guess: String
    $removeUserId: ID
  ) {
    factBucketUpdateActivityInstanceData(
      activityInstanceId: $activityInstanceId
      userId: $userId
      action: $action
      factText: $factText
      guess: $guess
      removeUserId: $removeUserId
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

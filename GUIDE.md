# Steps

## Pull latest template code

```
git clone git@gitlab.com:atium1/activity-template.git {ACTIVITY_NAME}
cd {ACTIVITY_NAME}
yarn install
touch .env
```

## Add env variables

Open `.env` with your editor, add the following environment variables and then save it.

```
VUE_APP_GTM_TRACKING_ID=''
VUE_APP_SK_ENDPOINT=''
VUE_APP_ROLLBAR_TOKEN=''
```

**Note**: If you don't know the values for these variables, ask Giannis.

## Remove existing repository and initialize new one

```
rm -rf .git/
git init
```

## Replace placeholder variables

Go to `public/index.html` and replace the variables that are prefixed with `ACTIVITY_` with the ones that you want for your activity.

## Create activity in DynamoDB

The format for DynamoDB entry (replace values with the actual ones):

```
{
  "activityId": "1",
  "canJoinAfterStarted": false,
  "description": "Description of the activity",
  "fullName": "Name as it will appear in the overview page",
  "maxDuration": 20,
  "maxPlayers": 8,
  "minDuration": 5,
  "minPlayers": 3,
  "name": "name-used-for-subdomain",
  "rating": 4.6,
  "type": "game" # or "nsfw", "energizer", "challenge"
}
```

TODO: Create an admin dashboard to create the above, at some point

Go to `src/variables.js` and change the activityId to the actual ID of the activity, as stored in DynamoDB.

## Create infrastructure for activity

```
cd cloudformation
AWS_PROFILE={AWS_PROFILE} ACTIVITY_NAME={ACTIVITY_NAME} make deploy
```

## Upload required files

Go to the root directory of the activity first:

```
cd ..
```

Then:

```
AWS_PROFILE={AWS_PROFILE} ACTIVITY_NAME={ACTIVITY_NAME} make upload-files
```

## Remove this guide :-)

```
rm GUIDE.md
```

## Create repository & push code

Go to [gitlab.com](https://gitlab.com/atium1), create a repository and follow the instructions

```
git remote add origin git@gitlab.com:atium1/{REPOSITORY_NAME}.git
git add .
git commit -m "Initial commit"
git push origin master
```

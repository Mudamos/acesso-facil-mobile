# Easy access (aka Acesso Fácil)

## Setup

- install node
- install yarn
- install ruby
- run `yarn`
- run `cd ios && pod install && cd -`

## Development

- run packager `yarn start`
- run `yarn run android`
- run `yarn run ios` or `yarn run xcode` and run from the IDE
- for logs `yarn run log-android` or `yarn run log-ios`
- linting `yarn run lint`
- sorting imports `yarn run sort`
- prettier `yarn run prettier`

## Production build

- run `yarn run build-android-production` > This is will generate `android/app/build/outputs/bundle/productionRelease/app.aab` which can be uploaded to the play console.

## Envs

- .env.development
- .env.staging
- .env.production

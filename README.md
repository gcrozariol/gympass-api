# GymPass App

## Functional Requirements

- [x] It should be able to register a user
- [x] It should be able to authenticate
- [x] It should be able to get user's profile when logged in
- [x] The user should be able to get the number of check-ins
- [x] The user should be able to get the history of check-ins
- [x] The should be able to search for close gyms (within 10 metres)
- [x] The user should be able to search for gyms by name
- [x] The user should be able to check-in in a gym
- [x] It should be able to validate the user's check-in
- [x] It should be able to register a gym

## Business Rules

- [x] The user can't register with an existing email
- [x] The user can't check-in twice in the same day
- [x] The user can only check-in if closer than 100 metres from the selected gym
- [x] The check-in can only be validate within 20 minutes after its creation
- [x] The check-in can only be validated by administrators
- [x] Gyms can only be registered by administrators

## Non-functional Requirements

- [x] The user's password should be hashed
- [x] The application's data should be persisted within a PostgreSQL database
- [x] All data's lists should be paginated with 20 items per page
- [x] The user must be identified by a JWT

## Considerations

End-to-end tests must be linked to the latest changes made on **prisma/vitest-environment-prisma/prisma-test-environment.ts**.

When running tests once via the `npm run test:e2e` command, the latest changes on the file mentioned above will always be applied as the pre-test script will always run first, which is going to link the latest changes to our e2e tests.

However, when running the `npm run test:e2e:watch` command to watch e2e tests, the pre-test script will NOT run first.

Because of that, remember to run the `npm run test:e2e` command first to sync the latest prisma test environment changes. After that, we can then start watching these tests again by running `npm run test:e2e:watch` with the latest prisma test environment changes.

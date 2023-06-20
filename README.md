# GymPass App

## Functional Requirements

- [x] It should be able to register a user
- [x] It should be able to authenticate
- [x] It should be able to get user's profile when logged in
- [x] The user should be able to get the number of check-ins
- [x] The user should be able to get the history of check-ins
- [ ] The should be able to search for close gyms
- [x] The user should be able to search for gyms by name
- [x] The user should be able to check-in in a gym
- [ ] It should be able to validate the user's check-in
- [x] It should be able to register a gym

## Business Rules

- [x] The user can't register with an existing email
- [x] The user can't check-in twice in the same day
- [x] The user can only check-in if closer than 100 metres from the selected gym
- [ ] The check-in can only be validate within 20 minutes after its creation
- [ ] The check-in can only be validated by administrators
- [ ] Gyms can only be registered by administrators

## Non-functional Requirements

- [x] The user's password should be hashed
- [x] The application's data should be persisted within a PostgreSQL database
- [x] All data's lists should be paginated with 20 items per page
- [ ] The user must be identified by a JWT

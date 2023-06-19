# GymPass App

## Functional Requirements

- [ ] It should be able to register a user
- [ ] It should be able to authenticate
- [ ] It should be able to get user's profile when logged in
- [ ] The user should be able to get the number of check-ins
- [ ] The user should be able to get the history of check-ins
- [ ] The should be able to search for close gyms
- [ ] The user should be able to search for gyms by name
- [ ] The user should be able to check-in in a gym
- [ ] It should be able to validate the user's check-in
- [ ] It should be able to register a gym

## Business Rules

- [ ] The user can't register with an existing email
- [ ] The user can't check-in twice in the same day
- [ ] The user can only check-in if closer than 100 metres from the selected gym
- [ ] The check-in can only be validate within 20 minutes after its creation
- [ ] The check-in can only be validated by administrators
- [ ] Gyms can only be registered by administrators

## Non-functional Requirements

- [ ] The user's password should be hashed
- [ ] The application's data should be persisted within a PostgreSQL database
- [ ] All data's lists should be paginated with 20 items per page
- [ ] The user must be identified by a JWT

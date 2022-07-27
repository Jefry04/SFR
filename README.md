# SOCCER FIELD RENTAL (SFR)

![preview](/sfr-ui/public/preview-sfr.png)
SFR is a fullstack app developed individually during the last two weeks of the make it real fullstack advanced bootcamp 

The page is deployed here:

[SFR](https://sfr-sable.vercel.app/)

## About this proyect

The application allows visitors to reserve fields and user administration can create them.
At the time of registering, there will be two options, admin or not, the administrators, are the owners of the fields who will be able to create the fields and see and delete them in their profile.
The fields will be visible to all the people who visit the page, but to make a reservation, they must register as "no" administrator. After registering, you can, through the calendar of each field, make a reservation on the available dates and times. At the time of making the reservation, an email will be sent confirming the date and time.
In addition, the user will be able to see all the reservations he has in his profile.

## How to run locally

Clone the project, install node_modules (using npm install) 
Create local file .env.local (copy .env.example), and put your api key

```bash
npm run dev
```

The app will be in http://localhost:3000

## Stack Used

####  FORNTEND:
- NextJs
- Typescript
- Redux
- [Mantine](https://mantine.dev/)
- Vercel to deploy

#### FRONTEND
- Nodejs
- Mongodb
- mongoose 
- Bcrypt
- nodemailer

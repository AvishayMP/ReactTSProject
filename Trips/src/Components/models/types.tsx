export type nav = (cur: currentVeiw) => void;

export enum currentVeiw {
    Home = "home",
    AllTrips = "allTrips",
    LogIn = "login",
    SignIn = 'signIn',
    Trips = 'trips'
  }
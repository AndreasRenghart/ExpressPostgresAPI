import jsonTours from "./tours.json"
import jsonReviews from "./reviews.json";

interface Account {
    email: string
    password: string
}
export class DataStore {
    static tours = jsonTours;
    static reviews = jsonReviews;
    static accounts: Account[] = [];
}
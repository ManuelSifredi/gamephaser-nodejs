import Score from './score';

export default class Profile {

    public username: String;
    public email: String;
    public scores: Score[];

    constructor(obj?: any) {

        this.email = obj.email;
        this.username = obj.username;
        this.scores = obj.scores;
        
    }

}
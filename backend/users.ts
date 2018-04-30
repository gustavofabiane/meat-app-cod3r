export class User {
    constructor(public email: string, 
                public name: string, 
                private password: string) { }

    matches(user: User): boolean {
        return user !== undefined && 
               this.email === user.email && 
               this.password === user.password;
    }
}

export const users: {[key:string]: User} = {
    "chuchuzinho@gmail.com": new User('chuchuzinho@gmail.com', 'Chuchu', 'tete123'),
    "lilinda@gmail.com": new User('lilinda@gmail.com', 'Lilinda', 'tete123'),
    "momozao@gmail.com": new User('momozao@gmail.com', 'Gustavo', 'tete123')
}
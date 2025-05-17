import { AuthService, AuthAPI } from "../services";
export class User {
    constructor(
        private authAPI: AuthAPI,
        private isLoggedIn: boolean=false,
        private authToken: string|null=null,
        private addresses: string[] =[],
        private authService: AuthService,
        public readonly userId: string,
        private email: string,
        private phone: string,
    ){}
    validateEmail():boolean{
        const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(this.email);
    };
    validatePhone():boolean{
        const regex = /^\+?[0-9]{10,15}$/;
        return regex.test(this.phone);
    };
    async login (email:string,password:string):Promise <boolean> {
        try{
            const response = await this.authAPI.login(email,password);
          if (response.success && response.token) {
                this.isLoggedIn = true;
                this.authToken = response.token;
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login failed', error);
            return false;
        }
    }

    logout(): void {
        this.isLoggedIn = false;
        this.authToken = null;
        this.authAPI.logout().catch(error => { 
            console.error('Logout API error:', error);
        });
        this.addresses = [];
        console.log('User logged out');
    }

    addAddress(address: string): void { 
        this.addresses.push(address);
    }

    removeAddress(index: number): void {
        if (index >= 0 && index < this.addresses.length) { 
            this.addresses.splice(index, 1);
        }
    }

}
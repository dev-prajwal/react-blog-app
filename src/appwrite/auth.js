import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js"

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            console.log(error)
            throw error
        }

    }
    async login({ email, password }) {
        try {
            return this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async logout() { 
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async getCurrentUser() {
        try {
            return this.account.get()
        } catch (error) {
            console.log(error)
            throw error
        }
        return null
    }
}

const authService = new AuthService()

export default authService
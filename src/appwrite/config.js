import { Client, Databases, ID, Query, Storage } from "appwrite"
import conf from "../conf/conf";


export class Service {
    client = new Client()
    databases;
    bucket;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log('getPost', error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log('getPosts', error)
            return false
        }
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,
                slug, {
                title, content, featuredImage, status, userId
            }
            )
        } catch (error) {
            console.log('createPost', error)
            return false
        }
    }

    async updatePost(slug, { title, slug, content, featuredImage, status, }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId, slug,
                { title, content, featuredImage, status }
            )
        } catch (error) {
            console.log('updatePost', error)
            return false
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId,
                conf.appwriteCollectionId, slug)
            return true
        } catch (error) {
            console.log('deletePost', error)
            return false
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log('uploadFile', error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(conf.appwriteBucketId, fileId)
        } catch (error) {
            console.log('deleteFile', error)
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href
    }

}

const service = new Service()
export default service
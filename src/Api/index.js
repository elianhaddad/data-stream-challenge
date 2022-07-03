/* eslint-disable class-methods-use-this */
import fetch from 'node-fetch';

class Api {
    constructor() {
        this.getPosts = this.getPosts.bind(this);
    }

    async getPosts() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {method: 'GET'});
        return response.json();
    }
}

export default new Api();

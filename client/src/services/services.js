import React, { Component } from "react";

export default class Services extends Component {
    constructor(props) {
        super(props);
        this.pagesEndPoint = "http://localhost:3000/api/v1/";
    }

    fetch(slug, method, data) {
        var headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMGVlNWE5YTg1YTNiMzM1OGYzZWQ5NCIsImlhdCI6MTU3ODAzNTMwNiwiZXhwIjoxNTc4MTIxNzA2fQ.snM4asiexGe8YLHiTJln2rU7vIMclUDAjI8GKarGSeY");
        return fetch(slug, {
            method: method,
            headers: headers,
            body: data
        });
    }

    formData(array) {
        var data = new URLSearchParams();
        for (var k in array) {
            data.append(k, array[k]);
        }
        return data;
    }

    login(data) {
        return this.fetch(this.pagesEndPoint + "login", "post", this.formData(data));
    }

    verifyToken(token) {
        return this.fetch(this.pagesEndPoint + "me", "get");
    }
}
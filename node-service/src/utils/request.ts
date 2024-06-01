import {Response} from 'express'

export async function request(endpoint: String, method='GET', body=undefined) {
    const api = process.env.SERVICE_HOST || 'http://localhost:5000';
    try {
        const url = `${api}/${endpoint}`;
        const opt: {
            method: string;
            body?: string;
            headers: {
                'Content-Type': string;
            };
        } = {
            method: method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const request = await fetch(url, opt);
        const data = await request.json();
        return {
            status: request.status,
            data: data
        };
    } catch (error) {
        return {
            status: 503,
            data: {"message": "The server is not ready to handle the request."}
        };
    }
}
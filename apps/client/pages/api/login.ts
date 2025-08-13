import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import * as process from "node:process";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { email, password } = req.body;
        const apiRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
        const { token, user } = apiRes.data
        res.setHeader('Set-Cookie', serialize('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
            maxAge: 60 * 60,
        }));
        console.log(token, user)
        if (user.role === 'SELLER') {
            res.writeHead(302, { Location: 'http://localhost:5173' }).end();
        } else if (user.role === 'BUYER') {
            res.writeHead(302, { Location: '/' }).end();
        }
        res.status(200).json({ ok: true })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Login failed' })
    }
}
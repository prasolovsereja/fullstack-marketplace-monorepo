import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import * as process from "node:process";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { email, password } = req.body;
        const apiRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
        const { token, user } = apiRes.data
        console.log(token, user)
        res.status(200).json({ ok: true })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Login failed' })
    }
}
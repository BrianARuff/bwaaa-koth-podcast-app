// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { users } from '../../../db/users'

export type User = {
    id: number
    name: string
    email: string
}

type GetData = {
    users: User[]
}

type PostData = {
    user: User
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<GetData | PostData>
) {

    if (req.method === 'GET') {


        res.status(200).json({ users })
    }

    if (req.method === 'POST') {
        const user: User = req.body

        users.push(user)

        res.status(201).json({ user })
    }
}

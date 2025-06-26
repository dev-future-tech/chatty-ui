import type { NextApiRequest, NextApiResponse } from 'next'
 
interface MyForm {
    destinationId: number
    customerEmail: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body
  const id = await createItem(data)
  res.status(200).json({ id })
}

async function createItem(data : MyForm) {
    
}
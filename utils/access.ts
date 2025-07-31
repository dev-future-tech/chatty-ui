import jwt from 'jsonwebtoken';

export default async function hasRole(role: string, accessToken: string) {
    const decoded = jwt.decode(accessToken);

    
}
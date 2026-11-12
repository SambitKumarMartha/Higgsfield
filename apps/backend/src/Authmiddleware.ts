import jwt from "jsonwebtoken";
export function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authentication token required'
        });
    }
    const token = authHeader.split(' ')[1];
   
        const decoded = jwt.verify(token,process.env.JWT_SECRET!)  as { id: string };
    res.locals.userId = decoded.id;
        next(); 
}

SELECT u.uid, u.name, u.email, u.password, a.uid, a.createdAt, a.token 
FROM users u 
INNER JOIN authTokens a 
ON u.uid = a.ownerId;
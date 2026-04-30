export function pocketbaseAuth(req, res, next) {
  req.pocketbaseUserId = 'anonymous';
  next();
}
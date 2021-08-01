import { withIronSession } from "next-iron-session";

function handler(req, res, session) {
  const user = req.session.get("user") || {isLoggedIn: false};
  // console.info('user',user)
  res.send({ user });
}

export default withIronSession(handler, {
  password: "VnwWZTTuTiCmfTD5VieRR1z09WFUDR0BwUt",
  cookieName: "johnry_exam",
  // if your localhost is served on http:// then disable the secure flag
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
});
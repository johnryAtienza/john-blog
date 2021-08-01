import { withIronSession } from "next-iron-session";

async function handler(req, res) {
    const { credential } = await req.body;
    const result = await fetch(`https://fake-blog-server.herokuapp.com/users?` + new URLSearchParams(credential).toString());
    const user = await result.json();
    // console.info(credential, user);
    if (user.length) { 
        const u = { isLoggedIn: true, user };
        // get user from database then:
        req.session.set("user", u);
        await req.session.save();
        res.send({message: "Successfully Logged in", login: true});
    } else {
        res.send({error: "Invalid Username of Password"});
    }

}

export default withIronSession(handler, {
  password: 'VnwWZTTuTiCmfTD5VieRR1z09WFUDR0BwUt',
  cookieName: "johnry_exam",
  // if your localhost is served on http:// then disable the secure flag
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//   },
});
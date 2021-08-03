const register = async (req, res) => {

    const { data } = await req.body;
    const r = await fetch('https://fake-blog-server.herokuapp.com/users', {
        method: 'POST',
        headers: {
        //     "Content-Type": "application/x-www-form-urlencoded",
        //     // "Content-Type": "multipart/form-data",
        'Content-Type': 'application/json'
        },
        body:  JSON.stringify(data) ,
    })

    res.send({message: 'User has been registered.', registered: true})

}

export default register

// export const 

import React from 'react'
// import { Low, JSONFile } from 'lowdb'

const register = async (req, res) => {

    const reg = async () => {
        // const adapter = new JSONFile('https://fake-blog-server.herokuapp.com/post')
        // const db = new Low(adapter)
        
        // // Read data from JSON file, this will set db.data content
        // console.info(await db.read());
        const obj = {
            id: null,
            fullname: "CJ",
            email: "cj@gmail.com",
            password: "123"
          }
        const r = await fetch('https://fake-blog-server.herokuapp.com/users', {
            method: 'POST',
            headers: {
            //     "Content-Type": "application/x-www-form-urlencoded",
            //     // "Content-Type": "multipart/form-data",
            'Content-Type': 'application/json'
            },
            body:  JSON.stringify(obj) ,
        })

        console.info('Save data: ',await r.json())
    }
    const remover = async () => {
        const r = await fetch('https://fake-blog-server.herokuapp.com/users/3', {
            method: 'DELETE',
        })

        console.info('Save data: ',await r.json())
    }
        // reg()
        // remover();return

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

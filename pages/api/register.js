import React from 'react'
// import { Low, JSONFile } from 'lowdb'

const register = async (req, res) => {

   
    const remover = async (req, res) => {
        const r = await fetch('https://fake-blog-server.herokuapp.com/users/10', {
            method: 'DELETE',
            headers: {
                //     "Content-Type": "application/x-www-form-urlencoded",
                //     // "Content-Type": "multipart/form-data",
                'Content-Type': 'application/json'
                }
        })

        console.info('Save data: ',await r.json())
        res.send({message: 'User has been deleted.', registered: true})
    }
        // reg()
        // remover(req, res);return

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

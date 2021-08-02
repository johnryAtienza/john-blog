import React from 'react'
// import { Low, JSONFile } from 'lowdb'

const gallery = async (req, res) => {

   
    const remover = async (req, res) => {
        const r = await fetch('https://fake-blog-server.herokuapp.com/blog/10', {
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
// console.info("data:",data)

    
    if (data.remove) {
        // TODO: if create blog
        const r = await fetch('https://fake-blog-server.herokuapp.com/gallery/' + data.id, {
            method: 'DELETE',
            headers: {
            //     "Content-Type": "application/x-www-form-urlencoded",
            //     // "Content-Type": "multipart/form-data",
            'Content-Type': 'application/json'
            }
        })

        res.send({message: 'Gallery post has been deleted.', deleted: true})
    } else {
        console.info("adding:",data)
        // TODO: update blog
        const r = await fetch('https://fake-blog-server.herokuapp.com/gallery', {
            method: 'POST',
            headers: {
            //     "Content-Type": "application/x-www-form-urlencoded",
            //     // "Content-Type": "multipart/form-data",
            'Content-Type': 'application/json'
            },
            body:  JSON.stringify(data) ,
        })

        res.send({message: 'Gallery has been added.', added: true})
    }

}

export default gallery

// export const 

import React from 'react'
// import { Low, JSONFile } from 'lowdb'

const photo = async (req, res) => {

   
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
    if (data.get) {
        // TODO: if create blog
        const r = await fetch('https://fake-blog-server.herokuapp.com/photos?galleryId=' + data.galleryId)
        const d = await r.json();
        res.send(d)
    } else if (data.remove) {
        // TODO: if create blog
        const r = await fetch('https://fake-blog-server.herokuapp.com/photos/' + data.id, {
            method: 'DELETE',
            headers: {
            //     "Content-Type": "application/x-www-form-urlencoded",
            //     // "Content-Type": "multipart/form-data",
            'Content-Type': 'application/json'
            }
        })

        res.send({message: 'Photo has been deleted.', deleted: true})
    } else {
        console.info("adding:",data)
        // TODO: update blog
        const r = await fetch('https://fake-blog-server.herokuapp.com/photos', {
            method: 'POST',
            headers: {
            //     "Content-Type": "application/x-www-form-urlencoded",
            //     // "Content-Type": "multipart/form-data",
            'Content-Type': 'application/json'
            },
            body:  JSON.stringify(data) ,
        })

        res.send({message: 'Photo has been added.', added: true})
    }

}

export default photo

// export const 

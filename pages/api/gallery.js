const gallery = async (req, res) => {

    const { data } = await req.body;
// console.info("data:",data)
    if (data.get) {
        // TODO: if create blog
        const r = await fetch('https://fake-blog-server.herokuapp.com/gallery?blogId=' + data.blogId)
        const d = await r.json()
        res.send(d)
    } else if (data.remove) {
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

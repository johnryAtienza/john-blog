const blog = async (req, res) => {
    const { data } = await req.body;
// console.info("data:",data)

    
    if (!data.id) {
        // TODO: if create blog
        const r = await fetch('https://fake-blog-server.herokuapp.com/blog', {
            method: 'POST',
            headers: {
            //     "Content-Type": "application/x-www-form-urlencoded",
            //     // "Content-Type": "multipart/form-data",
            'Content-Type': 'application/json'
            },
            body:  JSON.stringify(data) ,
        })

        res.send({message: 'New post has been added.', isAdded: true})
    } else {

        // TODO: update blog
        const r = await fetch('https://fake-blog-server.herokuapp.com/blog/' + data.id, {
            method: 'PUT',
            headers: {
            //     "Content-Type": "application/x-www-form-urlencoded",
            //     // "Content-Type": "multipart/form-data",
            'Content-Type': 'application/json'
            },
            body:  JSON.stringify(data) ,
        })

        res.send({message: 'Post has been updated.', isUpdated: true})
    }

}

export default blog

// export const 

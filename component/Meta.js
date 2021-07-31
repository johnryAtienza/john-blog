import Head from 'next/head'
const Meta = ({title, keyword, description}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="description" content={description}/>
            <meta name="keyword" content={keyword}/>

            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
    )
}

// TODO: if no declared title or keyword or description
Meta.defaultProps = {
    title: 'Johnry Exam',
    keyword: 'Examination',
    description: 'Examination for Automart'
}

export default Meta
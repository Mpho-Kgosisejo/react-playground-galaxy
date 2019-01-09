import Head from "next/head"

const Layout = ({children, title = "NextJS - Playground"}) =>(
    <>
        <Head>
            <link rel="stylesheet" type="text/css" href="/static/css/main.css"/>
            <link rel="stylesheet" type="text/css" href="/static/css/movement-objects.css"/>
            <link rel="stylesheet" type="text/css" href="/static/css/controller.css"/>

            <title>{title}</title>
        </Head>

        <>
            {children}
        </>
    </>
)

export default Layout
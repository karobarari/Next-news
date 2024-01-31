import Header from "@/app/header";











export default function articlesLayout({children}:{children :React.ReactNode}){
    return(
    <section>
<Header/>
{children}
    </section>)
}
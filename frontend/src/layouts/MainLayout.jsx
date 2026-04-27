import Header from "../components/Header";
import Footer from "../components/Footer";

function MainLayout(props) {

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />

                <main className="grow">{props.children}</main>

                <Footer />
            </div>
        </>
    )
}

export default MainLayout;
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Admin from "./components/admin";
import Navbar from "./components/navbar";
import Main from "./components/main";
const cookies = new Cookies();
export default function App() {
    const [cookie, setCookie] = useState("");
    const [cookieIsReady, setCookieIsReady] = useState(false);
    const admin = false;
    const test = "commit";
    const getCookie = async () => {
        try {
            let cookie = await cookies.get("wordpress_product_configuration");
            cookie
                ? (setCookie(cookie), setCookieIsReady(true))
                : (setCookie(""), setCookieIsReady(true));
        } catch (error) {
            console.log("Error: Something Went Wrong", error);
        }
    };
    useEffect(() => {
        getCookie();
    }, []);
    return (
        <React.Fragment>
            {admin ? (
                <Admin />
            ) : (
                <>
                    <Navbar />
                    {cookieIsReady && <Main cookieData={cookie} />}
                </>
            )}
        </React.Fragment>
    );
}
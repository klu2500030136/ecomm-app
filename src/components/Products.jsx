import Header from "./Header"
import p1 from "../images/product1.png"
import p2 from "../images/product2.png"
import p3 from "../images/product3.png"
import Footer from "./Footer"
import { useNavigate } from "react-router-dom"

function Products(){

    const navigate = useNavigate();

    const handleAddToCart = () =>{
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if(isLoggedIn == "true"){
            navigate("/cart");
        }
        else{
            alert("Please! Login first ");
            navigate("/login");
        }

    };



    return(
        <>
        {/* <Header/> */}



        <div className="products">
            <div className="product">
                <img src={p1} alt="Luffy Gear 5 Toy" />
                <h2>Luffy Gear-5 Toy</h2>
                <p>Price: 500$</p>
                <button className="pbtn" onClick={handleAddToCart}>AddtoCart</button>
            </div>
            <div className="product">
                <img src={p2} alt="Zoro Toy" />
                <h2>Zoro Toy</h2>
                <p>Price: 600$</p>
                <button className="pbtn" onClick={handleAddToCart}>AddtoCart</button>
            </div>
            <div className="product">
                <img src={p3} alt="Sung Jinwoo Toy" />
                <h2>Sung Jinwoo Toy</h2>
                <p>Price: 800$</p>
                <button className="pbtn" onClick={()=>{handleAddToCart(p)}}>AddtoCart</button>
            </div>
        </div>

        {/* <Footer/> */}
        </>
    )
}
export default Products
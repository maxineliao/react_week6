import js from "@eslint/js";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router"
const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;

export default function Product() {
    const params = useParams();
    const { id } = params;
    const [product, setProduct] = useState({});

    useEffect(() => {
        (async() => {
            try {
                const res = await axios.get(`${VITE_API_BASE}/api/${VITE_API_PATH}/product/${id}`);
                setProduct(res.data.product);
            } catch (error) {
                console.log(error)
            }
        })();
    },[])

    return(
        <>
            <div className="container m-3">
                <div className="row align-items-center">
                    <div className="col-6">
                        <img src={product.imageUrl} alt={product.title} className="img-fluid" style={{
                            width: "300px",
                            height: "300px",
                            objectFit: "cover"
                        }}/>
                    </div>
                    <div className="col-6">
                        <h5>{product.title}</h5>
                        <p>{product.description}</p>
                        <p className="text-primary">${product.price}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
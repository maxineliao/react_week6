import App from "../App";
import Products from "../pages/Products";
import Product from "../pages/products/Product";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import AdminProduct from "../pages/AdminProduct";

const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'product',
                element: <Products />,
            },
            {
                path: 'product/:id',
                element: <Product />,
            },
            {
                path: '/cart',
                element: <Cart />
            }
        ]
    },{
        path: '/admin/login',
        element: <Login />
    },{
        path: '/admin/adminProduct',
        element: <AdminProduct />
    }
    
]

export default routes;
import { Outlet, NavLink } from "react-router";
import "./App.css";

function App() {
	return (
		<>
			<nav className="p-3 shadow d-flex align-items-center justify-content-center">
				<NavLink className="fs-5 me-4 text-decoration-none" to="">首頁</NavLink>
				<NavLink className="fs-5 me-4 text-decoration-none" to="/product">產品一覽</NavLink>
				<NavLink className="fs-5 me-4 text-decoration-none" to="/cart">購物車</NavLink>
				<NavLink className="fs-6 me-4 text-decoration-none btn btn-primary ms-3" to="/admin/login">後台登入</NavLink>
			</nav>
			<Outlet />
		</>
	);
}

export default App;

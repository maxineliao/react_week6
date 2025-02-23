import "../assets/css/products.css";
import { useState, useEffect, useRef } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";
import axios from "axios";
import { Link } from "react-router";
const { VITE_API_BASE, VITE_API_PATH } = import.meta.env;



function Products() {
	//處理Modal aria-hidden問題
	window.addEventListener("hide.bs.modal", () => {
		if (document.activeElement instanceof HTMLElement) {
			document.activeElement.blur();
		}
	});

	const [productList, setProductList] = useState([]);
	const [tempProduct, setTempProduct] = useState({});
    const [tempCartList, setTempCartList] = useState([]);

	const modalRef = useRef(null);
	const productModalRef = useRef(null);

	//產品Modal
	// const openProductModal = () => {
	// 	productModalRef.current.show();
	// };

	//取得購物車
	const getCartList = async () => {
		try {
			const response = await axios.get(
				`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`
			);
			setTempCartList(response.data.data.carts);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	const getProductList = async () => {
		try {
			const response = await axios.get(
				`${VITE_API_BASE}/api/${VITE_API_PATH}/products`
			);
			setProductList(response.data.products);
		} catch (error) {
			console.log(error.response.data);
		}
	};

	//新增至購物車
	const addToCart = async (id) => {
		const existedItem = tempCartList.filter((item) => {
			return item.product.id === id;
		});
		if (existedItem.length !== 0) {
			try {
				const response = await axios.put(
					`${VITE_API_BASE}/api/${VITE_API_PATH}/cart/${existedItem[0].id}`,
					{
						data: {
							product_id: id,
							qty: Number(existedItem[0].qty) + 1,
						},
					}
				);
				alert(response.data.message);
				// getCartList();
				productModalRef.current.hide();
			} catch (error) {
				console.log(error.response.data);
			}
		} else {
			try {
				const response = await axios.post(
					`${VITE_API_BASE}/api/${VITE_API_PATH}/cart`,
					{
						data: {
							product_id: id,
							qty: 1,
						},
					}
				);
				alert(response.data.message);
				// getCartList();
				productModalRef.current.hide();
			} catch (error) {
				console.log(error.response.data);
			}
		}
	};

	useEffect(() => {
		productModalRef.current = new Modal(modalRef.current);
		getProductList();
        getCartList();
	}, []);
	useEffect(() => {}, [tempCartList]);

	return (
		<>
			<div className="container">
				<div className="mt-4">
					{/* 產品Modal */}
					<table className="table align-middle">
						<thead>
							<tr>
								<th>圖片</th>
								<th>商品名稱</th>
								<th>價格</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{productList.map((item) => {
								return (
									<tr key={item.id}>
										<td
											style={{
												width: "200px",
											}}
										>
											<div
												style={{
													height: "100px",
													backgroundSize: "cover",
													backgroundPosition:
														"center",
													backgroundImage: `url(${item.imageUrl})`,
												}}
											></div>
										</td>
										<td>{item.title}</td>
										<td>
											<div className="h5"></div>
											<del className="h6">
												原價 ${item.origin_price}
											</del>
											<br />${item.price}
											<div className="h5"></div>
										</td>
										<td>
											<div className="btn-group btn-group-sm">
												<Link to={`/product/${item.id}`}
													className="btn btn-outline-secondary"
													// onClick={() => {
													// 	setTempProduct(item);
													// 	openProductModal();
													// }}
												>
													查看更多
												</Link>
												<button
													type="button"
													className="btn btn-outline-danger"
													onClick={() =>
														addToCart(item.id)
													}
												>
													<i className="fas fa-spinner fa-pulse"></i>
													加到購物車
												</button>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
			<div className="modal" tabIndex="-1" ref={modalRef}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">商品詳情</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<img
								className="img-fluid"
								src={tempProduct.imageUrl}
								alt={tempProduct.title}
								style={{
									height: "300px",
									objectFit: "cover",
								}}
							/>
							<p className="title">
								<span className="badge text-bg-secondary me-2 mt-3">
									{tempProduct.category}
								</span>
								<b>{tempProduct.title}</b>
							</p>
							<p className="description">
								{tempProduct.description}
							</p>
							<p className="price">
								原價 <del>${tempProduct.origin_price}</del>
							</p>
							<p className="price text-primary">
								售價 ${tempProduct.price}
							</p>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal"
							>
								關閉
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => addToCart(tempProduct.id)}
							>
								加到購物車
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Products;

import React from 'react';
import "../../style/cart.css";

const Cart = () => {
    return (
        <section className="container py-5 vh-100">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className="h5">Shopping Bag</th>
                                    <th scope="col">Format</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Hapus</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">
                                        <div className="d-flex align-items-center">
                                            <img src="https://i.imgur.com/2DsA49b.webp" className="img-fluid rounded-3" style={{ width: 100 }} alt="Book" />
                                            <div className="ms-3">
                                                <p className="mb-2">Thinking, Fast and Slow</p>
                                                <p className="mb-0">Daniel Kahneman</p>
                                            </div>
                                        </div>
                                    </th>
                                    <td className="align-middle">Digital</td>
                                    <td className="align-middle">
                                        <div className="input-group">
                                            <button className="btn btn-outline-secondary">-</button>
                                            <input type="number" className="form-control text-center" min={0} defaultValue={2} style={{ maxWidth: 60 }} />
                                            <button className="btn btn-outline-secondary">+</button>
                                        </div>
                                    </td>
                                    <td className="align-middle">$9.99</td>
                                    <td className="align-middle">
                                        <button className="btn btn-outline-danger p-2">
                                            <i className="fas fa-trash fa-lg"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="container py-5 mb-0">
                    <div className="card p-3">
                        <h5>Order Summary</h5>
                        <div className="d-flex justify-content-between">
                            <p>Subtotal</p>
                            <p>$23.49</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Shipping</p>
                            <p>$2.99</p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Shipping</p>
                            <p>$2.99</p>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <p>Total</p>
                            <p>$26.48</p>
                        </div>
                        <button className="btn btn-primary w-100">Checkout</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cart;

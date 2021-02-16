import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./components/StateProvider";
import Payment from "./components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders";

const promise = loadStripe(
	"pk_test_51ILOncL9OWMlZ1lHS9eVRWoVrdktQpfLBOnJKy9anQVdulvPSOL9PQNvPsFTRrWCARfkkL37PeUjMKj67PvMuAiH00kbI9aYUR"
);

function App() {
	const [{}, dispatch] = useStateValue();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			console.log("THE USER IS >>> ", authUser);

			if (authUser) {
				// the user just logged in / the user was logged in
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				// the user is logged out
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);

	return (
		<Router>
			<div className="App">
				<Switch>
					{/* Login page */}
					<Route path="/login">
						<Login />
					</Route>
					{/* Orders page */}
					<Route path="/orders">
						<Header />
						<Orders />
					</Route>
					{/* Checkout page */}
					<Route path="/checkout">
						<Header />
						<Checkout />
					</Route>
					{/* Payment page */}
					<Route path="/payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					{/* Home page */}
					<Route path="/">
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;

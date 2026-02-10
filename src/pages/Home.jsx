import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	useEffect(() => {

		const getPeople = async () => {
			const res = await fetch("https://www.swapi.tech/api/people");
			const data = await res.json();
			dispatch({ type: "set_people", payload: data.results });
		};

		const getPlanets = async () => {
			const res = await fetch("https://www.swapi.tech/api/planets");
			const data = await res.json();
			dispatch({ type: "set_planets", payload: data.results });
		};

		const getVehicles = async () => {
			const res = await fetch("https://www.swapi.tech/api/vehicles");
			const data = await res.json();
			dispatch({ type: "set_vehicles", payload: data.results });
		};

		getPeople();
		getPlanets();
		getVehicles();
	}, []);


	const renderCards = (list, type, categoryName) => {
		return (
			<div className="my-5">
				<h2 className="text-danger">{categoryName}</h2>
				<div className="d-flex flex-row overflow-scroll border p-3">
					{list.length > 0 ? (
						list.map((item) => (
							<div key={item.uid} className="card m-2" style={{ minWidth: "18rem" }}>
<img

    src={`https://raw.githubusercontent.com/Visual-Guide/starwars-visualguide/master/assets/img/${type}/${item.uid}.jpg`}
    className="card-img-top"
    alt={item.name}
    onError={(e) => { 

        e.target.onerror = null; 
        e.target.src = `https://starwars-visualguide.com/assets/img/${type}/${item.uid}.jpg`;
        

        e.target.addEventListener('error', () => {
             e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
        }, {once: true});
    }}
/>
								<div className="card-body">
									<h5 className="card-title">{item.name}</h5>
									<div className="d-flex justify-content-between">
										<Link to={`/single/${type === "characters" ? "people" : type}/${item.uid}`}>
											<button className="btn btn-outline-primary">Learn more!</button>
										</Link>
										<button
											className="btn btn-outline-warning"
											onClick={() => dispatch({ type: "add_favorite", payload: item })}
										>
											{store.favorites.find(fav => fav.uid === item.uid) ? "❤️" : "♡"}
										</button>
									</div>
								</div>
							</div>
						))
					) : (
						<p>Loading {categoryName}...</p>
					)}
				</div>
			</div>
		);
	};

	return (
		<div className="container mt-5">
			{renderCards(store.people, "characters", "Characters")}
			{renderCards(store.planets, "planets", "Planets")}
			{renderCards(store.vehicles, "vehicles", "Vehicles")}
		</div>
	);
};
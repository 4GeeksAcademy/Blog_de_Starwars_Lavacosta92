import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    return (
        <nav className="navbar navbar-light bg-light mb-3 p-3">
            <div className="container">
                <Link to="/">
                    <img 
                        src="https://pngimg.com/uploads/star_wars_logo/star_wars_logo_PNG34.png" 
                        alt="Star Wars Logo" 
                        style={{ width: "80px" }} 
                    />
                </Link>
                <div className="ml-auto">
                    <div className="dropdown">
                        <button 
                            className="btn btn-primary dropdown-toggle" 
                            type="button" 
                            id="dropdownMenuButton1" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                        >
                            Favorites 
                            <span className="badge bg-secondary ms-1">
                                {store.favorites.length}
                            </span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                            {store.favorites.length > 0 ? (
                                store.favorites.map((fav, index) => (
                                    <li key={index} className="d-flex justify-content-between align-items-center p-2" style={{ minWidth: "200px" }}>
                                        <span className="dropdown-item p-0">{fav.name}</span>
                                        <button 
                                            className="btn btn-outline-danger btn-sm border-0"
                                            onClick={() => dispatch({ type: "remove_favorite", payload: fav.uid })}
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="text-center p-2">(Empty)</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};
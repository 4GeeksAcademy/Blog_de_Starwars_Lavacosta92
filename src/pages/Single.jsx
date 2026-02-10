import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const Single = () => {
    const { type, theId } = useParams();
    const [detail, setDetail] = useState(null);

    useEffect(() => {

        const getDetails = async () => {
            const response = await fetch(`https://www.swapi.tech/api/${type}/${theId}`);
            const data = await response.json();
            setDetail(data.result.properties);
        };
        getDetails();
    }, [type, theId]);

 if (!detail) return <div className="text-center mt-5">Loading details...</div>;

const imgCategory = type === "people" ? "characters" : type;

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={`https://raw.githubusercontent.com/Visual-Guide/starwars-visualguide/master/assets/img/${imgCategory}/${theId}.jpg`}
                        className="img-fluid rounded-start"
                        alt={detail.name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                        }}
                    />
                </div>
                <div className="col-md-6 text-center">
                    <h1 className="display-4">{detail.name}</h1>
                    <p className="lead">
                        {detail.description || "A very important element in the Star Wars universe."}
                    </p>
                </div>
            </div>

            <hr className="text-danger border-2" />

            <div className="row text-danger text-center font-weight-bold">

                {type === "people" && (
                    <>
                        <div className="col"><strong>Name</strong><br />{detail.name}</div>
                        <div className="col"><strong>Birth Year</strong><br />{detail.birth_year}</div>
                        <div className="col"><strong>Gender</strong><br />{detail.gender}</div>
                        <div className="col"><strong>Height</strong><br />{detail.height}</div>
                        <div className="col"><strong>Skin Color</strong><br />{detail.skin_color}</div>
                        <div className="col"><strong>Eye Color</strong><br />{detail.eye_color}</div>
                    </>
                )}
                {type === "planets" && (
                    <>
                        <div className="col"><strong>Climate</strong><br />{detail.climate}</div>
                        <div className="col"><strong>Population</strong><br />{detail.population}</div>
                        <div className="col"><strong>Orbital Period</strong><br />{detail.orbital_period}</div>
                        <div className="col"><strong>Rotation Period</strong><br />{detail.rotation_period}</div>
                        <div className="col"><strong>Diameter</strong><br />{detail.diameter}</div>
                    </>
                )}
                {type === "vehicles" && (
                    <>
                        <div className="col"><strong>Model</strong><br />{detail.model}</div>
                        <div className="col"><strong>Class</strong><br />{detail.vehicle_class}</div>
                        <div className="col"><strong>Manufacturer</strong><br />{detail.manufacturer}</div>
                        <div className="col"><strong>Cost</strong><br />{detail.cost_in_credits}</div>
                        <div className="col"><strong>Length</strong><br />{detail.length}</div>
                    </>
                )}
            </div>

            <div className="mt-4">
                <Link to="/" className="btn btn-primary">Back to home</Link>
            </div>
        </div>
    );
};
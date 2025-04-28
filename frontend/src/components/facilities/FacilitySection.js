import React from "react";
import { useNavigate } from "react-router-dom";

const FacilitySection = ({ backgroundImage, title, description, buttonText, navigateTo }) => {
    const navigate = useNavigate();

    return (
        <section
            className="facility-section"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="overlay">
                <div className="content">
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <button onClick={() => navigate(navigateTo)}>{buttonText}</button>
                </div>
            </div>
        </section>
    );
};

export default FacilitySection;

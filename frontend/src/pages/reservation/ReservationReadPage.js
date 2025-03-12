import React, { useState, useEffect } from "react";

import Header from "../../components/LoginCompleteHeader";
import Footer from "../../components/Footer";
import ReservationReadComponent from "../../components/reservation/ReservationReadComponent";

const ReservationReadPage = () => {

    return (
        <div>
            <Header />
            <ReservationReadComponent />
            <Footer />
        </div>

    )

};

export default ReservationReadPage;
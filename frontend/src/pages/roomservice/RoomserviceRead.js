import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RoomserviceReadComponent from "../../components/roomservice/RoomserviceReadComponent";

const RoomserviceRead = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-grow flex items-center justify-center py-16">
                <RoomserviceReadComponent />
            </main>
            <Footer />
        </div>
    );
};

export default RoomserviceRead;

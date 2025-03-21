import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const RestaurantRead = () => {
    const location = useLocation();
    const { state: restaurant } = location;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow flex items-center justify-center py-16">
                <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg overflow-hidden flex">
                   
                    <img
                        src={restaurant.image}
                        alt={restaurant.title}
                        className="w-3/5 object-cover"
                    />
                    <div className="p-8 w-2/5">
                        <h2 className="text-3xl font-semibold">{restaurant.title}</h2>
                        <p className="text-gray-700 mt-3">{restaurant.description}</p>
                        <div className="mt-5 text-xl font-bold">가격: {restaurant.price} KRW</div>
                        <form className="mt-6 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">예약 날짜</label>
                                <input type="date" className="mt-2 p-3 w-full border rounded-md" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">식수 인원</label>
                                <input type="number" min="1" max="10" className="mt-2 p-3 w-full border rounded-md" required />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition">
                                예약 완료
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RestaurantRead;

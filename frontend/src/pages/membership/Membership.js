import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MembershipCardList from "../../components/membership/MembershipCardList";
import MembershipBenefitTable from "../../components/membership/MembershipBenefitTable";

const Membership = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          <MembershipCardList />
          <MembershipBenefitTable />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Membership;

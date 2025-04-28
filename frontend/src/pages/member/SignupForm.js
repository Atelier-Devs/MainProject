import React from "react";
import Header from "../../components/BeforeLoginHeader";
import Footer from "../../components/Footer";
import SignupComponent from "../../components/auth/SignupComponent";

const SignupForm = () => {
  return (
    <div className="signup-container">
      <Header />
      <SignupComponent />
      <Footer />
    </div>
  );
};

export default SignupForm;

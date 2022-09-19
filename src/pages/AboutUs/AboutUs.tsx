import React from "react";

import "./AboutUs.css";
import About from "../../assets/images/about.png";

const AboutUs: React.FC = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="title">
          <h1>About Us</h1>
        </div>
        <div className="content">
          <div className="article">
            <h3 style={{ fontWeight: "bold", color: "black" }}>
              The ultimate goal of this project is to provide a common,
              user-friendly, efficient way to retrieve the response to a query
              asked by end-users. We built a chatboat which can be integrate to
              the college website thus reducing unnecessary traffic and making
              the college website more informative. To achieve this, we
              researched ANN and implemented the same.
            </h3>
            <p style={{ color: "black" }}>
              Due to the training data constraints and the shallow nature of the
              ANN, the results are not that impressive and the chatbot model is
              not quite robust. Then, we collected more data and use advanced
              NLP models like BERT, RoBERTa, and DistilBERT architecture to
              train our chatbot which ultimately improved the accuracy of the
              model.
            </p>{" "}
            <div className="button">
              <a href="https://nec.edu.np/" target="_blank" rel="noreferrer">
                Know More
              </a>
            </div>
          </div>
        </div>
        <div className="image-section">
          <img src={About} alt="About Us" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

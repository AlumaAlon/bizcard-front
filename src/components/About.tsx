import { FunctionComponent } from "react";
import Navbar from "./Navbar";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <Navbar />
      <div className="container aboutBg py-3">
        <div className="row gap-5">
          <div className="col-lg-5 col-md-12">
            <h2 className="p-2">About BizCards</h2>
            <p>
              We all know that physical bussiness cards cost money and sometimes
              they get lost...
            </p>
            <p>
              <strong>BizCards</strong> app was created to give you comfortable
              platform for your bussiness card in your phone. You can create one
              (or more) cards and share them with everyone who have registered
              in BizCard app.
            </p>
          </div>
          <div className="col-lg-6 col-md-12">
            <h2 className="p-2">About Aluma</h2>
            <img
              src="images/aluma.jpeg"
              style={{
                float: "left",
                width: "150px",
                marginRight: "10px",
                borderRadius: "10px",
              }}
            />
            <p>
              Hi. My name is{" "}
              <a href="https://github.com/AlumaAlon" target={"_blank"}>
                Aluma Alon
              </a>
              .
            </p>
            <p>
              {" "}
              I used to be a pastry chef and today I am a Web-development
              student at the HackerU College.
              <br /> At October 2022, I started working as a developer in a
              start-up company.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

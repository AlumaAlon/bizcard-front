import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../interfaces/Card";
import { getCards } from "../services/cardsService";
import { getIsBiz } from "../services/userService";
import Navbar from "./Navbar";

interface AllCardsProps {}

const AllCards: FunctionComponent<AllCardsProps> = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isBiz, setIsBiz] = useState<boolean>(false);

  useEffect(() => {
    getCards()
      .then((res) => setCards(res.data))
      .catch((err) => console.log(err));
    setIsBiz(getIsBiz());
  });

  const addDefaultCardLogo = (ev: any) => {
    ev.target.src = "images/errorImage.png";
  };

  return (
    <>
      <Navbar />
      <div className="container py-3">
        <h1 className="p-2 text-center mb-3">
          All BizCards <span>{cards.length}</span>
        </h1>
        <div className="row mb-5">
          {cards.map((card) => (
            <div className="col-lg-6 col-md-6 mb-4 pt-12" key={card._id}>
              <div className="card">
                <img
                  src={card.image}
                  className="card-img-top"
                  onError={addDefaultCardLogo}
                />
                <div className="card-body">
                  <h3>{card.name}</h3>
                  <p>{card.description}</p>
                  <p className="m-0 p-0">
                    <i className="fa-solid fa-phone mx-2 opacity-25"></i>
                    {card.phone}
                  </p>
                  <p className="m-0 p-0">
                    <i className="fa-solid fa-location-pin mx-2 opacity-25"></i>
                    {card.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllCards;

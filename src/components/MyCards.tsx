import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../interfaces/Card";
import { deleteCard, getCardById } from "../services/cardsService";
import { errorMsg, successMsg } from "../services/feedbackService";
import { getIsBiz } from "../services/userService";
import Navbar from "./Navbar";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  const navigate = useNavigate();
  const [isBiz, setIsBiz] = useState<boolean>(false);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    setIsBiz(getIsBiz());
    getCardById()
      .then((res) => setCards(res.data))
      .catch((err) => errorMsg(err));
  });

  const addDefaultCardLogo = (ev: any) => {
    ev.target.src = "images/errorImage.png";
  };

  const handleDelete = (card: Card) => {
    if (
      window.confirm(`${card.name} will be deleted permanently, are you sure?`)
    )
      deleteCard(card._id as unknown as string)
        .then(() => {
          successMsg(`${card.name} Deleted`);
          navigate("/myCards");
        })
        .catch((err) => {
          console.log(err);

          errorMsg("Something went wrong, Try agian.");
        });
  };

  return (
    <>
      <Navbar />
      <div className="container py-3">
        <h1 className="p-2 text-center">
          My BizCards <span>{cards.length}</span>
        </h1>
        <div className="row mb-5">
          {cards.length ? (
            <>
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
                      {getIsBiz() ? (
                        <>
                          <div className="d-flex gap-3 mt-3">
                            <Link
                              className="w-100 editCard text-center"
                              to={`/edit/${card._id}`}
                            >
                              <i className="fas fa-pen mx-2"></i> Edit Card
                            </Link>
                            <button
                              className="w-100 deleteCard"
                              onClick={() => handleDelete(card)}
                            >
                              <i className="fas fa-times-circle mx-2"></i>{" "}
                              Delete Card
                            </button>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <h3 className="text-center">There is no cards in here</h3>
              <button
                onClick={() => navigate("/addCard")}
                className="btn btn-primary"
              >
                create card now!
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyCards;

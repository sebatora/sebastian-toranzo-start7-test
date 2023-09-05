import React from "react";
import { useEffect, useState } from "react";
import iconUser from "../../assets/iconUser.png";
import iconTrophy from "../../assets/iconTrophy.png";
import iconCoin from "../../assets/iconCoin.png";
import Categories from "../Categories/Categories";
import "./User.scss";

function User( { categories } ) {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    name: "",
    ranking: "",
    points: "",
  });

  useEffect(() => {
    fetch("https://quiz-7.com/profile.json")
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);

  return (
    <div className="user-container">
      <section className="user-data">
        <div>
          <h2>Hi, {userData.name}</h2>
          <p>Let's make this day productive</p>
        </div>
        <img src={iconUser} alt={userData.name} className="user-image" />
      </section>

      <section className="user-score">
        <div className="user-ranking-points">
          <img src={iconTrophy} alt="Trophy" />
          <div className="user-ranking-text">
            <p>Ranking</p>
            <h3>{userData.ranking}</h3>
          </div>
        </div>

        <div className="vertical-line" />

        <div className="user-ranking-points">
          <img src={iconCoin} alt="Coin" />
          <div className="user-ranking-text">
            <p>Points</p>
            <h3>{userData.points}</h3>
          </div>
        </div>
      </section>

      <Categories categories={categories} />
    </div>
  );
}

export default User;

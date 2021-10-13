/* eslint-disable */
import React, { useEffect, useState } from "react";
import "./App.css";
import requests from "./requests";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

export default () => {
  //React puro
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //Pegar lista total

      let list = await requests.getHomeList();
      setMovieList(list);

      //Pegar o Featured
      let originals = list.filter((i) => i.slug === "originais");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await requests.getMovieInfo(chosen.id, "tv");
      setFeaturedData(chosenInfo);
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 100) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
      <footer>
        <p>
          Feito com{" "}
          <span row="img" aria-label="amor">
            ❤
          </span>{" "}
          por <a href="https://github.com/hash-luk">Lucas P.</a>
        </p>
        <p>
          Direitos de imagem para <a href="https://netflix.com">Netflix</a>
        </p>
        <p>
          Dados retirados do <a href="https://tmdb.org">TMDB</a>
        </p>
      </footer>
      {movieList.length <= 0 && (
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"></img>
        </div>
      )}
    </div>
  );
};

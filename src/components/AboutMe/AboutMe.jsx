import React from 'react';
import userPhoto from '../../images/about-me__photo.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__content">
          <img className="about-me__photo" src={userPhoto} alt="Фото" />
          <div className="about-me__text-block">
            <p className="about-me__name">Евгений</p>
            <p className="about-me__info">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__description">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и
              дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года
              работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a href="https://github.com/EugeneCod" className="about-me__github">
              Github
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

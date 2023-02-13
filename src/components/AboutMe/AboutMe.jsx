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
              В данный момент проживаю в Волгоградской области. С 2021 года начал самостоятельно изучать веб - разработку.
              Для более продуктивного освоения этой сферы прошел соответствующий курс в Яндекс практикуме.
              После этого появилась некоторая уверенность в своих знаниях и теперь хотелось бы найти команду, в которой эти знания
              приносили бы пользу, а также продолжить развиваться в профессиональном плане, как фронтенд-разработчик.
            </p>
            <a href="https://github.com/EugeneCod" target="_blank" rel="noreferrer" className="about-me__github">
              Github
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

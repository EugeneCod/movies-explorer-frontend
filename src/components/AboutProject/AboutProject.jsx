import React from 'react';

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__content">
          <h3 className="about-project__heading">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
          <h3 className="about-project__heading">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </div>
        <div className="about-project__timeframe">
          <p className="about-project__term about-project__term_column_one">1 неделя</p>
          <p className="about-project__task">Back-end</p>
          <p className="about-project__term about-project__term_column_two">4 недели</p>
          <p className="about-project__task">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;

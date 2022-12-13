import React from 'react';

function Profile() {
  return (
    <main className="profile">
      <div className="profile__container">
        <p className="profile__greeting">Привет, Виталий!</p>
        <table className="profile__table">
          <tr className="profile__table-row">
            <th className="profile__table-heading-cell">Имя</th>
            <td className="profile__table-data-cell">Виталий</td>
          </tr>
          <tr className="profile__table-row">
            <th className="profile__table-heading-cell">E-mail</th>
            <td className="profile__table-data-cell">pochta@yandex.ru</td>
          </tr>
        </table>
        <ul className="profile__buttons-list">
          <li className="profile__buttons-list-item">
            <button className="profile__button profile__button_function_edit">Редактировать</button>
          </li>
          <li className="profile__buttons-list-item">
            <button className="profile__button profile__button_function_logout">Выйти из аккаунта</button>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default Profile;

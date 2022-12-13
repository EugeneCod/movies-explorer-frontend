import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }
  return (
    <main className="error-page">
      <div className="error-page__content">
        <p className="error-page__error-code">404</p>
        <p className="error-page__message">Страница не найдена</p>
      </div>
      <button onClick={handleClick} className="error-page__back-button">
        Назад
      </button>
    </main>
  );
}

export default ErrorPage;

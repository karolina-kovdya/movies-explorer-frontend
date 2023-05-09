import { useNavigate } from "react-router-dom";
import './NotFoundPage.css'

function NotFoundPage () {
    const navigate = useNavigate();
    return (
        <section className='notFound'>
          <div className='notFound__container'>
            <h1 className='notFound__error'>404</h1>
            <p className='notFound__text'>Страница не найдена</p>
          </div>
          <button className="notFound__button" onClick={() => navigate(-1)}>Назад</button>
        </section>
    )
}

export default NotFoundPage;
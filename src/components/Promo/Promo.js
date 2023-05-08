import './Promo.css'
import text from '../../images/promoImg.svg'

function Promo () {
    return (
        <section className="promo">
            <div className='promo__text'>
              <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
              <p className="promo__info">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
              <button className='promo__btn'>
                <a href='#aboutProject' className='promo__link'>Узнать больше</a>
              </button>  
            </div>
            <img className="promo__img" src={text} alt="Изображение буквы" />
        </section>
    )
}

export default Promo;
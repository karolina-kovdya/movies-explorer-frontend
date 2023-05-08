import './AboutMe.css'
import SectionsHeader from '../SectionsHeader/SectionsHeader';
import userPhoto from '../../images/userPhoto.jpg'
import { Link } from 'react-router-dom';

function AboutMe () {
    return (
        <section className='aboutMe'>
          <SectionsHeader title='Студент' />
          <div className='aboutMe-profile'>
            <div className='aboutMe-profile__info'>
              <h3 className='aboutMe__name'>Каролина</h3>
              <p className='aboutMe__job'>Фронтенд-разработчик, 33 года</p>
              <p className='aboutMe__about'>Живу в Санкт-Петербурге, закончила СПАТУГА. C 2010 года работаю в сфере авиации.Увлекаюсь сортом и вокалом. Недавно начала кодить. После того, как закончу курс по веб-разработке, хочу найти работу в сфере IT</p>
              <a className='aboutMe__contact' href='https://github.com/karolina-kovdya' target='blank'>Github</a>
            </div>
            <img className='aboutMe__photo' src={userPhoto} alt='Фотография' />
          </div>
          <div className='aboutMe__portfolio'>
            <h3 className='aboutMe__portfolio-subtitle'>Портфолио</h3>
            <ul className='aboutMe__links-list'>
              <li className='aboutMe__link'>
                <Link className='aboutMe__link-element' to={'https://github.com/karolina-kovdya/how-to-learn'} target='_blank'>
                  <p className='aboutMe__link-title'>Статичный сайт</p>
                  <div className='aboutMe__link-icon'/>
                </Link>
              </li>
              <li className='aboutMe__link'>
                <Link className='aboutMe__link-element' to={'https://github.com/karolina-kovdya/russian-travel'} target='_blank'>
                  <p className='aboutMe__link-title'>Адаптивный сайт</p>
                  <div className='aboutMe__link-icon'/>
                </Link>
              </li>
              <li className='aboutMe__link'>
                <Link className='aboutMe__link-element' to={'https://github.com/karolina-kovdya/react-mesto-api-full-gha'} target='_blank'>
                  <p className='aboutMe__link-title'>Одностраничное приложение</p>
                  <div className='aboutMe__link-icon'/>
                </Link>
              </li>
            </ul>
          </div>
        </section>
    )
}

export default AboutMe;
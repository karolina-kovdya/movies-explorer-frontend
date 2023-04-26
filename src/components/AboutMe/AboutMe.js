import './AboutMe.css'
import SectionsHeader from '../SectionsHeader/SectionsHeader';
import userPhoto from '../../images/userPhoto.jpg'
import icon from '../../images/portfolioIcon.svg'
import { Link } from 'react-router-dom';

function AboutMe () {
    return (
        <section className='aboutMe'>
          <SectionsHeader title='Студент' />
          <div className='aboutMe__profile'>
            <div className='abouteMe__profile-info'>
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
                  <p className='abooteMe__link-title'>Статичный сайт</p>
                  <img className='aboutMe__link-icon' src={icon} alt='Изображение стрелка-ссылка'/>
                </Link>
              </li>
              <li className='aboutMe__link'>
                <Link className='aboutMe__link-element' to={'https://github.com/karolina-kovdya/russian-travel'} target='_blank'>
                  <p className='abooteMe__link-title'>Адаптивный сайт</p>
                  <img className='aboutMe__link-icon' src={icon} alt='Изображение стрелка-ссылка'/>
                </Link>
              </li>
              <li className='aboutMe__link'>
                <Link className='aboutMe__link-element' to={'https://github.com/karolina-kovdya/react-mesto-api-full-gha'} target='_blank'>
                  <p className='abooteMe__link-title'>Одностраничное приложение</p>
                  <img className='aboutMe__link-icon' src={icon} alt='Изображение стрелка-ссылка'/>
                </Link>
              </li>
            </ul>
          </div>
        </section>
    )
}

export default AboutMe;
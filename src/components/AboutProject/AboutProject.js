import './AboutProject.css'  
import SectionsHeader from '../SectionsHeader/SectionsHeader';

function AboutProject () {
    return (
        <section className='aboutProject' id='aboutProject'>
          <SectionsHeader title='О проекте' />
          <ul className='aboutProject__info'>
            <li className='aboutProject__info-list'>
                <h3 className='aboutProject__info-subtitle'>Дипломный проект включал 5 этапов</h3>
                <p className='aboutProject__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            </li>
            <li className='aboutProject__info-list'>
                <h3 className='aboutProject__info-subtitle'>На выполнение диплома ушло 5 недель</h3>
                <p className='aboutProject__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </li>
          </ul>
          <div className='aboutProject__schedule'>
            <p className='aboutProject__schedule-theme aboutProject__schedule-theme_green'>1 неделя</p>
            <p className='aboutProject__schedule-theme aboutProject__schedule-theme_grey'>4 недели</p>
            <p className='aboutProject__schedule-theme aboutProject__schedule-theme_white'>Back-end</p>
            <p className='aboutProject__schedule-theme aboutProject__schedule-theme_white'>Front-end</p>
          </div>
        </section>
    )
}

export default AboutProject;
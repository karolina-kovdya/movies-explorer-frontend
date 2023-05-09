import './Techs.css'  
import SectionsHeader from '../SectionsHeader/SectionsHeader';

function Techs () {
    return (
        <section className='techs'> 
        <SectionsHeader title='Технологии' />
          <div className='techs__info'>
            <h2 className='techs__subtitle'>7 технологий</h2>
            <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            <ul className='techs__icon-list'>
                <li className='techs__icon'>HTML</li>
                <li className='techs__icon'>CSS</li>
                <li className='techs__icon'>JS</li>
                <li className='techs__icon'>React</li>
                <li className='techs__icon'>Git</li>
                <li className='techs__icon'>Express.js</li>
                <li className='techs__icon'>mongoDB</li>
            </ul>
          </div>
        </section>
    )
}

export default Techs;
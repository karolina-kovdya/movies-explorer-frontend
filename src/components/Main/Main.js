import Header from '../Haeder/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main () {
    return (
      <div className="main">
        <Header />
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </div>
    )
}

export default Main;

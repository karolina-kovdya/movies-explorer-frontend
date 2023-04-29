import Header from '../Haeder/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Main () {
    return (
      <div className="main-container">
        <Header />
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Footer />
      </div>
    )
}

export default Main;

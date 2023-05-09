import './SearchForm.css';
import CheckboxButton from '../CheckboxButton/CheckboxButton';

function SearchForm () {
    return (
        <section className='searchForm'>
          <div className='searchForm__container'>
            <input placeholder='Фильм' className='searchForm__input' />
            <button type='submit' className='searchForm__button'>Поиск</button>
          </div>
          <CheckboxButton />
        </section>
    )
}

export default SearchForm;
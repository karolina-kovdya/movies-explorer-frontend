import './CheckboxButton.css';

function CheckboxButton () {
    return (
        <div className='checkbox'>
          <label className='checkbox__container'>
            <input type='checkbox' className='checkbox__input' />
            <span className='checkbox__click'></span>
          </label>
        <p className='checkbox__text'>Короткометражки</p>
    </div>
    )
}

export default CheckboxButton;
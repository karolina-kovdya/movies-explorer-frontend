import './CheckboxButton.css';

function CheckboxButton ({isChecked, onChangeCheck}) {

  function handleChange () {
    onChangeCheck()
  }
  
    return (
        <div className='checkbox'>
          <label className='checkbox__container'>
            <input 
            type='checkbox' 
            className='checkbox__input' 
            checked={!isChecked}
            onChange={handleChange}
          />
            <span className='checkbox__click'></span>
          </label>
        <p className='checkbox__text'>Короткометражки</p>
    </div>
    )
}

export default CheckboxButton;
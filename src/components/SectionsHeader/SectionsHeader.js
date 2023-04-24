import './SectionsHeader.css'

function SectionsHeader ({title}) {
    return (
        <div className='sectionsHeader'>
            <h2 className='sectionsHeader__title'>{title}</h2>
        </div>  
    )
}

export default SectionsHeader;
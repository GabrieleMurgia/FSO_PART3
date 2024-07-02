const Filter = ({ onHandleFilter,text }) => {
    return (
      <div>
          {text} <input className="inputFilter" onChange={onHandleFilter}/>
      </div>
    )
  }
  
  export default Filter
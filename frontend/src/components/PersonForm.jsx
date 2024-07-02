const PersonForm = ({onSumbitForm , number , onChangeNumber ,name, onChangeName}) => {
    return (
    <form>
        <div>
          name: <input value={name} onChange={onChangeName}/>
        </div>
        <div>
          number: <input value={number} className="inputNumber" onChange={onChangeNumber}/>
        </div>
        <div>
          <button onClick={onSumbitForm} type="submit">add</button>
        </div>
    </form>
    )
  }
  
  export default PersonForm
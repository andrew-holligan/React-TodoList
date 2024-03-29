function Item({value, onDelete, index}: {value: string, onDelete: (index: number) => void, index: number}) {

    return (
        <li>
            {value}
            <button onClick={() => onDelete(index)}>Delete</button>
        </li>
    )
  }
  
  export default Item
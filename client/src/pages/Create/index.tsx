function Create() {
  return (
    <>
        <header>
            <input type="text" id="name" placeholder="name" />
            <h3>Give it a Name!</h3>
        </header>

        <main>
            <div className="container-add-item">
                <input type="text" id="item" placeholder="item" />
                <button id="btn-add"></button>
            </div>

            <ul className="list-items"></ul>

            <button id="btn-save">Save</button>
        </main>
    </>
  )
}

export default Create
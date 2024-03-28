import './Home.css';

function Home() {
  return (
    <>
        <header>
            <h1>TodoList</h1>
            <h3>Create A TodoList!</h3>
        </header>

        <main>
            <ul className="list-todolists">
                <li className="todolist">
                    <a id="btn-create" href="/create"></a>
                </li>
            </ul>
        </main>
    </>
  )
}

export default Home
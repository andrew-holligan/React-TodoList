function Home() {
  return (
    <>
        <header className="
            flex flex-col items-center 
            my-20
        ">
            <h1 className="text-4xl text-color1">
                TodoList
            </h1>
            <h3 className="text-xl text-color4">
                Create a TodoList!
            </h3>
        </header>

        <main className="w-full">
            <ul className="
                flex flex-row justify-center flex-wrap 
                w-full
            ">
                <li className="list-none">
                    <a id="btn-create" href="/create" 
                        className="
                            flex 
                            w-80 h-20 
                            bg-create-todolist bg-no-repeat bg-center bg-16 bg-color1 
                            hover:bg-color2
                        ">
                    </a>
                </li>
            </ul>
        </main>
    </>
  )
}

export default Home
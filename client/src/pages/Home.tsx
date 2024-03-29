import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';

async function getTodoLists(): Promise<Object> {
    return await fetch('http://localhost:5000/', {
        method: 'GET',
    })
    .then((response) => {
        return response.json();
    })
    .catch((error) => {
        console.error(error);
    }); 
}

function Home() {

    return (
        <>
            <Header />

            <main className="w-full">
                
                <ul className="
                    flex flex-row justify-center flex-wrap 
                    w-full px-16 gap-8
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

            <Footer />
        </>
    )
  }
  
  export default Home
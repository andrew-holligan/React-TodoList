import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

function Login() {
	return (
		<>
			<Header />

			<main className="w-full">
				<header className="flex items-center justify-center my-4">
					<h3 className="text-2xl text-color1">Login</h3>
				</header>

				<div className="flex flex-col items-center gap-4">
					<input
						type="text"
						id="username"
						placeholder="Username"
						className="
                            w-80 h-12 
                            border-2 border-solid border-color1 
                            text-color1 px-4
                    "
					/>

					<input
						type="password"
						id="password"
						placeholder="Password"
						className="
                            w-80 h-12 
                            border-2 border-solid border-color1 
                            text-color1 px-4
                    "
					/>

					<button
						id="btn-login"
						className="
							flex justify-center items-center
							w-80 h-12
							bg-color1 hover:bg-color2
							text-color4"
					>
						Login
					</button>
				</div>
			</main>

			<Footer />
		</>
	);
}

export default Login;
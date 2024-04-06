import { useNavigate } from "react-router-dom";

import { usePostLogin } from "../routing/auth/usePostLogin.ts";

import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

function Login() {
	const navigate = useNavigate();

	function login() {
		const username = (
			document.getElementById("username") as HTMLInputElement
		).value;
		const password = (
			document.getElementById("password") as HTMLInputElement
		).value;

		// validation
		if (!username) {
			alert("Username is required!");
			return;
		}
		if (!password) {
			alert("Password is required!");
			return;
		}

		usePostLogin(username, password).then((res) => {
			if (!res.success) {
				alert(res.reason);
				return;
			}
			navigate("/");
		});
	}

	return (
		<>
			<Header />

			<main className="w-full">
				<header className="flex flex-col items-center justify-center my-4 gap-2">
					<h3 className="text-2xl text-color1">Login</h3>

					<h3 className="text-base text-color4">
						New here?
						<a href="/register" className="text-color1 ml-1">
							Register
						</a>
					</h3>
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
						onClick={login}
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

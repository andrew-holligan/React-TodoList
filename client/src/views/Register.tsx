import { useNavigate } from "react-router-dom";

import { usePostRegister } from "../routing/auth/usePostRegister.ts";

import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

function Register() {
	const navigate = useNavigate();

	function register() {
		const username = (
			document.getElementById("username") as HTMLInputElement
		).value;
		const password = (
			document.getElementById("password") as HTMLInputElement
		).value;
		const confirmPassword = (
			document.getElementById("confirm-password") as HTMLInputElement
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
		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}

		usePostRegister(username, password).then((res) => {
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
				<header className="flex items-center justify-center my-4">
					<h3 className="text-2xl text-color1">Register</h3>
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

					<input
						type="password"
						id="confirm-password"
						placeholder="Confirm Password"
						className="
                            w-80 h-12 
                            border-2 border-solid border-color1 
                            text-color1 px-4
                    "
					/>

					<button
						id="btn-register"
						onClick={register}
						className="
							flex justify-center items-center
							w-80 h-12
							bg-color1 hover:bg-color2
							text-color4"
					>
						Register
					</button>
				</div>
			</main>

			<Footer />
		</>
	);
}

export default Register;

import { useNavigate } from "react-router-dom";

import { useGetLogout } from "../routing/auth/useGetLogout.ts";

function Logout() {
	const navigate = useNavigate();

	useGetLogout().then((res) => {
		if (!res.success) {
			alert(res.reason);
		}
		navigate("/");
	});
}

export default Logout;

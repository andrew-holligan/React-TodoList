/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      color1: "#23f0c7",
      color2: "#006d77",
      color3: "#3c3744",
      color4: "#FFFFFF",
    },
    extend: {
      backgroundImage: {
        "create-todolist": "url('/icon-create-todolist.svg')",
        add: "url('/icon-add.svg')",
        delete: "url('/icon-delete.svg')",
        tick: "url('/icon-tick.svg')",
      },
      backgroundSize: {
        "75%": "75%",
        16: "4rem",
        8: "2rem",
      },
    },
  },
  plugins: [],
};

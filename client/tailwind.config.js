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
        "create-todolist": "url('./src/assets/icon-create-todolist.svg')",
        add: "url('./src/assets/icon-add.svg')",
        delete: "url('./src/assets/icon-delete.svg')",
        tick: "url('./src/assets/icon-tick.svg')",
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

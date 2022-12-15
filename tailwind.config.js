/** @type {import('tailwindcss').Config} */
module.exports = {
     content: ["./*.{html,js}", "./views/**/*.ejs"],
     theme: {
          extend: {
               colors: {
                    "c-dark-gray": "#494949",
               },
               translate: {
                    "translate-150%": "150%",
               },
          },
     },
     plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
     content: ["./*.{html,js}", "./views/**/*.ejs"],

     theme: {
          extend: {
               colors: {
                    "c-dark-gray": "#494949",
                    "c-bg-button": "#f3ece6",
               },
               translate: {
                    "translate-150%": "150%",
               },
               width: {
                    "52vw": "52vw",
               },

               gridTemplateColumns: {
                    "grid-2col-product-page": "repeat(2, minmax(0, auto))",
               },
          },
     },
     plugins: [],
};

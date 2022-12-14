/** @type {import('tailwindcss').Config} */
module.exports = {
     content: ["./**/*.{html,js}"],
     theme: {
          extend: {
               colors: {
                    "c-dark-gray": "#494949",
               },
               translate: {
                '150%': '150%',
              }
          },
     },
     plugins: [],
};

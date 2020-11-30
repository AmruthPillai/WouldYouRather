module.exports = {
  purge: [
    'pages/**/*.js',
    'components/**/*.js',
    'styles/**/*.css',
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'wyr-red': '#E54555',
        'wyr-green': '#43AA8B',
        'wyr-blue': '#4392F1',
        'wyr-dark': '#003249',
        'wyr-light': '#F1F2EE',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
    plugins: {
      'postcss-react-strict-dom': {
        include: [
          // Include source files to watch for style changes
          'app/**/*.{js,jsx,mjs,ts,tsx}',
          'components/**/*.{js,jsx,mjs,ts,tsx}',
        ]
      },
      autoprefixer: {}
    }
};
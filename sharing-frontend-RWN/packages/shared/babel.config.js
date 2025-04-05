module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: process.env.BABEL_ENV === 'esm' ? false : 'auto',
      targets: {
        node: '14',
        browsers: '> 0.25%, not dead',
      },
    }],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: [],
}; 
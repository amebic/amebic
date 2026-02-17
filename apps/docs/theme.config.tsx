export default {
  logo: (
    <>
      <img src="/logo-icon.png" alt="Amebic" width="32" height="32" style={{ marginRight: '8px' }} />
      <span>Amebic</span>
    </>
  ),
  project: {
    link: 'https://github.com/yourusername/amebic',
  },
  docsRepositoryBase: 'https://github.com/yourusername/amebic/blob/main/apps/docs',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Amebic',
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Amebic - React compositions for still graphics" />
      <link rel="icon" href="/favicon.ico" />
    </>
  ),
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} © Amebic.
      </span>
    ),
  },
  navigation: {
    prev: true,
    next: true,
  },
}

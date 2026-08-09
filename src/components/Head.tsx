export const Head = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* Fonts */}
      <link rel="preconnect" href="https://static.parastorage.com" />
      {/* Poppins is named in the Tailwind theme but src/styles/fonts.css is generated and
          empty, so nothing was loading it and every heading fell back to system-ui. */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
      />
    </>
  );
};

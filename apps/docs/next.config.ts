import nextra from "nextra";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withNextra({
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
});

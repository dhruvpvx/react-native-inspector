const Fonts = {
  regular: (fontSize = 12, color = '#333333') => ({
    fontSize,
    color,
    fontWeight: '400' as const,
  }),
  semiBold: (fontSize = 12, color = '#333333') => ({
    fontSize,
    color,
    fontWeight: '600' as const,
  }),
};

export default Fonts;

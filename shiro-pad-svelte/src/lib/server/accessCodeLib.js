const generateAccessCode = (index) => {
  const charOrder = [
    "jyxn8fiszuk2hqbm4ea97gr05tdpvw36c",
    "6rjn0y3549mstcbhe2dfapigqwk7uv8zx",
    "ctnu8fdjyb4gq3maevih9zx7p6w5rs0k2",
    "nbzrfv4em2hiuq3p9dj7tsxa0wy6g8kc5"
  ];

  const len = charOrder[0].length;
  const charIndex = [ 
    Math.floor(Math.floor(Math.floor(index / len) / len) / len) % len,
    Math.floor(Math.floor(index / len) / len) % len,
    Math.floor(index / len) % len,
    index % len
  ];

  return `${charOrder[0][charIndex[0]]}${charOrder[1][charIndex[1]]}${charOrder[2][charIndex[2]]}${charOrder[3][charIndex[3]]}`
}

export { generateAccessCode };
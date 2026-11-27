import sharp from "sharp";
await sharp("public/favicon.svg").resize(32,32).png().toFile("public/favicon-32.png");

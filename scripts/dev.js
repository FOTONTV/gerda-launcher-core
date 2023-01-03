const ts = require("typescript");
const jest = require("jest");

const project = process.argv[2];

jest.run(["--watch", `packages/${project}`])
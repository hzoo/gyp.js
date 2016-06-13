'use strict';

const util = require('util');
const path = require('path');
const fs = require('fs');
const execSync = require('child_process').execSync;
const spawnSync = require('child_process').spawnSync;
const mkdirpSync = require('mkdirp').sync;
const glob = require('glob');

exports.path = {
  dirname: path.dirname,
  basename: path.basename,
  extname: path.extname,
  normalize: path.normalize,
  relative: path.relative,
  resolve: path.resolve,
  join: path.join,
  isAbsolute: path.isAbsolute,
  sep: path.sep
};
exports.fs = {
  readFileSync: (file) => fs.readFileSync(file),
  writeFileSync: (file, contents) => fs.writeFileSync(file, contents),
  existsSync: (file) => fs.existsSync(file),
  realpathSync: (file) => fs.realpathSync(file),
  mkdirpSync: mkdirpSync
};

exports.execSync = execSync;
exports.spawnSync = spawnSync;

exports.process = {
  env: process.env,
  cwd: () => process.cwd(),
  platform: process.platform,
  exit: (code) => process.exit(code)
};

exports.globSync = glob.sync;
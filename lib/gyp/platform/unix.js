'use strict';

const gyp = require('../../gyp');

const process = gyp.bindings.process;

const unix = exports;

unix.ninjaRules = function ninjaRules(n, useCxx) {
  n.rule('cc', {
    depfile: '$out.d',
    deps: 'gcc',
    command: '$cc -MMD -MF $out.d $defines $includes ' +
             '$cflags $cflags_c -c $in -o $out',
    description: 'CC $out'
  });

  n.rule('cxx', {
    depfile: '$out.d',
    deps: 'gcc',
    command: '$cxx -MMD -MF $out.d $defines $includes ' +
             '$cflags $cflags_cc -c $in -o $out',
    description: 'CXX $out'
  });

  n.rule('link', {
    command: `$${useCxx ? 'ldxx' : 'ld'} $ldflags` +
             `${useCxx ? '$ldflags_cc $cflags_cc' : '$ldflags_c $cflags_c'} ` +
             (process.platform === 'darwin' ?
                 '$in ' :
                 '-Wl,--start-group $in -Wl,--end-group ') +
             '$cflags -o $out $solibs $libs',
    pool: 'link_pool',
    description: 'LINK $out'
  });

  n.rule('solink', {
    command: `$${useCxx ? 'ldxx' : 'ld'} -shared $ldflags` +
             `${useCxx ? '$ldflags_cc $cflags_cc' : '$ldflags_c $cflags_c'} ` +
             (process.platform === 'darwin' ?
                 '$in ' :
                 '-Wl,--start-group $in -Wl,--end-group ') +
             '$cflags -o $out $solibs $libs',
    pool: 'link_pool',
    description: 'SOLINK $out'
  });

  n.rule('alink', {
    command: 'rm -rf $out && $ar rcs $arflags $out $in',
    description: 'ALINK $out'
  });

  n.rule('copy', {
    command: 'rm -rf $out && cp -rf $in $out',
    description: 'COPY $out'
  });
};


import cp from 'child_process';

(() => {
  cp.spawnSync('yarn', ['build-client'], { stdio: 'inherit' });
  cp.spawnSync('yarn', ['build-server'], { stdio: 'inherit' });
  cp.spawnSync('yarn', ['migrate:latest'], { stdio: 'inherit' });
})();

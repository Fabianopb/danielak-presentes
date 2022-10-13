import cp from 'child_process';

cp.spawn('yarn', ['build-client'], { stdio: 'inherit' });
cp.spawn('yarn', ['build-server'], { stdio: 'inherit' });
cp.spawn('yarn', ['migrate:latest'], { stdio: 'inherit' });

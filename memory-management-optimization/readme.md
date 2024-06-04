Basic purpose is to avaoid memory leaks which can be caused due to
i.   non-cleared timeouts/intervals
ii.  global variables
iii. closures
iv.  unreferenced - (Removed DOM nodes stuck as references)


1. To see how much garbage collected data is increasing by memory leaking
cmd - node --trace_gc index.js

2. To inspect the file memory
cmd - node --inspect index.js
Go to chrome and write 
chrome://inspect/#devices

3. Use third party library pm2 to test on production
cmd - npx pm2 start index.js
To see the logs 
cmd - npx pm2 logs
For monitoring
cmd - npx pm2 monit
Then stop pm2 
cmd - nox pm2 stop index.js
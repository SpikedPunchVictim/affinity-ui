cd ..\affinity
call npm pack 
cd ..\affinity-xml
call npm pack 
cd ..\affinity-ui
npm install ..\affinity\affinity-0.0.10.tgz
npm install ..\affinity-xml\affinity-xml-1.0.1.tgz
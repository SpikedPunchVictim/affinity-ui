cd ../affinity
rm affinity-0.0.9.tgz || true
npm pack 
cd ../affinity-xml
rm affinity-xml-1.0.1.tgz || true
npm pack 
cd ../affinity-ui
npm install ../affinity/affinity-0.0.9.tgz
npm install ../affinity-xml/affinity-xml-1.0.1.tgz
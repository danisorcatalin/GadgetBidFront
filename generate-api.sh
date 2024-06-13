set +x

curl http://localhost:3000/api/spec-json > swagger-java.json
npm install --global openapi-client-axios-typegen@3.14.1
typegen swagger-java.json > ./src/lib/GadgetClientJava.ts
sed -i "" "s/export type Client/export type GadgetClientJava/g" ./src/lib/GadgetClientJava.ts
# Export Components namespace
sed -i "" "s/declare namespace Components/export declare namespace Components/g" ./src/lib/GadgetClientJava.ts

mv swagger-java.json ./src/lib/swagger-java.json

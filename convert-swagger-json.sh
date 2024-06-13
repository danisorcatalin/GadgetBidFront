set +x

typegen swagger-java.json > ./src/lib/GadgetClientJava.ts
sed -i "" "s/export type Client/export type GadgetClientJava/g" ./src/lib/GadgetClientJava.ts
sed -i "" "s/declare namespace Components/export declare namespace Components/g" ./src/lib/GadgetClientJava.ts
# Remove swagger json file
rm swagger-java.json

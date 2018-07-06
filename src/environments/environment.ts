// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// May24
// export const environment = {
//   production: false,
//   backend_sdk: 'https://www.greenroutesdk.com:8443/back-sdk',
//   backend_orion: 'https://www.smartsdkitesm.com:1027',
//   backend_encryption: 'https://www.smartsdkitesm.com:3000',
//   backend_api: 'https://www.smartsdkitesm.com:3001'
// };

// 3Jul
// export const environment = {
//   production: false,
//   backend_sdk: 'https://www.greenroutesdk.com:8443/back-sdk',
//   backend_orion: 'https://www.smartsdkitesm.com:1027',
//   backend_encryption: 'https://www.smartsdkitesm.com:3001',
//   backend_api: 'https://www.smartsdkitesm.com:3002',
//   encrypt: false
// };

export const environment = {
  production: false,
  backend_sdk: 'http://159.65.33.15/back-sdk',
  backend_orion: 'http://www.smartsdkitesm.com:1027',
  backend_encryption: 'http://www.smartsdkitesm.com:3001',
  backend_api: 'http://www.smartsdkitesm.com:3002',
  encrypt: false,
  infotec_write_location:"orion",
  infotec_backend_orion: "http://79.109.226.53:1026"
};

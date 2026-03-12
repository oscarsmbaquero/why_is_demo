// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    //apiUrl: '/api/',
    apiUrl: 'https://abolitionary-verline-erethismic.ngrok-free.dev/api/v1',
    apiUrlLogin: 'https://why-back-node.vercel.app',
    apiUrlN8n: 'https://why-back-node.vercel.app',
    encriptKey : 'encrypt!135790',
    //apiUrl: 'https://node-facturas-ia.vercel.app/'
    //apiUrl: 'http://localhost:5000/'
    emailjs: {
      serviceId: 'service_gt0nj0d',
      templateId: 'template_ykkxdec',
      publicKey: 'MFnsya2QAXWHvl6IZ'
    }
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
import { environment } from '../../environments/environment';

export const CONFIGURATION: any =
{
    apiURL: environment.production ?  'https://work.girlandcars.com/' : 'http://localhost:3000/',
};

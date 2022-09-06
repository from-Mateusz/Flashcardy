import AuthenticationError from './AuthenticationError';
import Session from './Session';

interface Credentials {
    [index: string]: any;
}

interface UsernamePasswordCredentials extends Credentials {
    username: string,
    password: string
}

interface AuthenticationService {
    authenticate(credentials: Credentials): Session | never
}

// class UsernamePasswordAuthenticationService implements AuthenticationService {
//     authenticate(credentials: UsernamePasswordCredentials) {
//         if(!credentials['username'] || !credentials['password'])
//             throw new AuthenticationError("Authentication Failed: invalid credentials");
//         return undefined as Session;        
//     }
// }
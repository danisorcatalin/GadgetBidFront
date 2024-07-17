import { OpenAPIClientAxios, Document } from 'openapi-client-axios';
import { apiUrl } from 'utils/getApiUrlByEnv';
import { Client as GadgetJavaApi } from './GadgetClientJava';
import swaggerJavaDefinition from './swagger-java.json';

const typedDefinitionJava = swaggerJavaDefinition as Document;

class AxiosClientJava {
  private readonly api: OpenAPIClientAxios;
  private client: GadgetJavaApi;
  constructor() {
    // @ts-ignore
    this.api = new OpenAPIClientAxios({
      definition: typedDefinitionJava,
      withServer: {
        url: apiUrl,
      },
    });
  }
  getClient() {
    return this.client;
  }

  async setClient() {
    this.client = await this.api.getClient<GadgetJavaApi>();
    this.client.interceptors.request.use((request) => {
      const session = this.getSession();
      if (session) {
        request.headers['Authorization'] = `Bearer ${session}`;
      }
      return request;
    });
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          window.dispatchEvent(new Event('LOGOUT_EVENT'));
        }
        return Promise.reject(error);
      }
    );
  }
  setSession(accessToken: string | null): void {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }

  getSession(): string {
    return localStorage.getItem('accessToken');
  }
}

const GadgetClientJava = new AxiosClientJava();
export { GadgetClientJava };

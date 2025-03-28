import axios, { AxiosInstance } from 'axios';
import { envs } from './env';

export interface HttpInterface {
    get(url: string): Promise<any>;
    post(url: string, data: any): Promise<any>;
    put(url: string, data: any): Promise<any>;
    delete(url: string, data: any): Promise<any>;
    // Otros métodos como put, delete, etc.
}

export class AxiosAdapter implements HttpInterface {
    private static instance: AxiosAdapter;
    private axiosInstance: AxiosInstance;

    constructor() {
        // Configurar la instancia de Axios
        this.axiosInstance = axios.create({
            baseURL: envs.URL_BACKEND,
            timeout: 5000,
        });

        // Agregar interceptores
        this.setupInterceptors();
    }

    public static getInstance(): AxiosAdapter {
        if (!AxiosAdapter.instance) {
            AxiosAdapter.instance = new AxiosAdapter();
        }
        return AxiosAdapter.instance;
    }

    private setupInterceptors() {
        // Interceptor para solicitudes (Request)
        this.axiosInstance.interceptors.request.use(
            (config) => {
                console.log('Solicitud interceptada:', config);

                // Agregar token de autorización si existe
                const token = localStorage.getItem('token');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                console.error('Error en la solicitud:', error);
                return Promise.reject(error);
            }
        );

        // Interceptor para respuestas (Response) comentar
        // this.axiosInstance.interceptors.response.use(
        //     (response) => {
        //         console.log('Respuesta interceptada:', response);
        //         return response;
        //     },
        //     (error) => {
        //         console.error('Error en la respuesta:', error.response);
        //         if (error.response?.status === 401) {
        //             console.log('Sesión expirada. Redirigiendo...');
        //             window.location.href = '/login';
        //         }
        //         return Promise.reject(error);
        //     }
        // );
    }

    async get(url: string): Promise<any> {
        const response = await this.axiosInstance.get(url);
        return response.data;
    }

    async post(url: string, data: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post(url, data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Manejo de errores específicos
                throw error.response.data;
            } else {
                throw { error: 'Ocurrió un error inesperado' };
            }
        }
    }
    async put(url: string, data: any): Promise<any> {
        try {
            const response = await this.axiosInstance.put(url, data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Manejo de errores específicos
                throw error.response.data;
            } else {
                throw { error: 'Ocurrió un error inesperado' };
            }
        }
    }

    async delete(url: string, data: any): Promise<any> {
        try {
            const response = await this.axiosInstance.delete(url, data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                // Manejo de errores específicos
                throw error.response.data;
            } else {
                throw { error: 'Ocurrió un error inesperado' };
            }
        }
    }
}
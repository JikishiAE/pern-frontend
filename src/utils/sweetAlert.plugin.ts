import Swal, { SweetAlertIcon } from 'sweetalert2';

interface alertParams {
    title?: string;
    text?: string;
    icon?: SweetAlertIcon;
    showCancelButton?: boolean;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
    confirmButtonText?: string;
    onConfirm?: () => void;
}

export interface AlertInterface {
    basicAlert(params: alertParams): void;
    // Otros métodos como put, delete, etc.
}

export class AlertAdapter implements AlertInterface {
    private static instance: AlertAdapter;

    private constructor() {
        // Constructor privado para prevenir la creación directa de instancias
    }

    static getInstance(): AlertAdapter {
        if (!AlertAdapter.instance) {
            AlertAdapter.instance = new AlertAdapter();
        }
        return AlertAdapter.instance;
    }

    basicAlert(params: alertParams) {
        Swal.fire({
            title: params.title,
            text: params.text,
            icon: params.icon
        });
    }

  // Puedes agregar más métodos aquí
}

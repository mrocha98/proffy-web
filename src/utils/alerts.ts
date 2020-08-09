import Swal, { SweetAlertIcon } from 'sweetalert2'

const alert = (icon: SweetAlertIcon, title: string, text: string) =>
  Swal.fire({
    icon,
    title,
    text
  })

export const successAlert = (text: string) => alert('success', 'Sucesso!', text)
export const errorAlert = (text: string) => alert('error', 'Erro!', text)
export const warningAlert = (text: string) => alert('warning', 'Atenção!', text)

export default alert

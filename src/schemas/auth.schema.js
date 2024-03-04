import { z } from 'zod';

export const registerSchema = z.object({
  rutUsuario: z.string({
    required_error:'Debes ingresar un RUT'
  }),
  Nombre: z.string({
    required_error: 'Debes ingresar un nombre de usuario',
  }),
  Contrasena: z.string({
    required_error:'Debes ingresar una contraseña'
  }).min(8,{required_error:'Contraseña de contener minimo 8 Caracteres'}
    ),
  tipoUsuario:z.string({
    required_error:'Tipo de usuario no seleccionado'
  }),
});

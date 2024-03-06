import { z } from 'zod';

export const registerSchema = z.object({
  rutUsuario: z.string({
    required_error: 'Debes ingresar un RUT',
  }),
  Nombre: z.string({
    required_error: 'Debes ingresar un nombre de usuario',
  }),
  TipoUsuario: z.string({
    required_error: 'Tipo de usuario no seleccionado',
  }),
});

export const loginSchema = z.object({
  rutUsuario: z.string({
    required_error: 'Debes ingresar un RUT',
  }),
  Contrasena: z
    .string({
      required_error: 'Debes ingresar una contraseña',
    })
    .min(8, { message: 'Contraseña de contener minimo 8 Caracteres' }),
});

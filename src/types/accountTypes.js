import { shape, string, bool, number } from 'prop-types';

export const accountType = shape({
  cuenta_id: string,
  adherido_debito_automatico: bool,
  adherido_factura_digital: bool,
  titular: string,
  direccion: string,
  localidad: string,
  descripcion_estado: string,
  estado: string,
  partido: string,
  alias: string,
  relacion: string,
  perfil: number
});

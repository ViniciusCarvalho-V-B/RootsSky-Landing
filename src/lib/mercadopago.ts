import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

// Configura o SDK do Mercado Pago v2
const accessToken = process.env.MP_ACCESS_TOKEN;

if (!accessToken) {
  console.warn("Aviso: MP_ACCESS_TOKEN não está definido no .env!");
}

export const mpConfig = new MercadoPagoConfig({ accessToken: accessToken || '' });
export const preference = new Preference(mpConfig);
export const payment = new Payment(mpConfig);

export default {
  es: {
    Account: {
      accountNumber: 'Cuenta N°: {{id}}'
    },
    Bills: {
      billsListTitle: 'Factura actual',
      billsListFirstExpiration: '1er vencimiento',
      goToHistory: 'Historial de facturas',
      billsHistoryTitle: 'Listado de facturas',
      billId: 'Id de factura',
      payment_method: 'Método de pago',
      period: 'Perido',
      amount_to_pay: 'Monto a pagar'
    },
    Home: {
      noAccounts: 'No hay cuentas'
    },
    DigitalBill: {
      subscribed: {
        title: '✅ Adherido a factura digital'
      },
      notSubscribed: {
        title: '❌ NO adherido a factura digital'
      },
      actions: {
        modificar: {
          title: 'Modificar adhesión a factura digital',
          body: {
            text: 'Su email actual es ',
            inputText: 'Ingrese el nuevo mail a adherir: '
          }
        },
        baja: {
          title: 'Baja de factura digital',
          body: {
            text: 'Usted está a punto de deshaderirse de factura digital'
          }
        },
        alta: {
          title: 'Adhesión a factura digital',
          body: {
            inputText: 'Ingrese el email en el cual quiere recibir su factura: '
          }
        }
      }
    }
  }
};

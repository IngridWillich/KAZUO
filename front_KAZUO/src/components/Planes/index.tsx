export default function Planes() {

    return (
        <div>
            <div className="flex flex-col items-center justify-center bg-white py-12">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-4">
        Impulsá tu pyme con tu plan de <span className="text-blue-600">Kazuo Pro</span>
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Probá 15 días gratis el que mejor se adapta a tus necesidades. Sin configurar métodos de pago ni contratos de permanencia.
      </p>

      {/* Payment Methods */}
      <div className="flex justify-center items-center mb-8">
        <h2 className="font-bold text-lg mr-4">Métodos de pagos:</h2>
        {/* <img src="/mercado-pago-logo.png" alt="Mercado Pago" className="h-8 mx-4" /> */}
        <img src="https://hostbillapp.com/appstore/payment_stripe/images/thumbnails/m_logo.png" alt="Paypal" className="h-8 mx-4" />
      </div>

      {/* Pricing Plans */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Free Plan */}
        <div className="border-4 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold">Plan Gratuito</h3>
          <p className="text-2xl font-bold m-5">$0 USD</p>
          <button className="bg-gray-200 py-2 px-6 rounded-lg mb-5">Probar Gratis</button>
          
          {/* Características */}
          <ul className="text-left w-52 mx-auto"> 
            <li className="mb-4 font-medium">1 bodega</li>
            <hr className="border-t-2 border-gray-300 my-6" />
            <li className="mb-4 font-medium">Hasta 100 productos de manejo de stock</li>
            <hr className="border-t-2 border-gray-300 my-6" />
            <li className="mb-4 font-medium">Soporte por Chat</li>
            <hr className="border-t-2 border-gray-300 my-6" />
            <li className="mb-4 font-medium">Chat bot simple</li>
            <hr className="border-t-2 border-gray-300 my-6" />
            <li className="mb-4 font-medium">Modificación de stock y funciones de inventario</li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="border-2 border-blue-600 rounded-lg p-6 text-center bg-blue-50">
          <h3 className="text-xl font-semibold text-blue-600">Plan Kazuo Pro</h3>
          <p className="text-2xl font-bold m-5">$20 USD + impuestos</p>
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg mb-5">Probar Gratis</button>
          <ul className="text-center mx-auto"> {/* <- centrado con mx-auto */}
            <div className="border-2 border-blue-600 flex justify-center bg-blue-100 mb-7">
              <li className="m-2 font-semibold text-blue-600">Todo lo incluido en plan gratuito</li>
            </div>

            {/* Características */}
            <div className="w-52 mx-auto">
            <li className="mb-4 font-medium">10 bodegas</li>
              <hr className="border-t-2 border-gray-300 my-6" />
              <li className="mb-4 font-medium">Alerta de escasez stock</li>
              <hr className="border-t-2 border-gray-300 my-6" />
              <li className="mb-4 font-medium">Creación de código de barra</li>
              <hr className="border-t-2 border-gray-300 my-6" />
              <li className="mb-4 font-medium">Informe de estadísticas con google sheets</li>
              <hr className="border-t-2 border-gray-300 my-6" />
              <li className="mb-4 font-medium">Chat bot PRO</li>
            </div>
          </ul>
        </div>
      </div>


      {/* Extra Section */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
        <h2 className="text-lg font-semibold mb-4">Desatá el verdadero poder de tu negocio</h2>
        <p className="mb-4">
          Con Alegría tenés todas las herramientas para el éxito de tu negocio. Facturación, ventas y más en un solo lugar.
        </p>
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">Conocé Kazuo App</button>
        <div className="flex justify-center">
          <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png?hl=es-419" alt="Google Play" className="h-10 mt-5 mx-2" />
          <img src="https://www.pngarts.com/files/8/App-Store-Logo-Transparent-Images.png" alt="App Store" className="h-20 mx-2" />
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-12 text-left w-full max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Preguntas frecuentes</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold">¿Cómo funciona el Demo de 15 días?</h3>
            <p className="text-gray-600">
              Cuando inicies tu plan gratuito de Kazuo Pro, tendrás acceso completo por 15 días a todas las funciones premium.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold">¿Cuándo puedo cancelar mi plan?</h3>
            <p className="text-gray-600">
              Podés cancelar el plan en cualquier momento sin costos adicionales.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold">¿Puedo cambiar de plan en cualquier momento?</h3>
            <p className="text-gray-600">
              Sí, podés cambiar de plan según las necesidades de tu negocio.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-bold">¿Cómo se compone el valor de facturación mensual?</h3>
            <p className="text-gray-600">
              El valor incluye todas las herramientas del plan y puede variar según impuestos aplicables.
            </p>
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}
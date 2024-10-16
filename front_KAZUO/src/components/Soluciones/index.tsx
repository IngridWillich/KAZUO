import Link from "next/link"

export default function InventorySolutions() {
    const features = [
      {
        title: "Control de Inventario",
        description: "Gestiona tu stock en tiempo real, con actualizaciones automáticas y alertas de nivel bajo.",
        icon: "/placeholder.svg?height=64&width=64&text=CI",
        
      },
      {
        title: "Seguimiento de Fechas de Vencimiento",
        description: "Monitorea las fechas de caducidad de tus productos y recibe notificaciones oportunas.",
        icon: "/placeholder.svg?height=64&width=64&text=SFV"
      },
      {
        title: "Análisis y Reportes",
        description: "Obtén datos valiosos con informes detallados sobre rotación de inventario y tendencias de ventas.",
        icon: "/placeholder.svg?height=64&width=64&text=AR"
      },
      {
        title: "Gestión de Múltiples Ubicaciones",
        description: "Controla el inventario en diferentes almacenes o tiendas desde una sola plataforma.",
        icon: "/placeholder.svg?height=64&width=64&text=GMU"
      }
    ]
  
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
       
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Control de Inventario Kazuo</h1>
          
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xl text-gray-700">
              Kazuo ofrece una solución integral de control de inventario diseñada específicamente para pequeñas y medianas empresas. 
              Optimiza tu gestión de stock, reduce pérdidas y mejora la eficiencia de tu negocio con nuestras herramientas intuitivas y potentes.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
                <img src={feature.icon} alt={feature.title} width={64} height={64} className="mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-blue-600">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
  
          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para optimizar tu inventario?</h2>
            <p className="text-xl mb-6">
              Descubre cómo Kazuo puede transformar la gestión de tu inventario y mejorar la eficiencia de tu negocio.
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 transition duration-300">
              Comienza tu prueba gratuita
            </button>
          </div>
  
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">¿Por qué elegir Kazuo para tu inventario?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Fácil de usar</h3>
                <p className="text-gray-700">Interfaz intuitiva diseñada para que puedas empezar a usarla sin complicaciones.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Escalable</h3>
                <p className="text-gray-700">Crece con tu negocio, desde pequeñas tiendas hasta empresas con múltiples ubicaciones.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-600">Soporte local</h3>
                <p className="text-gray-700">Equipo de soporte dedicado para ayudarte en cada paso del camino.</p>
              </div>
            </div>
          </div>
        </main>
  
       
      </div>
    )
  }


import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Siguenos</h3>
          <div className="flex space-x-4 mb-6">
            <Link href="#" className="w-6 h-6" >LinkedIn</Link>
            <Link href="#" className="w-6 h-6" >Twitter</Link>
            <Link href="#" className="w-6 h-6" >Instagram</Link>
            <Link href="#" className="w-6 h-6" >Youtube</Link>
            <Link href="#" className="w-6 h-6" >Github</Link>

          </div>
          <h4 className="font-bold mb-2">SUBSCRIBITE</h4>
          <form className="space-y-2">
            <input type="email" placeholder="Correo" className="bg-blue-800 border-blue-700 text-white placeholder-blue-400" />
            <button  type="submit" className="w-full bg-white text-blue-900 hover:bg-blue-100">Enviar</button>
          </form>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4">Kazuo</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Quiénes somos</a></li>
            <li><a href="#" className="hover:underline">Centro de prensa</a></li>
            <li><a href="#" className="hover:underline">Ubicación</a></li>
            <li><a href="#" className="hover:underline">Trabaja con nosotros</a></li>
            <li><a href="#" className="hover:underline">Términos y condiciones</a></li>
            <li><a href="#" className="hover:underline">Kazuo fundaciones</a></li>
            <li><a href="#" className="hover:underline">Contáctanos</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4">Soluciones</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Sistema de gestión</a></li>
            <li><a href="#" className="hover:underline">Facturación electrónica</a></li>
            <li><a href="#" className="hover:underline">Tienda Online</a></li>
            <li><a href="#" className="hover:underline">Punto de venta</a></li>
            <li><a href="#" className="hover:underline">Alegra para contadores</a></li>
            <li><a href="#" className="hover:underline">Integraciones</a></li>
            <li><a href="#" className="hover:underline">API desarrolladores</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-lg mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Best practices</a></li>
            <li><a href="#" className="hover:underline">Colors</a></li>
            <li><a href="#" className="hover:underline">Color wheel</a></li>
            <li><a href="#" className="hover:underline">Support</a></li>
            <li><a href="#" className="hover:underline">Developers</a></li>
            <li><a href="#" className="hover:underline">Resource library</a></li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 text-sm text-blue-300">
        <p>Al navegar en los sitios webs propiedad de Kazuo, se acepta el uso de Cookies según nuestros <a href="#" className="underline">términos y condiciones</a></p>
        <p className="mt-2">© 2024 Kazuo Project. All rights reserved.</p>
      </div>
    </footer>
  )
}
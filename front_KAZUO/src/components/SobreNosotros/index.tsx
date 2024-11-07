type Platform = "instagram" | "linkedin" | "github";
type Participant = { name: string; url: string };

const participants: Record<Platform, Participant[]> = {
  instagram: [
    {
      name: "Ingrid Willich",
      url: "https://www.instagram.com/ingridwillich/?hl=es",
    },
    {
      name: "Arturo Guzman",
      url: "https://www.instagram.com/arthurgantego/profilecard/?igsh=MXMwaTIzY3dzNnZleQ==",
    },
    { name: "Lautaro Olmos", url: "https://www.instagram.com/lauti.olmos/" },
    {
      name: "Fredy Rigueros",
      url: "https://www.instagram.com/fredyrigueros91",
    },
    {
      name: "Antonella Defilippi",
      url: "https://www.instagram.com/antonella.deff",
    },
  ],
  linkedin: [
    {
      name: "Ingrid Willich",
      url: "https://www.linkedin.com/in/ingrid-willich-09631b303/",
    },
    {
      name: "Arturo Guzman",
      url: "https://www.linkedin.com/in/arturo-guzm%C3%A1n-10730a269?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
    { name: "Lautaro Olmos", url: "https://www.linkedin.com/in/lautaroolmos/" },
    {
      name: "Saul Ortiz",
      url: "https://www.linkedin.com/in/saul-ortiz-1010872b5/",
    },
    {
      name: "Fredy Rigueros",
      url: "https://www.linkedin.com/in/fredy-rigueros-3a376a1b9/",
    },
    {
      name: "Antonella Defilippi",
      url: "https://www.linkedin.com/in/antonella-defilippi-b91b82289?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  ],

  github: [
    { name: "Ingrid Willich", url: "https://github.com/IngridWillich" },
    { name: "Arturo Guzman", url: "https://github.com/ArturoGuzman555" },
    { name: "Lautaro Olmos", url: "https://github.com/LAUTYH" },
    { name: "Saul Ortiz", url: "https://github.com/XsporosX" },
    { name: "Fredy Rigueros", url: "https://github.com/M3CH4N1Z3D" },
    { name: "Antonella Defilippi", url: "https://github.com/antonelladeff" },
  ],
};

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
          Sobre Nosotros
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Nuestra Historia
          </h2>
          <p className="text-gray-600 mb-8">
            Comenzamos como un grupo de estudiantes de Henry apasionados por la
            tecnología, con la idea y propósito de ayudar a las pequeñas y
            medianas empresas a llevar un mejor análisis de su inventario.
            Nuestra visión era crear una herramienta que no solo simplificara la
            gestión de inventarios, sino que también proporcionara soluciones
            valiosoas para impulsar el crecimiento de los negocios.
          </p>
          <p className="text-gray-600 mb-8">
            A medida que profundizamos en las necesidades de las PyMEs, nos
            dimos cuenta de que podíamos ofrecer mucho más. Expandimos nuestra
            plataforma para incluir funcionalidades de facturación electrónica,
            punto de venta y análisis de datos, convirtiéndonos en una solución
            integral para la gestión empresarial.
          </p>
          <p className="text-gray-600 mb-8">
            Hoy, Kazuo es el resultado de nuestra pasión por la innovación y
            nuestro compromiso con el éxito de las pequeñas y medianas empresas.
            Continuamos evolucionando y mejorando nuestras soluciones, siempre
            con el objetivo de empoderar a los emprendedores y ayudarles a
            alcanzar su máximo potencial.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Nuestra Misión
          </h2>
          <p className="text-gray-600 mb-8">
            En Kazuo, nuestra misión es proporcionar soluciones tecnológicas
            innovadoras y accesibles que permitan a las pequeñas y medianas
            empresas optimizar sus operaciones, tomar decisiones informadas y
            crecer de manera sostenible. Nos esforzamos por ser más que un
            proveedor de software; aspiramos a ser un socio estratégico en el
            éxito de cada negocio que confía en nosotros.
          </p>
        </div>
      </main>

      <h2 className="text-3xl font-bold mb-6 text-blue-600 ml-8">
        Nuestro Equipo
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Object.values(participants.linkedin).map((member, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-center mb-4">
              {member.name}
            </h3>
            <div className="flex justify-center space-x-4">
              {participants.instagram.some((p) => p.name === member.name) && (
                <a
                  href={
                    participants.instagram.find((p) => p.name === member.name)
                      ?.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              )}
              <a
                href={member.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              {participants.github.some((p) => p.name === member.name) && (
                <a
                  href={
                    participants.github.find((p) => p.name === member.name)?.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

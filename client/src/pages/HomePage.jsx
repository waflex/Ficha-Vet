import { Lateral } from '../components/Sidebar'; // Importar el componente de la barra lateral
import { useAuth } from '../context/AuthContext'; // Importar el contexto de autenticación
import { Footer } from 'flowbite-react';

const HomePage = () => {
  const { user } = useAuth(); // Obtener el usuario del contexto de autenticación

  return (
    <div className="flex h-screen bg-gradient-to-br from-teal-200 to-teal-400 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 overflow-y-auto">
      {/* Renderizar la barra lateral */}
      <Lateral />
      <div className="flex flex-col flex-grow p-10 mt-10">
        {/* Contenido de la página */}
        <h1 className="text-3xl font-bold mb-4 text-teal-800 dark:text-teal-200">
          ¡Bienvenido, {user && user.Nombre}!
        </h1>
        {/* Saludo de bienvenida utilizando el nombre del usuario */}
        <p className="text-lg text-gray-800 dark:text-gray-300">
          ¡Gracias por visitar nuestra aplicación! Esta es la página de inicio
          donde puedes comenzar a explorar las diferentes funcionalidades
          disponibles.
        </p>
        {/* Sección de funciones principales */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-teal-800 dark:text-teal-200">
            Funcionalidades principales
          </h2>
          <ul className="list-disc list-inside text-gray-800 dark:text-gray-300">
            <li>Consulta tu lista de fichas médicas.</li>
            <li>Programa nuevas consultas.</li>
            <li>Accede a herramientas como el calculador de dosis y dietas.</li>
            <li>
              Interactúa con el chat de IA para recibir recomendaciones.
              (Version de Pago)
            </li>
          </ul>
        </div>
        {/* Footer */}
        <div className="flex-grow min-h-20" />
        <Footer container>
          <div className="w-full text-center">
            <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
              <Footer.Brand
                href="#"
                src="/img/logo.png"
                alt="Logo"
                name="Ficha Medical App"
              />
              <Footer.LinkGroup className="text-left md:text-auto ">
                <div className="m-2">
                  <Footer.Title title="Desarrollado por:" />
                  <Footer.LinkGroup col>
                    <Footer.Link href="#">Jonathan Rojas</Footer.Link>
                    <Footer.Link href="#">Daniela Rodriguez</Footer.Link>
                  </Footer.LinkGroup>
                </div>
                <div className="m-2">
                  <Footer.Title title="Para: " />
                  <Footer.LinkGroup col>
                    <Footer.Link href="#">
                      Instituto Profesional Valle Central
                    </Footer.Link>
                  </Footer.LinkGroup>
                </div>
              </Footer.LinkGroup>
            </div>
            <Footer.Divider />
            <Footer.Copyright href="#" by="Waflex" year={2024} />
          </div>
        </Footer>
      </div>
    </div>
  );
};

export default HomePage;

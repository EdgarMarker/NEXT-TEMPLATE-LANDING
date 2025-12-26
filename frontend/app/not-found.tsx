import "./styles/404.css";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="not-found">
      <div className="container__404">
        <div className="visual__element">404</div>

        <div className="column__1">
          <h2>Página no encontrada</h2>
          <p>
            Parece que te has perdido en el camino. La página que buscas no
            existe o ha sido movida a una nueva ubicación.
          </p>
          <div className="actions">
            <Link href="/" className="btn__home">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
export default NotFound;

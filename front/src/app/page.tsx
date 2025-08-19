import Link from 'next/link';

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-100 overflow-hidden">
      <h1 className="text-4xl font-bold mb-4 text-black">Bienvenido a Tu E-Commerce</h1>
      <p className="text-xl mb-8 text-black">Descubre nuestros increíbles productos</p>
      <Link href="/home" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Entrar a la tienda
      </Link>
    </div>
  );
}
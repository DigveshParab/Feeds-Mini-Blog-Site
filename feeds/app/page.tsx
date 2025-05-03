import AuthForm from "@/components/AuthForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 scroll-smooth">
      {/* app description */}
    <section className="bg-gray-900 h-dvh flex items-center justify-center p-8 lg:p-16 lg:shadow-black lg:shadow-2xl">
      <div className=" max-w-sm  lg:max-w-lg">
        <h1 className="text-7xl text-gray-300 mb-4 first-letter:text-9xl first-letter:font-semibold first-letter:-mr-3 first-letter:text-purple-500">Feeds...</h1>
        <p className="text-2xl text-gray-500 mt-2  ">
          Share your thoughts, read what others have to say. A mini blog app for the expressive mind.
        </p>

        <a href="#auth" className="scroll-smooth lg:hidden">
          <button className="px-20 py-2 font-bold mt-6 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition duration-300">
            Start Writing
          </button>
        </a>
      </div>

    </section>

    {/* auth forms */}
    <section className="flex items-center justify-center p-8 md:p-16">
      <div id="auth" className="w-4xs h-auto p-20 shadow-2xs border-2 border-gray-200 rounded-2xl">
        <AuthForm />
      </div>
    </section>
  </main>

  );
}

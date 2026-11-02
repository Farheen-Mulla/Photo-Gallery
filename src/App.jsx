import Gallery from "./components/Gallery";

export default function App() {
  return(
    <div className="min-h-screen bg-gray-50">
      <h1 className="bg-purple-700 p-4 text-center text-2xl font-bold text-white">
        Photo Gallery
      </h1>
      <Gallery />
    </div>
  );
}
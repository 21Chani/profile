function App() {
  return (
    <div className="h-screen w-full flex flex-col px-[100px]">
      <div className="flex flex-col mx-auto my-10">
        <span className="font-extrabold text-3xl mx-auto text-white">Chani</span>
        <span className="text-xl font-semibold text-gray-100">
          The only fight you lose is the one you give up.
        </span>
      </div>
      <div className="w-full flex gap-2 items-center">
        <div className="w-full h-0.5 bg-gray-300"></div>
        <span className="whitespace-nowrap text-lg text-white font-bold">About me</span>
        <div className="w-full h-0.5 bg-gray-300"></div>
      </div>
      <div className="w-[400px] h-[300px] bg-gray-300 shadow-xl mt-10 rounded-xl"></div>
    </div>
  )
}

export default App

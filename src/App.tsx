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
      <p className="p-5 bg-gray-700 rounded-md shadow-[inset_-5px_5px_20px_0px_#0004] text-gray-100 font-semibold mt-4 text-justify">
        &nbsp;&nbsp;&nbsp;With a strong interest in understanding how things work, I embarked on my
        programming journey at the age of 15, Through self-guided study, I diligently acquired the
        skills necessary to construct Minecraft plugins and mods. With a desire to expand my
        knowledge further,I have since delved into diverse domains, including web development, game
        design, server administration, mobile application development, and even the intricacies of
        operating systems.
        <br /> <br />
        &nbsp;&nbsp;&nbsp;At the present age of 19, I am actively seeking opportunities to gain
        valuable market experience and further enhance my skill set. Alongside my passion for
        programming, I devote a bit of my free time to the art of creating 3D models. Additionally,
        I maintain a rigorous gym routine, engaging in weightlifting exercises on a daily basis.
      </p>
    </div>
  )
}

export default App

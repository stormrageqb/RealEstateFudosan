import { React, useState, useEffect } from 'react';
const eyecatches = [
  // 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
  // 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
  // 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
  // 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
  // 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
  require("../../assets/1.jpg"),
  require("../../assets/2.jpg"),
  require("../../assets/3.jpg"),
  require("../../assets/4.jpg"),
  require("../../assets/6.jpg"),
  require("../../assets/8.jpg"),
  require("../../assets/9.jpg"),
  require("../../assets/10.jpg"),

];
const DashboardEyeCatch = () => {

  const maxLength = eyecatches.length;
  const [index, setIndex] = useState(0);
  const [mouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (event) => {
    setMouseDown(true);
    setStartX(event.clientX);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setStartX(0);
  };

  const handleMouseMove = (event) => {
    if (mouseDown) {
      const moveX = event.clientX - startX;
      const threshold = 50; // Adjust this value for sensitivity

      if (moveX > threshold) {
        setIndex((prevIndex) => (prevIndex === 0 ? maxLength - 1 : prevIndex - 1));
        setMouseDown(false);
      } else if (moveX < -threshold) {
        setIndex((prevIndex) => (prevIndex + 1) % maxLength);
        setMouseDown(false);
      }
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => setIndex((prevIndex) => (prevIndex + 1) % maxLength), 5000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [index]);


  return (
    <div className="relative overflow-hidden w-full h-[700px] sm:h-[900px]"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}>
      <div className='hidden md:flex absolute z-10 justify-center items-center bottom-2/3 right-1/2 transform translate-x-1/2 translate-y-1/4 bg-black/60 w-[700px] h-[70px] lg:w-[1000px] lg:h-[100px] rounded-3xl'>
        <p className=' text-center text-lg lg:text-2xl text-white font-semibold break-words'>どうしようか悩んでいる空き家や古ビルの買い手を自分で探すための掲示板サイト</p>
      </div>
      <div
        className="whitespace-nowrap transition ease duration-500"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        onMouseDown={handleMouseDown}
      >
        {eyecatches.map((eyecatch, index) => (
          <div
            className=" inline-block w-full h-[500px]"
            key={index}
          ><img src={eyecatch} alt="eyecatch" className='w-screen h-[70vh] bg-center bg-auto' /></div>
        ))}
      </div>

    </div>
  );
}
export default DashboardEyeCatch;

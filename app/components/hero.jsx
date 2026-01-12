"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Filter } from 'lucide-react';

export default function Hero() {
  const audioVisualizerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    '/education.jpg', 
    '/kishan.jpg',
    '/women.jpg',
    '/scholarship1.jpg',
    '/scholarship2.jpg',
    '/scholarship3.jpg',
    '/scholarship4.jpg'
  ];



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Changes image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Audio visualizer animation with WebAudio API
    const canvas = audioVisualizerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create audio context and analyzer
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyzer = audioContext.createAnalyser();
    analyzer.fftSize = 256;

    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Connect audio element to analyzer when play button is clicked
    const connectAudio = () => {
      if (!audioRef.current) return;

      const source = audioContext.createMediaElementSource(audioRef.current);
      source.connect(analyzer);
      analyzer.connect(audioContext.destination);
    };

    // Animation function
    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPlaying) {
        analyzer.getByteFrequencyData(dataArray);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] / 2;

          // Create modern gradient based on frequency with softer colors
          const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
          
          // Modern color palette with softer tones
          const hue = 180 + (i * 60 / bufferLength); // More blue-purple focused spectrum
          gradient.addColorStop(0, `hsla(${hue}, 90%, 65%, 0.9)`);
          gradient.addColorStop(1, `hsla(${hue + 30}, 95%, 75%, 0.8)`);
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          
          // Add subtle glow effect
          ctx.shadowColor = `hsla(${hue}, 90%, 70%, 0.6)`;
          ctx.shadowBlur = 15;

          x += barWidth + 1;
        }
      } else {
        // Modern idle animation with smooth gradients
        const bars = 60;
        const barWidth = canvas.width / bars;

        for (let i = 0; i < bars; i++) {
          const height = Math.sin(Date.now() * 0.001 + i * 0.15) * 20 + 30;
          const progress = i / bars;
          
          // Create smooth color transition
          const hue = 200 + progress * 60; // Blue to purple range
          const lightness = 60 + Math.sin(Date.now() * 0.002 + i * 0.1) * 10;
          
          ctx.fillStyle = `hsla(${hue}, 90%, ${lightness}%, 0.6)`;
          ctx.shadowColor = `hsla(${hue}, 90%, 70%, 0.4)`;
          ctx.shadowBlur = 10;
          ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 1, height);
        }
      }
    }

    // Track mouse movement for parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle play button click
    const playButton = document.getElementById('play-music-button');
    if (playButton) {
      playButton.addEventListener('click', () => {
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }

        if (!isPlaying) {
          connectAudio();
          audioRef.current.play();
          setIsPlaying(true);
        } else {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      });
    }

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animate);
    };
  }, [isPlaying]);

  return (
    <section id='home' className="relative min-h-[122vh] flex items-center overflow-hidden px-5">
      

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-blue-100 to-sky-100"></div>
        

      

        {/* Interactive Audio Visualizer */}
        {/* <canvas
          ref={audioVisualizerRef}
          className="absolute bottom-0 left-0 right-0 w-full h-32 opacity-80"
        ></canvas> */}
      </div>

      <div className="container mx-auto px-4 py-32 md:py-0 z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <div className="relative">
              {/* Animated glowing orbs */}
              <div
                className="absolute left-96 top-3 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 opacity-20 mix-blend-screen filter blur-2xl animate-pulse"
                style={{
                  transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                  boxShadow: '0 0 40px 10px rgba(167, 139, 250, 0.1)',
                }}
              ></div>
              <div
                className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 opacity-90 mix-blend-screen filter blur-2xl animate-pulse"
                style={{
                  animationDelay: '1s',
                  transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
                  boxShadow: '0 0 40px 10px rgba(244, 114, 182, 0.3)',
                }}
              ></div>
              <div
                className="absolute left-20 bottom-20 w-16 h-16 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 opacity-60 mix-blend-screen filter blur-xl animate-pulse"
                style={{
                  animationDelay: '1.5s',
                  transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
                  boxShadow: '0 0 30px 8px rgba(129, 140, 248, 0.3)',
                }}
              ></div>

              {/* 3D Text with hover effects */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white perspective-800">
                <span
                  className="block transform hover:scale-105 transition-all duration-300 text-transparent bg-clip-text bg-blue-500 cursor-pointer hover:bg-blue-600"
                  style={{
                    textShadow: '0 8px 16px rgba(79, 70, 229, 0.3)',
                    transform: `translateZ(20px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
                   
                  }}
                >
                  Explore
                </span>
                <span
                  className="block transform hover:scale-105 transition-all duration-300 text-transparent bg-clip-text bg-gradient-to-r from-black cursor-pointer via-gray-950 to-gray-900 hover:bg-black"
                  style={{
                    textShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
                    transform: `translateZ(20px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)`,
                   
                  }}
                >
                  Government Schemes
                </span>
              </h1>
            </div>

            <p className="text-xl mb-8 max-w-lg text-black drop-shadow-lg">
              Get <span className="text-green-400 font-bold">information </span>about all the <span className="text-blue-400 font-bold">government schemes</span>.
              categorized and easy to explore.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* Interactive buttons with hover effects */}
              <Link href="/schema" className="group relative px-8 py-3 overflow-hidden rounded-full bg-transparent border-2 border-black text-black font-medium transition-all hover:text-white">
                <span className="absolute inset-0 w-0 bg-black transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="relative text-md flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
<<<<<<< HEAD
                  Search Schemes
=======
                  Category Schemes
>>>>>>> 0e6f3fd4129755955457889c1e70f14cbd042d4d
                </span>
              </Link>

              <Link href="/schema-finder" className="group relative px-8 py-3 overflow-hidden rounded-full bg-transparent border-2 border-blue-500 text-blue-500 font-medium transition-all hover:text-white">
                <span className="absolute inset-0 w-0 bg-blue-500 transition-all duration-500 ease-out group-hover:w-full"></span>
                <span className="relative flex items-center gap-2">
                  <Filter className='h-4 w-4'/>
                  Filter Schemes
                </span>
              </Link>

             
            </div>
          </div>

          <div className="md:w-1/2 relative">
           
            <div
              className="relative w-[90vw] md:w-[500px] h-[400px] md:ml-10 md:mb-10 perspective-1000"

            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl border-2 border-blue-500 transform transition-all duration-[5000ms] hover:scale-105">
                
                <Image
                  src={images[currentImageIndex]}
                  alt="Carousel Image"
                  fill
                  className="object-cover transition-opacity ease-in-out duration-500 delay-150 "
                  priority
                />
              </div>

              {/* Floating elements */}
              <div className="absolute -bottom-10 -right-4 md:-right-10 w-28 h-28 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-blue-500 to-sky-500 p-1 animate-pulse-slow">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-300">New Schemes</p>
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-blue-500">
                      <span className="countdown-timer">soon</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-green-500 p-1 animate-spin-slow">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-white font-bold text-sm">LIVE</div>
                    <div className="flex space-x-1 mt-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-black text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
          <div className="w-2 h-2 bg-black rounded-full animate-bounce mt-2"></div>
        </div>
      </div>
    </section>
  );
}

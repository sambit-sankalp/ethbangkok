import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const imageRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const chatRef = useRef(null);

  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    if (!isDesktop) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: text1Ref.current,
        start: 'center 80%',
        end: 'center 40%',
        scrub: 1,
      },
    });

    timeline
      .to(headingRef.current, {
        x: 0,
        fontSize: '50px',
        ease: 'power1.inOut',
      })
      .to(text1Ref.current, {
        x: 0,
        y: -50,
        fontSize: '70px',
        ease: 'power1.inOut',
      })
      .to(
        text2Ref.current,
        { x: 600, y: -231, fontSize: '70px', ease: 'power1.inOut' },
        '<'
      )
      .to(
        text3Ref.current,
        { x: 1100, y: -410, fontSize: '70px', ease: 'power1.inOut' },
        '<'
      )
      .to(subHeadingRef.current, { x: -700, ease: 'power1.inOut' }, '<')
      .to(
        imageRef.current,
        {
          x: -1020,
          y: -150,
          ease: 'power1.inOut',
          onComplete: () => setShowChat(true), // Show chat after animation
        },
        '<'
      );

    // ScrollTrigger to Control Chat Visibility
    const chatTrigger = ScrollTrigger.create({
      trigger: imageRef.current,
      start: 'top center', // Adjust start position as needed
      onEnter: () => setShowChat(true), // Show chat when the user scrolls past this point
      onLeaveBack: () => setShowChat(false), // Hide chat if the user scrolls back above this point
    });

    // Cleanup
    return () => {
      timeline.kill();
      chatTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Ensure all triggers are cleaned up
    };
  }, []);

  useEffect(() => {
    if (showChat) {
      gsap.fromTo(
        chatRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power1.inOut' }
      );
    }
  }, [showChat]);

  return (
    <section className="flex flex-col items-center justify-center overflow-hidden">
      <div className="relative flex w-full min-h-[70vh] sm:min-h-[130vh] items-start justify-start bg-[#16161a]">
        <img
          src="/images/chatbot-g.png"
          className="absolute top-[70%] sm:top-[30%] -bottom-[20%] right-[1%] sm:-right-[20%] z-0 w-[350px] sm:w-[540px] h-auto mt-32"
          alt="hero"
          ref={imageRef}
        />
        {showChat && (
          <div
            ref={chatRef}
            className="absolute top-[55%] right-[15%] sm:right-[25%] bg-white p-6 rounded-full shadow-xl max-w-[500px] pb-10 pl-16 text-black rounded-tl-none flex flex-col gap-4"
          >
            {/* Text Content */}
            <p className="text-xl font-bold">Yo! 👋 What's up?</p>
            <p className="text-base font-medium leading-relaxed">
              You're just a text away from creating your next intent.
              <a
                href="/chat"
                className="text-purple-500 hover:text-purple-700 underline font-semibold"
              >
                Wanna chat? Slide into our DMs!
              </a>
            </p>
            <p className="text-base font-medium leading-relaxed">
              Solvers, we see you! 🚀
              <a
                href="/solver"
                className="text-pink-500 hover:text-pink-700 underline font-semibold"
              >
                Hit up the solver page for all the action.
              </a>
            </p>
          </div>
        )}
        <div className="pr-10 md:pr-24 lg:pr-64 mx-auto w-full sm:max-w-7xl pl-2 sm:pl-6 lg:pl-8">
          <h1
            ref={headingRef}
            className="text-[30px] font-display flex justify-start items-center"
          >
            <span className="text-[50px] sm:text-[80px] bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">{`[`}</span>
            <span className="mt-1 sm:mt-3">Y're just a conversation away</span>
            <span className="text-[50px] sm:text-[80px] bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">{`]`}</span>
          </h1>

          <div className="relative flex flex-col justify-center items-start mt-[50px] sm:mt-[151px] z-10">
            <h1
              ref={text1Ref}
              className="text-[60px] sm:text-[150px] font-display leading-[65px] sm:leading-[151px] uppercase"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">
                Cross
              </span>{' '}
              Chain
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">
                .
              </span>
            </h1>
            <h1
              ref={text2Ref}
              className="text-[60px] sm:text-[150px] font-display leading-[65px] sm:leading-[211px] uppercase -ml-[240px]"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">
                Simplified
              </span>{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">
                .
              </span>
            </h1>
            <h1
              ref={text3Ref}
              className="text-[60px] sm:text-[150px] font-display leading-[65px] sm:leading-[151px] uppercase -ml-[355px]"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">
                For
              </span>{' '}
              All
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">
                .
              </span>
            </h1>
          </div>

          {/* <div
            ref={subHeadingRef}
            className="absolute mt-10 sm:bottom-11 left-0 flex justify-center items-center"
          >
            <div className="hidden sm:block sm:h-[6px] w-10 sm:w-32 bg-[#9b5de5]"></div>
            <h5 className="font-mulish text-[18px] sm:text-[25px] font-bold ml-3  sm:ml-9">
              Your Digital Marketing Agency
            </h5>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;

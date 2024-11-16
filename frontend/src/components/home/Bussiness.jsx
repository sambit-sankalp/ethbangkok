import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const explanationData = [
  {
    id: 'intents',
    heading: 'create intents',
    bgColor: 'bg-[#2cb67d]',
    image: '/images/services/intents.svg',
    description:
      'Empower your Web3 actions by defining clear and precise intents. Whether it’s token swaps, bridging assets, or other blockchain operations, our platform ensures your goals are actionable and ready for execution.',
    types: [
      'Token swaps',
      'Asset bridging',
      'Multi-step transactions',
      'Custom intent creation',
    ],
  },
  {
    id: 'solvers',
    heading: 'find solvers',
    bgColor: 'bg-[#9b5de5]',
    image: '/images/services/solvers.svg',
    description:
      'Solvers bring your intents to life. Our solver pool ensures every intent is matched with the best solution, driving efficiency and accuracy in execution. Collaborate with skilled solvers who deliver optimized results.',
    types: [
      'Transaction matching',
      'Solver pools',
      'Optimized execution',
      'Gas fee efficiency',
    ],
  },
  {
    id: 'assets',
    heading: 'manage assets',
    bgColor: 'bg-[#ffc75f]',
    image: '/images/services/assets.svg',
    description:
      'Stay in control of your Web3 assets. Track, analyze, and manage transactions seamlessly, ensuring your blockchain experience remains smooth, secure, and transparent.',
    types: [
      'Transaction tracking',
      'Real-time analytics',
      'Multi-network support',
      'Cross-chain asset management',
    ],
  },
];

const Bussiness = () => {
  const blueRef = useRef(null);
  const greenRef = useRef(null);
  const darkGreenRef = useRef(null);

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    if (!isDesktop) return;

    const bluetimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#intents',
        start: 'top 100%',
        end: 'bottom 30%',
        scrub: 1,
        markers: false,
      },
    });

    // gsap.to(blueRef.current, {
    //   x: 0,
    //   y: -100,
    //   ease: 'power1.inOut',
    //   scrollTrigger: {
    //     trigger: '#startegise',
    //     start: 'top center',
    //     end: 'bottom bottom',
    //     scrub: true,
    //     markers: true,
    //   },
    // });

    bluetimeline
      .to(blueRef.current, {
        x: 0,
        y: -25,
        ease: 'power1.inOut',
      })
      .to(blueRef.current, {
        x: 0,
        y: 0,
        ease: 'power1.inOut',
      });

    gsap.to([greenRef.current, darkGreenRef.current], {
      opacity: 0.4,
      scrollTrigger: {
        trigger: '#intents',
        start: 'top 100%',
        end: 'bottom 30%',
        scrub: 1,
        markers: false,
      },
    });

    gsap.to(greenRef.current, {
      opacity: 1,
      scrollTrigger: {
        trigger: '#solvers',
        start: 'top 100%',
        end: 'bottom 30%',
        scrub: 1,
        markers: false,
      },
    });

    const greentimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#solvers',
        start: 'top 100%',
        end: 'bottom 30%',
        scrub: 1,
        markers: false,
      },
    });

    gsap.to([blueRef.current, darkGreenRef.current], {
      opacity: 0.4,
      scrollTrigger: {
        trigger: '#solvers',
        start: 'top 100%',
        end: 'bottom 30%',
        scrub: 1,
        markers: false,
      },
    });

    greentimeline
      .to(greenRef.current, {
        x: 25,
        y: 25,
        ease: 'power1.inOut',
      })
      .to(greenRef.current, {
        x: 0,
        y: 0,
        ease: 'power1.inOut',
      });

    gsap.to(darkGreenRef.current, {
      opacity: 1,
      scrollTrigger: {
        trigger: '#assets',
        start: 'top 100%',
        end: 'bottom 30%',
        scrub: 1,
        markers: false,
      },
    });

    const darkGreentimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#assets',
        start: 'top 100%',
        end: 'bottom 30%',
        scrub: 1,
        markers: false,
      },
    });

    gsap.to([greenRef.current, blueRef.current], {
      opacity: 0.4,
      scrollTrigger: {
        trigger: '#assets',
        start: 'top 100%',
        end: 'bottom 30%',
        scrub: 1,
        markers: false,
      },
    });

    darkGreentimeline
      .to(darkGreenRef.current, {
        x: -25,
        y: 25,
        ease: 'power1.inOut',
      })
      .to(darkGreenRef.current, {
        x: 0,
        y: 0,
        ease: 'power1.inOut',
      });
  }, []);

  return (
    <section className="w-full py-10 sm:py-20 bg-[#16161a]">
      <div className="flex flex-col sm:flex-row justify-center items-start mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="w-full sm:w-[60%] flex flex-col justify-start items-start">
          <div className="mt-[30px] sm:mt-[58px] flex justify-start items-start pr-5 sm:pr-20">
            <h5 className="font-mulish text-[16px] sm:text-[25px] leading-[20px] sm:leading-[32px] bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient font-semibold">
              Our Awesome Features
            </h5>
          </div>
          <h3 className="font-display text-[35px] sm:text-[60px] text-white mt-[10px]">
            STREAMLINING TRANSACTIONS
          </h3>
          <p className="w-full sm:w-[70%] font-mulish text-[16px] sm:text-[25px] leading-[20px] sm:leading-[32px] font-medium text-[#cfcfcf] mt-[20px] sm:mt-[10px]">
            From creating intents to executing transactions seamlessly, our
            platform is designed to simplify and optimize your Web3 experience.
            Whether you're a solver looking to unlock new challenges or a user
            managing complex blockchain actions, we've got you covered.
          </p>
          <img
            src="/images/services/servicesImg.svg"
            alt="services"
            width={447}
            height={447}
            className="block sm:hidden bottom-0 w-[60%] h-auto sm:w-[90%] mt-10 sm:mt-0 mx-auto mb-[80px]"
          />
          <div className="w-full flex flex-col justify-center items-start py-10 sm:py-20">
            {explanationData.map((data, index) => (
              <div
                id={data.id}
                key={`${index}-${data.heading}`}
                className={`w-full grid grid-cols-5 ${
                  index !== 2 && 'mb-[100px] sm:mb-[200px]'
                }`}
              >
                <div className="col-span-5 sm:col-span-5 flex flex-col justify-start items-start">
                  <div className="relative w-full">
                    {/* <div
                      className={`w-[150px] sm:w-[229px] h-[35px] sm:h-[47px] ${data.bgColor} opacity-30 -rotate-[9.72deg]`}
                    ></div> */}
                    <h2 className="absolute -top-5 font-display bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient text-[35px] sm:text-[60px] uppercase">
                      {data.heading}
                    </h2>
                  </div>
                  <p className="font-mulish font-semibold text-[#cfcfcf] text-[16px] sm:text-[25px] leading-[20px] sm:leading-[32px] mt-[35px] sm:mt-[70px] pr-5 sm:pr-20 w-[95%] sm:w-[95%]">
                    {data.description}
                  </p>
                  <div className="pr-5 sm:pr-20 w-[100%] sm:w-[75%] mt-[35px] sm:mt-[65px]">
                    {data.types.map((type, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center mt-4 border-b border-[#D6D6D6] pb-2 sm:pb-2"
                      >
                        <h5 className="font-mulish text-[16px] sm:text-[25px] leading-[20px] sm:leading-[32px] text-[#cfcfcf] font-medium ml-2 sm:ml-5">
                          {type}
                        </h5>
                        {/* <FontAwesomeIcon
                          icon={faChevronDown}
                          className="w-[12px] sm:w-[22px] h-auto text-primaryBlue"
                        /> */}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="sm:hidden col-span-5 sm:col-span-2 h-full flex justify-end items-end">
                  <img
                    src={data.image}
                    alt="services"
                    width={447}
                    height={447}
                    className="bottom-0 w-[70%] h-auto sm:w-[90%] mt-10 sm:mt-0 mx-auto"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden sm:block w-[40%] ml-10 sticky top-[38%] mb-[550px]">
          <div className="relative w-full">
            <img
              ref={blueRef}
              src="/images/services/strategise.svg"
              alt="services"
              width={383}
              height={213}
              className="absolute top-0 left-5 w-[383px] h-auto"
            />
            <img
              ref={greenRef}
              src="/images/services/create.svg"
              alt="services"
              width={218}
              height={331}
              className="absolute right-[55px] top-[120px] w-[218px] h-auto"
            />
            <img
              ref={darkGreenRef}
              src="/images/services/engage.svg"
              alt="services"
              width={218}
              height={331}
              className="absolute right-[285px] top-[120px] w-[218px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bussiness;

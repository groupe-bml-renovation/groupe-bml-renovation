'use client';
import { ReactLenis } from 'lenis/react';
import React, { forwardRef } from 'react';

const Component = forwardRef<HTMLElement>((props, ref) => {
  return (
    <ReactLenis root>
      <main className='bg-black' ref={ref}>
        <div className='wrapper'>
          <section className='text-white h-screen w-full bg-slate-950 grid place-content-center sticky top-0'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

            <h1 className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]'>
              Nos Réalisations
              <br />
              Découvrez notre savoir-faire <br />
              Faites défiler!
            </h1>
          </section>
        </div>

        <section className='text-white w-full bg-slate-950'>
          <div className='grid grid-cols-12 gap-2 px-4'>
            <div className='grid gap-2 col-span-4'>
              <figure className='w-full'>
                <img
                  src='https://res.cloudinary.com/dqgw0hcqy/image/upload/v1756081069/11062b_012254bad63d4563ab1e1d50c709685a_mv2_kpflvl.jpg'
                  alt='Rénovation cuisine moderne'
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://res.cloudinary.com/dqgw0hcqy/image/upload/v1756194749/photo_2024-04-21_12.55.46_mmy2sr_yivwje.jpg'
                  alt='Salle de bain rénovée'
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://res.cloudinary.com/dqgw0hcqy/image/upload/v1756195128/photo_2024-04-21_13.00.13_onpaob.jpg'
                  alt='Salon contemporain'
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://res.cloudinary.com/dqgw0hcqy/image/upload/v1756193902/2025-04-24_09.29.16_pz1ij3_lv5sqr.jpg'
                  alt='Terrasse extérieure'
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://res.cloudinary.com/dqgw0hcqy/image/upload/v1756188378/IMAGE_2024-02-09_11_57_13_rhx5j6.jpg'
                  alt='Chambre parentale'
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
            </div>
            <div className='sticky top-0 h-screen w-full col-span-4 gap-2 grid grid-rows-3 py-4'>
              <figure className='w-full h-full'>
                <img
                  src='https://res.cloudinary.com/dqgw0hcqy/image/upload/v1756195406/unnamed011_ybflhm.webp'
                  alt='Rénovation complète'
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full h-full'>
                <img
                  src='https://res.cloudinary.com/dqgw0hcqy/image/upload/v1756196172/unnamed003_thekpb.webp'
                  alt='Bureau à domicile'
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full h-full'>
                <img
                  src='https://res.cloudinary.com/dqgw0hcqy/image/upload/v1756186447/585e60_14c87239ed3c4684b99eea13b8e0b78b_mv2_bte0hj.avif'
                  alt='Équipe professionnelle'
                  className='transition-all duration-300 h-full w-full align-bottom object-cover rounded-md'
                />
              </figure>
            </div>
            <div className='grid gap-2 col-span-4 pb-[100vh]'>
              <figure className='w-full'>
                <img
                  src='https://res.cloudinary.com/dqgw0hcqy/image/upload/v1756195960/unnamed002_bgobd4.webp'
                  alt='Qualité et excellence'
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://res.cloudinary.com/dqgw0hcqy/image/upload/v1756197068/Untitled_design-3_jtwuqu.jpg'
                  alt='Revêtement sol'
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://res.cloudinary.com/dqgw0hcqy/image/upload/v1756184309/11062b_b8016491d3934d52b0b38486ee0ca376_mv2_ablffc.avif'
                  alt='Professionnelle en rénovation'
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&q=80'
                  alt='Cuisine moderne'
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=800&q=80'
                  alt='Salle de bain spa'
                  className='transition-all duration-300 w-full h-96 align-bottom object-cover rounded-md'
                />
              </figure>
            </div>
          </div>
        </section>

        <footer className='group bg-slate-950'>
          <h1 className='text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-[#38bdf8] to-blue-400 bg-clip-text text-transparent transition-all ease-linear'>
            BML Rénovation
          </h1>
          <div className='bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
        </footer>
      </main>
    </ReactLenis>
  );
});

Component.displayName = 'Component';

export default Component;

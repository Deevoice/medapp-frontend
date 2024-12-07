import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import doctors from '../../public/images/doctors.svg';
import person from '../../public/images/person.svg';
import techniques from '../../public/images/techniques.svg';
import sciens from '../../public/images/sciens.svg';


export default function HomePage() {
    return (
        <Layout>
            <div className="main-page">
                <h1 className="global__title">Система учета пациентов</h1>

                <div className="global-links">
                    <Link className='global-link' href="/patients" passHref>
                    <Image
                        className='global-btn__img'
                        src={person}
                        alt='person'
                        layout='responsive'
                        width={200}
                        height={200}
                    />
                        <span className="global-link__title">ПАЦИЕНТЫ</span>
                    </Link>

                    <Link className='global-link' href="/doctors" passHref>
                        <Image
                            className='global-btn__img'
                            src={doctors}
                            alt='doctors'
                            layout='responsive'
                            width={200}
                            height={200}
                        />
                        <span className="global-link__title">ДОКТОРА</span>
                    </Link>

                    <Link className='global-link' href="/appointments" passHref>
                        <Image
                            className='global-btn__img'
                            src={techniques}
                            alt='techniques'
                            layout='responsive'
                            width={200}
                            height={200}
                        />
                        <span className="global-link__title">ПРИЕМЫ</span>
                    </Link>

                    <Link className='global-link' href="/prescriptions" passHref>
                        <Image
                            className='global-btn__img'
                            src={sciens}
                            alt='sciens'
                            layout='responsive'
                            width={200}
                            height={200}
                        />
                        <span className="global-link__title">РЕЦЕПТЫ</span>
                    </Link>
                </div>

            </div>
        </Layout>
    );
}


import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
// import Button from '../components/Button';


export default function HomePage() {
    return (
        <Layout>
            <div className="">
                <h1 className="">Система учета пациентов</h1>

                <div className="">
                    <Link href="/patients" passHref>
                            <span className="">Пациенты</span>
                    </Link>

                    <Link href="/doctors" passHref>
                            <span className="">Доктора</span>
                    </Link>

                    <Link href="/appointments" passHref>
                            <span className="">Приемы</span>
                    </Link>

                    <Link href="/prescriptions" passHref>
                            <span className="">Рецепты</span>
                    </Link>
                </div>

            </div>
        </Layout>
    );
}


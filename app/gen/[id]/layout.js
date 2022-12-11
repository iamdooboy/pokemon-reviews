import Link from 'next/link'

export default function RootLayout({ children }) {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <nav>
                <Link href='/gen/1'>gen 1 </Link>
                <Link href='/gen/2'>gen 2 </Link>
                <Link href='/gen/3'>gen 3 </Link>
                <Link href='/gen/4'>gen 4 </Link>
                <Link href='/gen/5'>gen 5 </Link>
                <Link href='/gen/6'>gen 6 </Link>
            </nav>

            {children}
        </section>
    )


}